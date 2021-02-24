import { Reducer } from "redux";
import {
  SJEKKER_FASTLEGE_TILGANG,
  SJEKK_FASTLEGE_TILGANG_FEILET,
  FASTLEGE_TILGANG_HENTET,
} from "../fastlege/fastlege_actions";

export interface FastlegeTilgangState {
  henter: boolean;
  hentingFeilet: boolean;
  harTilgang: boolean;
}

export const initialState: FastlegeTilgangState = {
  henter: false,
  hentingFeilet: false,
  harTilgang: false,
};

const fastlegetilgang: Reducer<FastlegeTilgangState> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case SJEKKER_FASTLEGE_TILGANG: {
      return {
        ...state,
        henter: true,
        hentingFeilet: false,
      };
    }
    case SJEKK_FASTLEGE_TILGANG_FEILET: {
      return {
        ...state,
        hentingFeilet: true,
        henter: false,
      };
    }
    case FASTLEGE_TILGANG_HENTET: {
      return {
        ...state,
        harTilgang: action.data,
        henter: false,
        hentingFeilet: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default fastlegetilgang;
