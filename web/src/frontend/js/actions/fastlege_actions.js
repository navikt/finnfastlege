import * as actiontyper from './actiontyper';

export function hentFastlegeFeilet() {
    return {
        type: actiontyper.HENT_FASTLEGE_FEILET,
    };
}

export function henterFastlege() {
    return {
        type: actiontyper.HENTER_FASTLEGE,
    };
}

export function fastlegeIkkeFunnet() {
    return {
        type: actiontyper.FASTLEGE_IKKE_FUNNET,
    };
}

export function fastlegeHentet(data) {
    return {
        type: actiontyper.FASTLEGE_HENTET,
        data,
    };
}

export function hentFastlege(fnr) {
    return {
        type: actiontyper.HENT_FASTLEGE_FORESPURT,
        fnr,
    };
}
