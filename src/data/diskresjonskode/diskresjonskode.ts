import { Reducer } from "redux";
import {
  HENTER_DISKRESJONSKODE,
  DISKRESJONSKODE_HENTET,
  HENT_DISKRESJONSKODE_FEILET,
} from "./diskresjonskode_actions";
import { HENTER_FASTLEGE } from "../fastlege/fastlege_actions";

export interface DiskresjonskodeState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  data: string;
}

export const initialState: DiskresjonskodeState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: "",
};

const diskresjonskode: Reducer<DiskresjonskodeState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HENTER_DISKRESJONSKODE: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: "",
      };
    }
    case DISKRESJONSKODE_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case HENT_DISKRESJONSKODE_FEILET: {
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
        data: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default diskresjonskode;
