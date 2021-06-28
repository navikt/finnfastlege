import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api/fetch";
import * as actions from "./diskresjonskode_actions";

const SYFOPERSON_ROOT = "/syfoperson/api/v2";

export function* hentDiskresjonskodeSaga(action: any) {
  yield put(actions.henterDiskresjonskode());
  try {
    const data = yield call(
      get,
      `${SYFOPERSON_ROOT}/person/diskresjonskode`,
      action.fnr
    );
    yield put(actions.diskresjonskodeHentet(data));
  } catch (e) {
    yield put(actions.hentDiskresjonskodeFeilet());
  }
}

export default function* diskresjonskodeSagas() {
  yield takeEvery(
    actions.HENT_DISKRESJONSKODE_FORESPURT,
    hentDiskresjonskodeSaga
  );
}
