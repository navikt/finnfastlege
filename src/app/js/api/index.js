const log = () => {};

export const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export const erProd = () => {
    return window.location.href.indexOf('nais.adeo.no') > -1;
};

export const erPreProd = () => {
    return window.location.href.indexOf('nais.preprod.local') > -1;
};

export const hentLoginUrl = () => {
    if (erProd()) {
        return 'https://loginservice.nais.adeo.no/login';
    }
    // Preprod
    return 'https://loginservice.nais.preprod.local/login';
};

export const hentRedirectBaseUrl = () => {
    if (erProd()) {
        return 'https://finnfastlege.nais.adeo.no';
    }
    return 'https://finnfastlege.nais.preprod.local';
};

export const lagreRedirectUrlILocalStorage = (href) => {
    localStorage.setItem('redirecturl', href);
};

export function get(url) {
    return fetch(url, { credentials: 'include' })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                lagreRedirectUrlILocalStorage(window.location.href);
                window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl(window.location.href)}/fastlege`;
            } else if (res.status === 403) {
                window.location.href = `/na`;
            } else if (res.status === 404) {
                throw new Error('404');
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            } else if (res.status === 204) {
                return [];
            }
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}

export function post(url, body) {
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                lagreRedirectUrlILocalStorage(window.location.href);
                window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl(window.location.href)}`;
                return null;
            }
            if (res.status === 403) {
                window.location.href = `/na`;
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            } else {
                const contentType = res.headers.get('Content-Type') || '';
                if (contentType.includes('json')) {
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

export function getWithoutThrows(url) {
    return fetch(url, {
        credentials: 'include',
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}
