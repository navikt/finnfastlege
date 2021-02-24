const { HOST_NAMES } = require("./konstanter");

export const erPreProd = () => {
  return window.location.href.indexOf("nais.preprod.local") > -1;
};

export const erLokal = () => {
  return window.location.host.indexOf("localhost") > -1;
};

export const erHerokuApp = () => {
  return window.location.href.indexOf("herokuapp") > -1;
};

export const finnNaisUrl = () => {
  return erPreProd() ? ".nais.preprod.local" : ".nais.adeo.no";
};

export const fullNaisUrl = (host: string, path: string) => {
  if (erLokal() || erHerokuApp()) {
    return path;
  }
  return `https://${host}${finnNaisUrl()}${path}`;
};

export const config = {
  config: {
    dataSources: {
      veileder: `${fullNaisUrl(
        HOST_NAMES.SYFOMOTEADMIN,
        `/syfomoteadmin/api/internad/veilederinfo`
      )}`,
      enheter: `${fullNaisUrl(
        HOST_NAMES.SYFOMOTEADMIN,
        `/syfomoteadmin/api/internad/veilederinfo/enheter`
      )}`,
    },
    initiellEnhet: erLokal() || erHerokuApp() ? "0316" : "",
    toggles: {
      visEnhetVelger: true,
      visVeileder: true,
      visSokefelt: true,
      toggleSendEventVedEnEnhet: false,
    },
    handlePersonsokSubmit: undefined,
    applicationName: "Sykefraværsoppfølging",
    handleChangeEnhet: undefined,
  },
};

export const setEventHandlersOnConfig = (
  handlePersonsokSubmit: (fnr: string) => any,
  handleChangeEnhet: (data: string) => any
) => {
  (config.config as any).handlePersonsokSubmit = handlePersonsokSubmit;
  (config.config as any).handleChangeEnhet = handleChangeEnhet;
};
