import { Error403 } from "./error403";

export const NAV_CONSUMER_ID_HEADER = "Nav-Consumer-Id";
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

function handleResponse(response: Response) {
  if (response.status === 401) {
    log(response, "Redirect til login");
    lagreRedirectUrlILocalStorage(window.location.href);
    window.location.href = `/login?redirectTo=${window.location.pathname}`;
    return [];
  } else if (response.status === 204) {
    return [];
  } else if (response.status > 400 && response.status !== 403) {
    throw Error(response.status.toString());
  } else {
    return response.json().then((data) => {
      if (response.status === 403) {
        const begrunnelse = data.begrunnelse || data.message;
        throw new Error403(403, begrunnelse);
      }
      return data;
    });
  }
}

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
    .then(handleResponse)
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
    .then(handleResponse)
    .catch((err: any) => {
      log(err);
      throw err;
    });
}
