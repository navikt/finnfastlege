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

export function sjekkerFastlegeTilgang() {
    return {
        type: actiontyper.SJEKKER_FASTLEGE_TILGANG,
    };
}

export function sjekkFastlegeTilgangFeilet() {
    return {
        type: actiontyper.SJEKK_FASTLEGE_TILGANG_FEILET,
    };
}

export function fastlegeTilgangHentet(data) {
    return {
        type: actiontyper.FASTLEGE_TILGANG_HENTET,
        data,
    };
}

export function sjekkFastlegeTilgang() {
    return {
        type: actiontyper.SJEKK_FASTLEGE_TILGANG_FORESPURT,
    };
}
