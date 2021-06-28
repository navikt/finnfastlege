import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api/fetch";
import * as actions from "./fastlege_actions";
import * as egenansattActions from "../egenansatt/egenansatt_actions";
import * as diskresjonskodeActions from "../diskresjonskode/diskresjonskode_actions";
import { FastlegeInternal } from "./FastlegeInternal";
import { Error403 } from "../../api/error403";

const FASTLEGEREST_ROOT = "/fastlegerest/api/v2";

export function* hentFastlege(action: any) {
  yield put(actions.henterFastlege());
  try {
    const data: FastlegeInternal = yield call(
      get,
      `${FASTLEGEREST_ROOT}/fastlege?fnr=${action.fnr}`
    );
    yield put(actions.fastlegeHentet(data));
    yield put(egenansattActions.hentEgenansatt(action.fnr));
    yield put(diskresjonskodeActions.hentDiskresjonskode(action.fnr));
  } catch (e) {
    if (e instanceof Error403) {
      yield put(actions.fastlegeIkkeTilgang(e.message));
      return;
    }
    if (e.message === "404") {
      yield put(actions.fastlegeIkkeFunnet());
      return;
    }
    yield put(actions.hentFastlegeFeilet());
  }
}

export default function* fastlegeSagas() {
  yield takeEvery(actions.HENT_FASTLEGE_FORESPURT, hentFastlege);
}
