import * as actiontype from './actiontyper';

export function hentDiskresjonskode(fnr) {
    return {
        type: actiontype.HENT_DISKRESJONSKODE_FORESPURT,
        fnr,
    };
}

export function hentDiskresjonskodeFeilet() {
    return {
        type: actiontype.HENT_DISKRESJONSKODE_FEILET,
    };
}

export function henterDiskresjonskode() {
    return {
        type: actiontype.HENTER_DISKRESJONSKODE,
    };
}

export function diskresjonskodeHentet(data) {
    return {
        type: actiontype.DISKRESJONSKODE_HENTET,
        data,
    };
}