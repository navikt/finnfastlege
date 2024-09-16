export const erDev = (): boolean => {
  return (
    window.location.href.indexOf("dev.intern.nav.no") > -1 ||
    window.location.href.indexOf("intern.dev.nav.no") > -1 ||
    erAnsattDev()
  );
};

export const erAnsattDev = (): boolean => {
  return window.location.href.indexOf("ansatt.dev.nav.no") > -1;
};

export const erLokal = (): boolean => {
  return window.location.host.indexOf("localhost") > -1;
};
export function erProd(): boolean {
  return window.location.href.indexOf("finnfastlege.intern.nav.no") > -1;
}

const finnNaisUrlDefault = (): string => {
  if (erAnsattDev()) {
    return ".ansatt.dev.nav.no";
  } else if (erDev()) {
    return ".intern.dev.nav.no";
  } else {
    return ".intern.nav.no";
  }
};

export const fullNaisUrlDefault = (host: string, path: string) => {
  if (erLokal()) {
    return `http://localhost:8081${path}`;
  }
  return `https://${host}${finnNaisUrlDefault()}${path}`;
};
