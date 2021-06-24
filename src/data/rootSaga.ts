import { all } from "redux-saga/effects";
import fastlegeSagas from "./fastlege/fastlegeSagas";
import egenansattSagas from "./egenansatt/egenansattSagas";
import diskresjonskodeSagas from "./diskresjonskode/diskresjonskodeSagas";
import tilgangSagas from "./tilgang/tilgangSagas";

export default function* rootSaga() {
  yield all([
    fastlegeSagas(),
    egenansattSagas(),
    diskresjonskodeSagas(),
    tilgangSagas(),
  ]);
}
