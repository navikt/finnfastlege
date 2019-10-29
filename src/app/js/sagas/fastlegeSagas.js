import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/fastlege_actions';
import * as egenansattActions from '../actions/egenansatt_actions';
import * as diskresjonskodeActions from '../actions/diskresjonskode_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentFastlege(action) {
    yield put(actions.henterFastlege());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.FASTLEGEREST_ROOT}/fastlege/v1?fnr=${action.fnr}`);
        yield put(actions.fastlegeHentet(data));
        yield put(egenansattActions.hentEgenansatt(action.fnr));
        yield put(diskresjonskodeActions.hentDiskresjonskode(action.fnr));
    } catch (e) {
        if (e.status === 403) {
            yield put(actions.fastlegeIkkeTilgang(e.tilgang.begrunnelse));
            return;
        }
        if (e.message === '404') {
            yield put(actions.fastlegeIkkeFunnet());
            return;
        }
        yield put(actions.hentFastlegeFeilet());
    }
}

export function* sjekkFastlegeTilgang() {
    yield put(actions.sjekkerFastlegeTilgang());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.FASTLEGEREST_ROOT}/tilgang`);
        yield put(actions.fastlegeTilgangHentet(data));
    } catch (e) {
        yield put(actions.sjekkFastlegeTilgangFeilet());
    }
}

function* watchHentFastlege() {
    yield* takeEvery(actiontyper.HENT_FASTLEGE_FORESPURT, hentFastlege);
}

function* watchSjekkTilgang() {
    yield* takeEvery(actiontyper.SJEKK_FASTLEGE_TILGANG_FORESPURT, sjekkFastlegeTilgang);
}

export default function* fastlegeSagas() {
    yield fork(watchHentFastlege);
    yield fork(watchSjekkTilgang);
}
