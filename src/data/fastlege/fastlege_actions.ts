import { FastlegeDTO } from "./FastlegeDTO";

export const HENT_FASTLEGE_FORESPURT = "HENT_FASTLEGE_FORESPURT";
export const HENTER_FASTLEGE = "HENTER_FASTLEGE";
export const HENT_FASTLEGE_FEILET = "HENT_FASTLEGE_FEILET";
export const FASTLEGE_HENTET = "FASTLEGE_HENTET";
export const FASTLEGE_IKKE_FUNNET = "FASTLEGE_IKKE_FUNNET";
export const FASTLEGE_IKKE_TILGANG = "FASTLEGE_IKKE_TILGANG";

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

export function fastlegeIkkeTilgang(ikkeTilgangGrunn: string) {
  return {
    type: FASTLEGE_IKKE_TILGANG,
    ikkeTilgangGrunn,
  };
}

export function fastlegeHentet(data: FastlegeDTO) {
  return {
    type: FASTLEGE_HENTET,
    data,
  };
}

export function hentFastlege(fnr: string) {
  return {
    type: HENT_FASTLEGE_FORESPURT,
    fnr,
  };
}
