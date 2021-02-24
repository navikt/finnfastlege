import { all, call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./fastlege_actions";
import * as egenansattActions from "../egenansatt/egenansatt_actions";
import * as diskresjonskodeActions from "../diskresjonskode/diskresjonskode_actions";

const FASTLEGEREST_ROOT = "/fastlegerest/api/internad";
const TILGANGSKONTROLL_AD_PATH = "/syfo-tilgangskontroll/api/tilgang/syfo";

const fastlegeRestUrl = (path: string) => {
  return path;
};

export function* hentFastlege(action: any) {
  yield put(actions.henterFastlege());
  try {
    const data = yield call(
      get,
      fastlegeRestUrl(`${FASTLEGEREST_ROOT}/fastlege/v1?fnr=${action.fnr}`)
    );
    yield put(actions.fastlegeHentet(data));
    yield put(egenansattActions.hentEgenansatt(action.fnr));
    yield put(diskresjonskodeActions.hentDiskresjonskode(action.fnr));
  } catch (e) {
    if (e.status === 403) {
      yield put(actions.fastlegeIkkeTilgang(e.tilgang.begrunnelse));
      return;
    }
    if (e.message === "404") {
      yield put(actions.fastlegeIkkeFunnet());
      return;
    }
    yield put(actions.hentFastlegeFeilet());
  }
}

export function* sjekkFastlegeTilgang() {
  yield put(actions.sjekkerFastlegeTilgang());
  try {
    const data = yield call(get, TILGANGSKONTROLL_AD_PATH);
    yield put(actions.fastlegeTilgangHentet(data));
  } catch (e) {
    yield put(actions.sjekkFastlegeTilgangFeilet());
  }
}

function* watchHentFastlege() {
  yield takeEvery(actions.HENT_FASTLEGE_FORESPURT, hentFastlege);
}

function* watchSjekkTilgang() {
  yield takeEvery(
    actions.SJEKK_FASTLEGE_TILGANG_FORESPURT,
    sjekkFastlegeTilgang
  );
}

export default function* fastlegeSagas() {
  yield all([fork(watchHentFastlege), fork(watchSjekkTilgang)]);
}
