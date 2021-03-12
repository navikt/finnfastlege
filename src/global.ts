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
