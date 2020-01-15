export const erPreProd = () => {
    return window.location.href.indexOf('nais.preprod.local') > -1;
};

export const erLokal = () => {
    return window.location.host.indexOf('localhost') > -1;
};

export const finnNaisUrlQ1 = () => {
    return erPreProd() ?
        '-q1.nais.preprod.local'
        : '.nais.adeo.no';
};

export const fullNaisUrlQ1 = (host, path) => {
    if (erLokal()) {
        return path;
    }
    return `https://${host}${finnNaisUrlQ1()}${path}`;
};
