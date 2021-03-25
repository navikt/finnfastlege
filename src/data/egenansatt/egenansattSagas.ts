import { call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./egenansatt_actions";

const SYFOPERSON_ROOT = "/syfoperson/api";

export function* hentEgenansattSaga(action: any) {
  yield put(actions.henterEgenansatt());
  try {
    const url = `${SYFOPERSON_ROOT}/person/egenansatt`;
    const data = yield call(get, url, action.fnr);
    yield put(actions.egenansattHentet(data));
  } catch (e) {
    yield put(actions.hentEgenansattFeilet());
  }
}
function* watchHentEgenansatt() {
  yield takeEvery(actions.HENT_EGENANSATT_FORESPURT, hentEgenansattSaga);
}

export default function* egenansattSagas() {
  yield fork(watchHentEgenansatt);
}
