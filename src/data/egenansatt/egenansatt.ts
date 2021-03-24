import { Reducer } from "redux";
import {
  HENTER_EGENANSATT,
  EGENANSATT_HENTET,
  HENT_EGENANSATT_FEILET,
} from "./egenansatt_actions";
import { HENTER_FASTLEGE } from "../fastlege/fastlege_actions";

export interface EgenansattState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  data?: boolean;
}

export const initialState: EgenansattState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: undefined,
};

const egenansatt: Reducer<EgenansattState> = (state = initialState, action) => {
  switch (action.type) {
    case HENTER_EGENANSATT: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: undefined,
      };
    }
    case EGENANSATT_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case HENT_EGENANSATT_FEILET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: true,
      };
    }
    case HENTER_FASTLEGE: {
      return {
        ...state,
        henter: false,
        hentet: false,
        hentingFeilet: false,
        data: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default egenansatt;
