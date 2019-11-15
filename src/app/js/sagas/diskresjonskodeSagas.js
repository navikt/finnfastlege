import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/diskresjonskode_actions';
import * as actiontyper from '../actions/actiontyper';

const MODIASYFOREST_ROOT = '/modiasyforest/api/internad';

export function* hentDiskresjonskodeSaga(action) {
    yield put(actions.henterDiskresjonskode());
    try {
        const data = yield call(get, `${MODIASYFOREST_ROOT}/diskresjonskode/${action.fnr}`);
        yield put(actions.diskresjonskodeHentet(data));
    } catch (e) {
        yield put(actions.hentDiskresjonskodeFeilet());
    }
}
function* watchHentDiskresjonskode() {
    yield* takeEvery(actiontyper.HENT_DISKRESJONSKODE_FORESPURT, hentDiskresjonskodeSaga);
}

export default function* diskresjonskodeSagas() {
    yield fork(watchHentDiskresjonskode);
}
