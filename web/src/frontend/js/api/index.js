import { getCookie, log } from 'digisyfo-npm';

export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
    .then((res) => {
        if (res.status === 404) {
            throw new Error('404');
        } else if (res.status === 403) {
            return res.json();
        }
        if (res.status > 400) {
            throw new Error('Det oppstod en feil');
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
        headers: {
            'Content-Type': 'application/json',
            NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        },
    })
    .then((res) => {
        if (res.status > 400) {
            log(res);
            throw new Error('Forespørsel feilet');
        } else {
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
        console.log(res);
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}
