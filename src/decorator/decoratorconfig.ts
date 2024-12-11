import { DecoratorProps, Environment, UrlFormat } from "./decoratorProps";
import { erAnsattDev, erDev, erLokal, erProd } from "@/utils/miljoUtil";

const decoratorConfig = (setFnr: (fnr: string) => void): DecoratorProps => {
  return {
    appName: "Sykefraværsoppfølging",
    fetchActiveEnhetOnMount: true
    onEnhetChanged: () => {
      // do nothing
    },
    onFnrChanged: (fnr?: string | null) => {
      if (fnr) {
        setFnr(fnr);
      }
    },
    showEnheter: true,
    showSearchArea: true,
    showHotkeys: false,
    environment: getEnvironment(),
    urlFormat: getUrlFormat(),
    proxy: "/modiacontextholder",
    fnrSyncMode: "writeOnly",
  };
};

const getEnvironment = (): Environment => {
  if (erProd()) {
    return "prod";
  } else if (erDev()) {
    return "q2";
  } else {
    return "mock";
  }
};

const getUrlFormat = (): UrlFormat => {
  if (erAnsattDev()) {
    return "ANSATT";
  } else if (erLokal()) {
    return "LOCAL";
  } else return "NAV_NO";
};

export default decoratorConfig;
