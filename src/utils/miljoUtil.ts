export const erPreProd = () => {
  return (
    window.location.href.indexOf("intern.dev.nav.no") > -1 ||
    window.location.href.indexOf("dev.intern.nav.no") > -1
  );
};

export const erLokal = () => {
  return window.location.host.indexOf("localhost") > -1;
};

export const finnNaisUrlDefault = () => {
  return erPreProd() ? ".intern.dev.nav.no" : ".intern.nav.no";
};

export const fullNaisUrlDefault = (host: string, path: string) => {
  if (erLokal()) {
    return `http://localhost:8081${path}`;
  }
  return `https://${host}${finnNaisUrlDefault()}${path}`;
};
