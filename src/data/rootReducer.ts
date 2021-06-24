import { combineReducers } from "redux";
import fastlege, { FastlegeState } from "./fastlege/fastlege";
import tilgang, { FastlegeTilgangState } from "./tilgang/tilgang";
import diskresjonskode, {
  DiskresjonskodeState,
} from "./diskresjonskode/diskresjonskode";
import egenansatt, { EgenansattState } from "./egenansatt/egenansatt";

export interface RootState {
  fastlege: FastlegeState;
  tilgang: FastlegeTilgangState;
  diskresjonskode: DiskresjonskodeState;
  egenansatt: EgenansattState;
}

const rootReducer = combineReducers<RootState>({
  fastlege,
  tilgang,
  diskresjonskode,
  egenansatt,
});

export default rootReducer;
