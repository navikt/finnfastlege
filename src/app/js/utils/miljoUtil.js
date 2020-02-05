export const erProd = () => {
    return window.location.href.indexOf('nais.adeo.no') > -1;
};

export const erPreProd = () => {
    return window.location.href.indexOf('nais.preprod.local') > -1;
};

export const erLokal = () => {
    return window.location.host.indexOf('localhost') > -1;
};

export const finnNaisUrlDefault = () => {
    return erPreProd() ?
        '.nais.preprod.local'
        : '.nais.adeo.no';
};

export const finnMiljoStreng = () => {
    return erPreProd()
        ? '-q1'
        : '';
};

export const fullAppAdeoUrl = (path) => {
    if (erLokal()) {
        return path;
    }
    return `https://app${finnMiljoStreng()}.adeo.no${path}`;
};

export const fullNaisUrlDefault = (host, path) => {
    if (erLokal()) {
        return path;
    }
    return `https://${host}${finnNaisUrlDefault()}${path}`;
};
