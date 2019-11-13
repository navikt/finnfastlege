const serverConfig = require('../serverConfig');

const hentPassportConfig = () => {
    let config = {};

    switch (serverConfig.env) {
        case 'local':
            config = {
                cookieDomain: serverConfig.cookieHost,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=http:\\\\localhost:8000`,
                redirectUrl: 'http://localhost:8080/fastlege/oidc/callback',
                tenant: '966ac572-f5b7-4bbe-aa88-c76419c0f851',
            };
            break;
        case 'q1':
            config = {
                cookieDomain: serverConfig.cookieHost,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\${serverConfig.host}`,
                redirectUrl: `https://${serverConfig.host}/fastlege/oidc/callback`,
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'preprod':
            config = {
                cookieDomain: serverConfig.cookieHost,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\${serverConfig.host}`,
                redirectUrl: `https://${serverConfig.host}/fastlege/oidc/callback`,
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'production':
            config = {
                cookieDomain: serverConfig.cookieHost,
                logoutUri: `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\${serverConfig.host}`,
                redirectUrl: `https://${serverConfig.host}/fastlege/oidc/callback`,
                tenant: 'navno.onmicrosoft.com',
            };
            break;
        default:
            break;
    }

    return {
        ...config,
        clientID: process.env.CLIENT_ID ? process.env.CLIENT_ID : '',
        clientSecret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '',
        identityMetadata: `https://login.microsoftonline.com/${config.tenant}/.well-known/openid-configuration`,
        passReqToCallback: true,
        responseMode: 'form_post',
        responseType: 'id_token',
        tokenEndpointAuthMethod: 'client_secret_post',
        scope: 'openid offline_access profile',
        tokenURI: `https://login.microsoftonline.com/${config.tenant}/oauth2/token`,
        pkceMethod: 'S256',
    };
};

exports.passportConfig = hentPassportConfig();
