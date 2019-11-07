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
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'q1':
            config = {
                allowHttpForRedirectUrl: false,
                cookieDomain: host,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\app-q1.adeo.no`,
                redirectUrl: `https://${serverConfig.host}/fastlege/oidc/callback`,
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'preprod':
            config = {
                allowHttpForRedirectUrl: false,
                cookieDomain: host,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\app-q1.adeo.no`,
                redirectUrl: `https://${serverConfig.host}/fastlege/oidc/callback`,
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'production':
            config = {
                allowHttpForRedirectUrl: false,
                cookieDomain: host,
                logoutUri: `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\app.adeo.no`,
                redirectUrl: `https://${serverConfig.host}/fastlege/oidc/callback`,
                tenant: 'navno.onmicrosoft.com',
            };
            break;
        default:
            break;
    }

    // const key1 = process.env.PASSPORTCOOKIE_KEY1
    //     ? process.env.PASSPORTCOOKIE_KEY1
    //     : 'dwadawdadawdadadwadawdadadwawdwa';
    // const key2 = process.env.PASSPORTCOOKIE_KEY2
    //     ? process.env.PASSPORTCOOKIE_KEY2
    //     : 'dwadawdadawdadadwadawdadadwawdwa';
    // const key3 = process.env.PASSPORTCOOKIE_KEY3
    //     ? process.env.PASSPORTCOOKIE_KEY3
    //     : 'dwadawdadawd';
    // const key4 = process.env.PASSPORTCOOKIE_KEY4
    //     ? process.env.PASSPORTCOOKIE_KEY4
    //     : 'dwadawdadawd';

    return {
        ...config,
        clientID: process.env.CLIENT_ID ? process.env.CLIENT_ID : '',
        clientSecret: process.env.CLIENT_SECRET
            ? process.env.CLIENT_SECRET
            : '',
        cookieEncryptionKeys: [
            { key: '12345678901234567890123456789012', iv: '123456789012' },
        ],
        identityMetadata: `https://login.microsoftonline.com/${config.tenant}/.well-known/openid-configuration`,
        loggingLevel: 'debug',
        passReqToCallback: true,
        responseMode: 'form_post',
        responseType: 'code id_token',
        scope: 'profile offline_access openid'.split(' '),
        tokenURI: `https://login.microsoftonline.com/${config.tenant}/oauth2/token`,
        useCookieInsteadOfSession: false,
        validateIssuer: true,
    };
};

exports.passportConfig = hentPassportConfig();
