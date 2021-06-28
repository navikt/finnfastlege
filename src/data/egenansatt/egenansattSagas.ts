import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api/fetch";
import * as actions from "./egenansatt_actions";

const SYFOPERSON_ROOT = "/syfoperson/api/v2";

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

export default function* egenansattSagas() {
  yield takeEvery(actions.HENT_EGENANSATT_FORESPURT, hentEgenansattSaga);
}
