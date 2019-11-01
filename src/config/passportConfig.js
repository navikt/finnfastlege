const serverConfig = require('../serverConfig');

const hentPassportConfig = () => {
    let config = {};

    const host = serverConfig.host || 'fastlegefront';
    switch (serverConfig.env) {
        case 'local':
            config = {
                allowHttpForRedirectUrl: true,
                cookieDomain: host,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=http:\\\\localhost:8000`,
                redirectUrl: 'http://localhost:8080/fastlege/oidc/callback',
                tenant: 'navq.onmicrosoft.com'
            };
            break;
        case ('q1', 'preprod'):
            config = {
                allowHttpForRedirectUrl: false,
                cookieDomain: host,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\app-q1.adeo.no`,
                redirectUrl: `https://app-q1.adeo.no/fastlege/oidc/callback`,
                tenant: 'navq.onmicrosoft.com'
            };
            break;
        case 'production':
            config = {
                allowHttpForRedirectUrl: false,
                cookieDomain: host,
                logoutUri: `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\app.adeo.no`,
                redirectUrl: `https://app.adeo.no/fastlege/oidc/callback`,
                tenant: 'navno.onmicrosoft.com'
            };
            break;
    }

    const key1 = process.env.PASSPORTCOOKIE_KEY1
        ? process.env.PASSPORTCOOKIE_KEY1
        : '';
    const key2 = process.env.PASSPORTCOOKIE_KEY2
        ? process.env.PASSPORTCOOKIE_KEY2
        : '';
    const key3 = process.env.PASSPORTCOOKIE_KEY3
        ? process.env.PASSPORTCOOKIE_KEY3
        : '';
    const key4 = process.env.PASSPORTCOOKIE_KEY4
        ? process.env.PASSPORTCOOKIE_KEY4
        : '';

    return {
        ...config,
        clientID: process.env.CLIENT_ID ? process.env.CLIENT_ID : '',
        clientSecret: process.env.CLIENT_SECRET
            ? process.env.CLIENT_SECRET
            : '',
        cookieEncryptionKeys: [
            { key: key1, iv: key3 },
            { key: key2, iv: key4 }
        ],
        identityMetadata: `https://login.microsoftonline.com/${config.tenant}/.well-known/openid-configuration`,
        loggingLevel: 'info',
        passReqToCallback: true,
        responseMode: 'form_post',
        responseType: 'code',
        scope: 'profile offline_access',
        tokenURI: `https://login.microsoftonline.com/${config.tenant}/oauth2/token`,
        useCookieInsteadOfSession: false,
        validateIssuer: true
    };
};

exports.passportConfig = hentPassportConfig();
