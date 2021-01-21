export const HENT_FASTLEGE_FORESPURT = "HENT_FASTLEGE_FORESPURT";
export const HENTER_FASTLEGE = "HENTER_FASTLEGE";
export const HENT_FASTLEGE_FEILET = "HENT_FASTLEGE_FEILET";
export const FASTLEGE_HENTET = "FASTLEGE_HENTET";
export const FASTLEGE_IKKE_FUNNET = "FASTLEGE_IKKE_FUNNET";
export const FASTLEGE_IKKE_TILGANG = "FASTLEGE_IKKE_TILGANG";

export const SJEKK_FASTLEGE_TILGANG_FORESPURT =
  "SJEKK_FASTLEGE_TILGANG_FORESPURT";
export const SJEKKER_FASTLEGE_TILGANG = "SJEKKER_FASTLEGE_TILGANG";
export const SJEKK_FASTLEGE_TILGANG_FEILET = "SJEKK_FASTLEGE_TILGANG_FEILET";
export const FASTLEGE_TILGANG_HENTET = "FASTLEGE_TILGANG_HENTET";

export function hentFastlegeFeilet() {
  return {
    type: HENT_FASTLEGE_FEILET,
  };
}

export function henterFastlege() {
  return {
    type: HENTER_FASTLEGE,
  };
}

export function fastlegeIkkeFunnet() {
  return {
    type: FASTLEGE_IKKE_FUNNET,
  };
}

export function fastlegeIkkeTilgang(ikkeTilgangGrunn) {
  return {
    type: FASTLEGE_IKKE_TILGANG,
    ikkeTilgangGrunn,
  };
}

export function fastlegeHentet(data) {
  return {
    type: FASTLEGE_HENTET,
    data,
  };
}

export function hentFastlege(fnr) {
  return {
    type: HENT_FASTLEGE_FORESPURT,
    fnr,
  };
}

export function sjekkerFastlegeTilgang() {
  return {
    type: SJEKKER_FASTLEGE_TILGANG,
  };
}

export function sjekkFastlegeTilgangFeilet() {
  return {
    type: SJEKK_FASTLEGE_TILGANG_FEILET,
  };
}

export function fastlegeTilgangHentet(data) {
  return {
    type: FASTLEGE_TILGANG_HENTET,
    data,
  };
}

export function sjekkFastlegeTilgang() {
  return {
    type: SJEKK_FASTLEGE_TILGANG_FORESPURT,
  };
}
