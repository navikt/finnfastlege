export const NAV_CONSUMER_ID_HEADER = "nav-consumer-id";
export const NAV_CONSUMER_ID = "finnfastlege";
export const NAV_PERSONIDENT_HEADER = "nav-personident";

const createLogger = () => {
  if (
    window.location.search.indexOf("log=true") > -1 ||
    process.env.NODE_ENV === "development"
  ) {
    // tslint:disable-next-line
    return console.log;
  }
  // tslint:disable-next-line
  return () => {};
};

const log = createLogger();

export const getCookie = (name: string) => {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match !== null ? match[1] : "";
};

export const erProd = () => {
  return window.location.href.indexOf("nais.adeo.no") > -1;
};

export const erPreProd = () => {
  return window.location.href.indexOf("nais.preprod.local") > -1;
};

export const hentLoginUrl = () => {
  if (erProd()) {
    return "https://loginservice.nais.adeo.no/login";
  }
  // Preprod
  return "https://loginservice.nais.preprod.local/login";
};

export const hentRedirectBaseUrl = () => {
  if (erProd()) {
    return "https://finnfastlege.nais.adeo.no";
  }
  return "https://finnfastlege.nais.preprod.local";
};

export const lagreRedirectUrlILocalStorage = (href: string) => {
  localStorage.setItem("redirecturl", href);
};

export function get(url: string, personIdent?: string) {
  let headers: {} = {
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
  };
  if (personIdent) {
    headers = {
      ...headers,
      [NAV_PERSONIDENT_HEADER]: personIdent,
    };
  }
  return fetch(url, {
    credentials: "include",
    headers,
  })
    .then((res: any) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        lagreRedirectUrlILocalStorage(window.location.href);
        window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}/fastlege/`;
      } else if (res.status === 403) {
        window.location.href = `/na`;
      } else if (res.status === 404) {
        throw new Error("404");
      } else if (res.status > 400) {
        log(res);
        throw new Error("Forespørsel feilet");
      } else if (res.status === 204) {
        return [];
      }
      return res.json();
    })
    .catch((err: any) => {
      log(err);
      throw err;
    });
}

export function post(url: string, body: object) {
  return fetch(url, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        log(res, "Redirect til login");
        lagreRedirectUrlILocalStorage(window.location.href);
        window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl()}/fastlege/`;
        return null;
      } else if (res.status > 400) {
        log(res);
        throw new Error("Forespørsel feilet");
      } else {
        const contentType = res.headers.get("Content-Type") || "";
        if (contentType.includes("json")) {
          return res.json();
        }
        return res;
      }
    })
    .catch((err) => {
      log(err);
      throw err;
    });
}
