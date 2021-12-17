import { combineReducers } from "redux";
import fastlege, { FastlegeState } from "./fastlege/fastlege";
import diskresjonskode, {
  DiskresjonskodeState,
} from "./diskresjonskode/diskresjonskode";
import egenansatt, { EgenansattState } from "./egenansatt/egenansatt";

export interface RootState {
  fastlege: FastlegeState;
  diskresjonskode: DiskresjonskodeState;
  egenansatt: EgenansattState;
}

const rootReducer = combineReducers<RootState>({
  fastlege,
  diskresjonskode,
  egenansatt,
});

export default rootReducer;
