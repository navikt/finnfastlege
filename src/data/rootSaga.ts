import { all } from "redux-saga/effects";
import fastlegeSagas from "./fastlege/fastlegeSagas";
import egenansattSagas from "./egenansatt/egenansattSagas";
import diskresjonskodeSagas from "./diskresjonskode/diskresjonskodeSagas";

export default function* rootSaga() {
  yield all([fastlegeSagas(), egenansattSagas(), diskresjonskodeSagas()]);
}
