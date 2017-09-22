import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/fastlege_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentFastlege(action) {
    yield put(actions.henterFastlege());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.FASTLEGEREST_ROOT}/fastlege/v1?fnr=${action.fnr}`);
        yield put(actions.fastlegeHentet(data));
    } catch (e) {
        if (e.message === '404') {
            yield put(actions.fastlegeIkkeFunnet());
            return;
        }
        yield put(actions.hentFastlegeFeilet());
    }
}

function* watchHentFastlege() {
    yield* takeEvery(actiontyper.HENT_FASTLEGE_FORESPURT, hentFastlege);
}

export default function* fastlegeSagas() {
    yield fork(watchHentFastlege);
}
