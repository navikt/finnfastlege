import { Tilgang } from "./tilgangTypes";

export enum TilgangActionTypes {
  SJEKK_FASTLEGE_TILGANG = "SJEKK_FASTLEGE_TILGANG",
  SJEKK_FASTLEGE_TILGANG_FEILET = "SJEKK_FASTLEGE_TILGANG_FEILET",
  FASTLEGE_TILGANG_HENTET = "FASTLEGE_TILGANG_HENTET",
}

export interface SjekkFastlegeTilgangAction {
  type: TilgangActionTypes.SJEKK_FASTLEGE_TILGANG;
}

export interface SjekkFastlegeTilgangFeiletAction {
  type: TilgangActionTypes.SJEKK_FASTLEGE_TILGANG_FEILET;
}

export interface FastlegeTilgangHentetAction {
  type: TilgangActionTypes.FASTLEGE_TILGANG_HENTET;
  tilgang: Tilgang;
}

export function sjekkFastlegeTilgang(): SjekkFastlegeTilgangAction {
  return {
    type: TilgangActionTypes.SJEKK_FASTLEGE_TILGANG,
  };
}

export function sjekkFastlegeTilgangFeilet(): SjekkFastlegeTilgangFeiletAction {
  return {
    type: TilgangActionTypes.SJEKK_FASTLEGE_TILGANG_FEILET,
  };
}

export function fastlegeTilgangHentet(
  tilgang: Tilgang
): FastlegeTilgangHentetAction {
  return {
    type: TilgangActionTypes.FASTLEGE_TILGANG_HENTET,
    tilgang,
  };
}

export type TilgangActions =
  | SjekkFastlegeTilgangAction
  | SjekkFastlegeTilgangFeiletAction
  | FastlegeTilgangHentetAction;
