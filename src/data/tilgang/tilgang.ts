import { Reducer } from "redux";
import { TilgangActions, TilgangActionTypes } from "./tilgangActions";

export interface FastlegeTilgangState {
  henter: boolean;
  hentingFeilet: boolean;
  harTilgang: boolean;
  begrunnelse: string | null;
}

export const initialState: FastlegeTilgangState = {
  henter: false,
  hentingFeilet: false,
  harTilgang: false,
  begrunnelse: null,
};

const fastlegetilgang: Reducer<FastlegeTilgangState, TilgangActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TilgangActionTypes.SJEKK_FASTLEGE_TILGANG: {
      return {
        ...state,
        henter: true,
        hentingFeilet: false,
      };
    }
    case TilgangActionTypes.SJEKK_FASTLEGE_TILGANG_FEILET: {
      return {
        ...state,
        hentingFeilet: true,
        henter: false,
      };
    }
    case TilgangActionTypes.FASTLEGE_TILGANG_HENTET: {
      return {
        ...state,
        harTilgang: action.tilgang.harTilgang,
        begrunnelse: action.tilgang.begrunnelse,
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
