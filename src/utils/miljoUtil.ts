export const erProd = () => {
  return window.location.href.indexOf("nais.adeo.no") > -1;
};

export const erPreProd = () => {
  return window.location.href.indexOf("nais.preprod.local") > -1;
};

export const erLokal = () => {
  return window.location.host.indexOf("localhost") > -1;
};

export const finnNaisUrlDefault = () => {
  return erPreProd() ? ".nais.preprod.local" : ".nais.adeo.no";
};

export const finnMiljoStreng = () => {
  return erPreProd() ? "-q1" : "";
};

export const fullNaisUrlDefault = (host: string, path: string) => {
  if (erLokal()) {
    return `http://localhost:8081${path}`;
  }
  return `https://${host}${finnNaisUrlDefault()}${path}`;
};
