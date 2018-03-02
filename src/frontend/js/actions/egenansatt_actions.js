import * as actiontype from './actiontyper';

export function hentEgenansatt(fnr) {
    return {
        type: actiontype.HENT_EGENANSATT_FORESPURT,
        fnr,
    };
}

export function hentEgenansattFeilet() {
    return {
        type: actiontype.HENT_EGENANSATT_FEILET,
    };
}

export function henterEgenansatt() {
    return {
        type: actiontype.HENTER_EGENANSATT,
    };
}

export function egenansattHentet(data) {
    return {
        type: actiontype.EGENANSATT_HENTET,
        data,
    };
}
