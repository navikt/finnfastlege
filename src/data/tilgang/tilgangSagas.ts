import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "@/api/fetch";
import {
  fastlegeTilgangHentet,
  sjekkFastlegeTilgangFeilet,
  TilgangActionTypes,
} from "./tilgangActions";
import { Tilgang } from "./tilgangTypes";
import { Error403 } from "@/api/error403";

const TILGANGSKONTROLL_AD_PATH =
  "/syfo-tilgangskontroll/api/tilgang/navident/syfo";

export function* sjekkFastlegeTilgang() {
  try {
    const tilgang: Tilgang = yield call(get, TILGANGSKONTROLL_AD_PATH);
    yield put(fastlegeTilgangHentet(tilgang));
  } catch (e) {
    if (e instanceof Error403) {
      yield put(
        fastlegeTilgangHentet({ harTilgang: false, begrunnelse: e.message })
      );
      return;
    }
    yield put(sjekkFastlegeTilgangFeilet());
  }
}

export default function* tilgangSagas() {
  yield takeEvery(
    TilgangActionTypes.SJEKK_FASTLEGE_TILGANG,
    sjekkFastlegeTilgang
  );
}
