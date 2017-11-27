import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function egenansatt(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.HENT_DISKRESJONSKODE_FEILET: {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontyper.HENTER_DISKRESJONSKODE: {
            return Object.assign({}, state, {
                data: {},
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontyper.DISKRESJONSKODE_HENTET: {
            return Object.assign({}, state, {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            });
        }
        case actiontyper.HENTER_FASTLEGE: {
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
