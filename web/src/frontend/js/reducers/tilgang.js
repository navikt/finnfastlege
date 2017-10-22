import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    harTilgang: false,
};

export default function fastlege(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SJEKKER_FASTLEGE_TILGANG: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontyper.SJEKK_FASTLEGE_TILGANG_FEILET: {
            return Object.assign({}, state, {
                hentingFeilet: true,
                henter: false,
            });
        }
        case actiontyper.FASTLEGE_TILGANG_HENTET: {
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
