import { all } from "redux-saga/effects";
import fastlegeSagas from "../data/fastlege/fastlegeSagas";
import modiacontextSagas from "../data/modiacontext/modiacontextSagas";
import egenansattSagas from "../data/egenansatt/egenansattSagas";
import diskresjonskodeSagas from "../data/diskresjonskode/diskresjonskodeSagas";
import veilederinfoSagas from "../data/veilederinfo/veilederinfoSagas";

export default function* rootSaga() {
  yield all([
    fastlegeSagas(),
    modiacontextSagas(),
    egenansattSagas(),
    diskresjonskodeSagas(),
    veilederinfoSagas(),
  ]);
}
