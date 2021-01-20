import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./veilederinfo_actions";
import { fullNaisUrl } from "../../global";

export function* hentVeilederinfoSaga() {
  yield put(actions.henterVeilederinfo());
  try {
    const url = fullNaisUrl(
      "syfomoteadmin",
      "/syfomoteadmin/api/internad/veilederinfo"
    );
    const data = yield call(get, url);
    yield put(actions.veilederinfoHentet(data));
  } catch (e) {
    yield put(actions.hentVeilederinfoFeilet());
  }
}

function* watchHentVeilederinfo() {
  yield takeEvery(actions.HENT_VEILEDERINFO_FORESPURT, hentVeilederinfoSaga);
}

export default function* veilederinfoSagas() {
  yield all([fork(watchHentVeilederinfo)]);
}
