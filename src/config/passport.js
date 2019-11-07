/* eslint-disable no-underscore-dangle */
const { OIDCStrategy } = require('passport-azure-ad');
const { passportConfig } = require('./passportConfig');

/**
 * @param passport {passport}
 */
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.oid);
    });

    passport.deserializeUser((oid, done) => {
        done(null, oid);
    });

    // AZURE AD LOGIN STRATEGY
    passport.use(
        'azuread-openidconnect',
        new OIDCStrategy(
            passportConfig,
            (
                req,
                iss,
                sub,
                profile,
                jwtClaims,
                accessToken,
                refreshToken,
                params,
                done,
            ) => {
                if (!profile.oid) {
                    return done(new Error('No oid found'), null);
                }
                process.nextTick(() => {
                    const user = {
                        oid: profile.oid,
                        upn: profile.upn,
                        displayName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        groups: JSON.parse(profile._json.groups),
                        refreshToken: refreshToken,
                        idToken: params.idToken,
                    };
                    req.session.upn = user.upn;
                    req.session.displayName = user.displayName;
                    req.session.firstName = user.firstName;
                    req.session.lastName = user.lastName;
                    req.session.groups = user.groups;
                    req.session.refreshToken = refreshToken;
                    req.session.accessToken = accessToken;
                    req.session.idToken = params.id_token;

                    return done(null, user);
                });
            },
        ),
    );
};
