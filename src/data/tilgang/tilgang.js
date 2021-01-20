import {
  SJEKKER_FASTLEGE_TILGANG,
  SJEKK_FASTLEGE_TILGANG_FEILET,
  FASTLEGE_TILGANG_HENTET,
} from "../fastlege/fastlege_actions";

const initiellState = {
  henter: false,
  hentingFeilet: false,
  harTilgang: false,
};

export default function fastlege(state = initiellState, action) {
  switch (action.type) {
    case SJEKKER_FASTLEGE_TILGANG: {
      return Object.assign({}, state, {
        henter: true,
        hentingFeilet: false,
      });
    }
    case SJEKK_FASTLEGE_TILGANG_FEILET: {
      return Object.assign({}, state, {
        hentingFeilet: true,
        henter: false,
      });
    }
    case FASTLEGE_TILGANG_HENTET: {
      return Object.assign({}, state, {
        harTilgang: action.data,
        henter: false,
        hentingFeilet: false,
      });
    }
    default: {
      return state;
    }
  }
}
