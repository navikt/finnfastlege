import { erAnsattDev, erDev, erLokal, erProd } from "@/utils/miljoUtil";
import {
  DecoratorProps,
  Environment,
  UrlFormat,
} from "@/decorator/internarbeidsflateDecorator";

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

export const decoratorConfig: DecoratorProps = {
  appName: "Sykefraværsoppfølging",
  fetchActiveEnhetOnMount: true,
  showEnheter: true,
  showSearchArea: true,
  environment: getEnvironment(),
  urlFormat: getUrlFormat(),
  proxy: "/modiacontextholder",
  fnrSyncMode: "writeOnly",
  showHotkeys: true,
};
