import { Reducer } from "redux";
import { FastlegeInternal } from "./FastlegeInternal";
import {
  HENTER_FASTLEGE,
  FASTLEGE_HENTET,
  HENT_FASTLEGE_FEILET,
  FASTLEGE_IKKE_FUNNET,
  FASTLEGE_IKKE_TILGANG,
} from "./fastlege_actions";
import { DISKRESJONSKODE_HENTET } from "../diskresjonskode/diskresjonskode_actions";
import { EGENANSATT_HENTET } from "../egenansatt/egenansatt_actions";

export interface FastlegeState {
  ikkeTilgangGrunn: string;
  ikkeTilgang: boolean;
  harSoktBruker: boolean;
  henter: boolean;
  ikkeFunnet: boolean;
  hentingFeilet: boolean;
  data: FastlegeInternal;
}

export const initialState: FastlegeState = {
  ikkeTilgangGrunn: "",
  ikkeTilgang: false,
  harSoktBruker: false,
  henter: false,
  ikkeFunnet: false,
  hentingFeilet: false,
  data: <FastlegeInternal>{},
};

const fastlege: Reducer<FastlegeState> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case HENT_FASTLEGE_FEILET: {
      return {
        ...state,
        data: <FastlegeInternal>{},
        henter: false,
        hentingFeilet: true,
      };
    }
    case HENTER_FASTLEGE: {
      return {
        ...state,
        data: <FastlegeInternal>{},
        ikkeTilgangGrunn: {},
        ikkeTilgang: false,
        henter: true,
        hentingFeilet: false,
        harSoktBruker: true,
        ikkeFunnet: false,
      };
    }
    case FASTLEGE_IKKE_FUNNET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: false,
        ikkeFunnet: true,
      };
    }
    case FASTLEGE_HENTET: {
      return {
        ...state,
        data: action.data,
        henter: false,
        hentingFeilet: false,
      };
    }
    case FASTLEGE_IKKE_TILGANG: {
      return {
        ...state,
        ikkeTilgangGrunn: action.ikkeTilgangGrunn,
        ikkeTilgang: true,
        henter: false,
        hentingFeilet: false,
      };
    }
    case DISKRESJONSKODE_HENTET: {
      return {
        ...state,
        data: {
          ...state.data,
          pasient: {
            ...state.data.pasient,
            diskresjonskode: action.data,
          },
        },
      };
    }
    case EGENANSATT_HENTET: {
      return {
        ...state,
        data: {
          ...state.data,
          pasient: {
            ...state.data?.pasient,
            egenansatt: action.data === true,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default fastlege;
