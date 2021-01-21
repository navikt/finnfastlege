import {
  HENTER_EGENANSATT,
  EGENANSATT_HENTET,
  HENT_EGENANSATT_FEILET,
} from "./egenansatt_actions";
import { HENTER_FASTLEGE } from "../fastlege/fastlege_actions";

const initiellState = {
  henter: false,
  hentingFeilet: false,
  data: {},
};

export default function egenansatt(state = initiellState, action) {
  switch (action.type) {
    case HENT_EGENANSATT_FEILET: {
      return Object.assign({}, state, {
        data: {},
        henter: false,
        hentingFeilet: true,
      });
    }
    case HENTER_EGENANSATT: {
      return Object.assign({}, state, {
        data: {},
        henter: true,
        hentingFeilet: false,
      });
    }
    case EGENANSATT_HENTET: {
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
