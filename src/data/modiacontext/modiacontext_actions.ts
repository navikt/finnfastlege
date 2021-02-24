export const PUSH_MODIACONTEXT_FORESPURT = "PUSH_MODIACONTEXT_FORESPURT";
export const PUSH_MODIACONTEXT_FEILET = "PUSH_MODIACONTEXT_FEILET";
export const MODIACONTEXT_PUSHET = "MODIACONTEXT_PUSHET";
export const PUSHER_MODIACONTEXT = "PUSHER_MODIACONTEXT";

export const HENT_AKTIVENHET_FORESPURT = "HENT_AKTIVENHET_FORESPURT";
export const HENTER_AKTIVENHET = "HENTER_AKTIVENHET";
export const HENT_AKTIVENHET_FEILET = "HENT_AKTIVENHET_FEILET";
export const AKTIVENHET_HENTET = "AKTIVENHET_HENTET";

export interface ModiacontextPayload {
  verdi: string;
  eventType: string;
}

export const hentAktivEnhet = (data: any) => {
  return {
    type: HENT_AKTIVENHET_FORESPURT,
    data,
  };
};

export const hentAktivEnhetFeilet = () => {
  return {
    type: HENT_AKTIVENHET_FEILET,
  };
};

export const henterAktivEnhet = () => {
  return {
    type: HENTER_AKTIVENHET,
  };
};

export const aktivEnhetHentet = (data: any) => {
  return {
    type: AKTIVENHET_HENTET,
    data,
  };
};

export const pushModiaContextFeilet = () => {
  return {
    type: PUSH_MODIACONTEXT_FEILET,
  };
};

export const pusherModiaContext = () => {
  return {
    type: PUSHER_MODIACONTEXT,
  };
};

export const pushModiaContext = (data: ModiacontextPayload) => {
  return {
    type: PUSH_MODIACONTEXT_FORESPURT,
    data,
  };
};

export const modiaContextPushet = () => {
  return {
    type: MODIACONTEXT_PUSHET,
  };
};
