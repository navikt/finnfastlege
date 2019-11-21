import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/veilederinfo_actions';
import { HENT_VEILEDERINFO_FORESPURT } from '../actions/actiontyper';

export function* hentVeilederinfoSaga() {
    yield put(actions.henterVeilederinfo());
    try {
        const url = `${window.APP_SETTINGS.VEILEDEROPPGAVERREST_ROOT}/veilederinfo`;
        const data = yield call(get, url);
        yield put(actions.veilederinfoHentet(data));
    } catch (e) {
        yield put(actions.hentVeilederinfoFeilet());
    }
}

function* watchHentVeilederinfo() {
    yield* takeEvery(HENT_VEILEDERINFO_FORESPURT, hentVeilederinfoSaga);
}

export default function* veilederinfoSagas() {
    yield [
        fork(watchHentVeilederinfo),
    ];
}
