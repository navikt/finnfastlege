const { passportConfig } = require('./passportConfig');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const LOG = require('../logger');
/**
 * @param passport {passport}
 */
module.exports = passport => {
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
            (req, iss, sub, profile, accessToken, refreshToken, done) => {
                if (!profile.oid) {
                    return done(new Error('No oid found'), null);
                }
                process.nextTick(() => {
                    let user = {};
                    user.oid = profile.oid;
                    user.upn = profile.upn;
                    user.displayName = profile.displayName;
                    user.firstName = profile.name.givenName;
                    user.lastName = profile.name.familyName;
                    user.groups = JSON.parse(profile._json.groups);
                    user.refreshToken = refreshToken;

                    req.session.oid = user.oid;
                    req.session.upn = user.upn;
                    req.session.displayName = user.displayName;
                    req.session.firstName = user.firstName;
                    req.session.lastName = user.lastName;
                    req.session.groups = user.groups;
                    req.session.refreshToken = refreshToken;
                    req.session.accessToken = accessToken;
                    
                    return done(null, user);
                });
            }
        )
    );
};
