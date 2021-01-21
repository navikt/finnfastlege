import {
  HENTER_FASTLEGE,
  FASTLEGE_HENTET,
  HENT_FASTLEGE_FEILET,
  FASTLEGE_IKKE_FUNNET,
  FASTLEGE_IKKE_TILGANG,
} from "./fastlege_actions";
import { DISKRESJONSKODE_HENTET } from "../diskresjonskode/diskresjonskode_actions";
import { EGENANSATT_HENTET } from "../egenansatt/egenansatt_actions";

const initiellState = {
  ikkeTilgangGrunn: {},
  ikkeTilgang: false,
  harSoktBruker: false,
  henter: false,
  ikkeFunnet: false,
  hentingFeilet: false,
  data: {},
};

export default function fastlege(state = initiellState, action) {
  switch (action.type) {
    case HENT_FASTLEGE_FEILET: {
      return Object.assign({}, state, {
        data: {},
        henter: false,
        hentingFeilet: true,
      });
    }
    case HENTER_FASTLEGE: {
      return Object.assign({}, state, {
        data: {},
        ikkeTilgangGrunn: {},
        ikkeTilgang: false,
        henter: true,
        hentingFeilet: false,
        harSoktBruker: true,
        ikkeFunnet: false,
      });
    }
    case FASTLEGE_IKKE_FUNNET: {
      return Object.assign({}, state, {
        henter: false,
        hentingFeilet: false,
        ikkeFunnet: true,
      });
    }
    case FASTLEGE_HENTET: {
      return Object.assign({}, state, {
        data: action.data,
        henter: false,
        hentingFeilet: false,
      });
    }
    case FASTLEGE_IKKE_TILGANG: {
      return Object.assign({}, state, {
        ikkeTilgangGrunn: action.ikkeTilgangGrunn,
        ikkeTilgang: true,
        henter: false,
        hentingFeilet: false,
      });
    }
    case DISKRESJONSKODE_HENTET: {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          pasient: Object.assign({}, state.data.pasient, {
            diskresjonskode: action.data,
          }),
        }),
      });
    }
    case EGENANSATT_HENTET: {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          pasient: Object.assign({}, state.data.pasient, {
            egenansatt: action.data === true,
          }),
        }),
      });
    }
    default: {
      return state;
    }
  }
}
