import {
    HENT_VEILEDERINFO_FORESPURT,
    HENTER_VEILEDERINFO,
    VEILEDERINFO_HENTET,
    HENT_VEILEDERINFO_FEILET,
} from './actiontyper';

export function hentVeilederinfo() {
    return {
        type: HENT_VEILEDERINFO_FORESPURT,
    };
}

export function henterVeilederinfo() {
    return {
        type: HENTER_VEILEDERINFO,
    };
}

export function veilederinfoHentet(data) {
    return {
        type: VEILEDERINFO_HENTET,
        data,
    };
}

export function hentVeilederinfoFeilet() {
    return {
        type: HENT_VEILEDERINFO_FEILET,
    };
}
