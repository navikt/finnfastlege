import { VeilederinfoDTO } from "./VeilederinfoDTO";

export const HENT_VEILEDERINFO_FORESPURT = "HENT_VEILEDERINFO_FORESPURT";
export const HENTER_VEILEDERINFO = "HENTER_VEILEDERINFO";
export const HENT_VEILEDERINFO_FEILET = "HENT_VEILEDERINFO_FEILET";
export const VEILEDERINFO_HENTET = "VEILEDERINFO_HENTET";

export const hentVeilederinfo = () => {
  return {
    type: HENT_VEILEDERINFO_FORESPURT,
  };
};

export const henterVeilederinfo = () => {
  return {
    type: HENTER_VEILEDERINFO,
  };
};

export const veilederinfoHentet = (data: VeilederinfoDTO) => {
  return {
    type: VEILEDERINFO_HENTET,
    data,
  };
};

export const hentVeilederinfoFeilet = () => {
  return {
    type: HENT_VEILEDERINFO_FEILET,
  };
};
