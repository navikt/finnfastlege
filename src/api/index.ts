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
        window.location.href = `/login?redirectTo=${window.location.pathname}`;
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
        window.location.href = `/login?redirectTo=${window.location.pathname}`;
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
