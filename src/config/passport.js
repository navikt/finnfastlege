const { Issuer, Strategy } = require('openid-client');
const { passportConfig } = require('./passportConfig');
const proxy = require('../utils/corporate-proxy');

const metadata = {
    client_id: passportConfig.clientID,
    client_secret: passportConfig.clientSecret,
    token_endpoint_auth_method: passportConfig.tokenEndpointAuthMethod,
    redirect_uris: [passportConfig.redirectUrl],
};

const client = async () => {
    // see https://github.com/panva/node-openid-client/blob/master/docs/README.md#customizing-individual-http-requests
    proxy.setup(Issuer);
    const issuer = await Issuer.discover(passportConfig.identityMetadata);
    proxy.setup(issuer);
    // console.log(`Discovered issuer ${issuer.issuer}`);

    const openIdClient = new issuer.Client(metadata);
    proxy.setup(openIdClient);

    return openIdClient;
};

const strategy = async () => {
    const verify = (req, tokenSet, userinfo, done) => {
        if (!userinfo.oid) {
            return done(new Error('No oid found'), null);
        }
        const groups = JSON.parse(userinfo.groups[0]);
        const user = {
            oid: userinfo.oid,
            upn: userinfo.upn,
            displayName: userinfo.name,
            firstName: userinfo.given_name,
            lastName: userinfo.family_name,
            groups: groups,
            refreshToken: tokenSet.refresh_token,
        };
        req.session.oid = user.oid;
        req.session.upn = user.upn;
        req.session.displayName = user.displayName;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.groups = groups;
        req.session.refreshToken = tokenSet.refresh_token;

        return done(null, user);
    };
    const options = {
        client: await client(),
        params: {
            response_types: [passportConfig.responseType],
            response_mode: passportConfig.responseMode,
            scope: passportConfig.scope,
        },
        passReqToCallback: passportConfig.passReqToCallback,
        usePKCE: passportConfig.pkceMethod,
    };
    return new Strategy(options, verify);
};

module.exports = async (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.oid);
    });

    passport.deserializeUser((oid, done) => {
        done(null, oid);
    });

    passport.use('azuread-openidconnect', await strategy());
};
