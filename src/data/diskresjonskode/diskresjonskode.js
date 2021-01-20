import {
  HENTER_DISKRESJONSKODE,
  DISKRESJONSKODE_HENTET,
  HENT_DISKRESJONSKODE_FEILET,
} from "./diskresjonskode_actions";
import { HENTER_FASTLEGE } from "../fastlege/fastlege_actions";

const initiellState = {
  henter: false,
  hentingFeilet: false,
  data: {},
};

export default function diskresjonskode(state = initiellState, action) {
  switch (action.type) {
    case HENT_DISKRESJONSKODE_FEILET: {
      return Object.assign({}, state, {
        data: {},
        henter: false,
        hentingFeilet: true,
      });
    }
    case HENTER_DISKRESJONSKODE: {
      return Object.assign({}, state, {
        data: {},
        henter: true,
        hentingFeilet: false,
      });
    }
    case DISKRESJONSKODE_HENTET: {
      return Object.assign({}, state, {
        data: action.data,
        henter: false,
        hentingFeilet: false,
      });
    }
    case HENTER_FASTLEGE: {
      return Object.assign({}, state, {
        henter: false,
        hentingFeilet: false,
        data: {},
      });
    }
    default: {
      return state;
    }
  }
}
