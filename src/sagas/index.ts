import { all } from "redux-saga/effects";
import fastlegeSagas from "../data/fastlege/fastlegeSagas";
import egenansattSagas from "../data/egenansatt/egenansattSagas";
import diskresjonskodeSagas from "../data/diskresjonskode/diskresjonskodeSagas";

export default function* rootSaga() {
  yield all([fastlegeSagas(), egenansattSagas(), diskresjonskodeSagas()]);
}
