import axios from 'axios';
import { Error403 } from './errors';

const log = () => {};

export const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export function get(url) {
    return axios
        .get(url, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status === 404) {
                throw new Error('404');
            }
            if (res.status > 400 && res.status !== 403) {
                throw new Error('Det oppstod en feil');
            }
            return res.json().then((data) => {
                if (res.status === 403) {
                    const tilgang = {
                        harTilgang: false,
                        begrunnelse: data.message,
                    };
                    throw new Error403('403', 403, tilgang);
                }
                return data;
            });
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}

export function post(url, body) {
    return axios
        .post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
            },
            withCredentials: true,
        })
        .then((res) => {
            if (res.status >= 400) {
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
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}
