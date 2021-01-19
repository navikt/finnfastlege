import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api/index';
import * as actions from '../actions/egenansatt_actions';
import * as actiontyper from '../actions/actiontyper';

const SYFOPERSON_ROOT = '/syfoperson/api';

export function* hentEgenansattSaga(action) {
    yield put(actions.henterEgenansatt());
    try {
        const data = yield call(get, `${SYFOPERSON_ROOT}/person/egenansatt/${action.fnr}`);
        yield put(actions.egenansattHentet(data));
    } catch (e) {
        yield put(actions.hentEgenansattFeilet());
    }
}
function* watchHentEgenansatt() {
    yield* takeEvery(actiontyper.HENT_EGENANSATT_FORESPURT, hentEgenansattSaga);
}

export default function* egenansattSagas() {
    yield fork(watchHentEgenansatt);
}
