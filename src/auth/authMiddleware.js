const passport = require('passport');
const LOG = require('../logger');

const allowedRedirectRoutes = ['/fastlege/oidc/callback', '/fastlege', '404'];

exports.authenticateAzure = () => {
    return (req, res, next) => {
        const regex = /redirectUrl=(.*)/.exec(req.url);
        const validRedirectRoute =
            allowedRedirectRoutes.find((redirectRoute) => {
                return regex[1].includes(redirectRoute);
            }) !== undefined;

        if (!validRedirectRoute) {
            LOG.error(`Ugyldig redirect path [${regex[1]}], fallback '/'`);
        }

        try {
            passport.authenticate('azuread-openidconnect', {
                response: res,
                session: false,
            })(req, res, next);
        } catch (err) {
            throw new Error(`Error during authentication: ${err}`);
        }
    };
};

exports.authenticateAzureCallback = () => {
    return (req, res, next) => {
        try {
            passport.authenticate('azuread-openidconnect', {
                response: res,
                session: false,
            })(req, res, next);
        } catch (e) {
            throw new Error(`Error during authentication: ${e}`);
        }
    };
};

exports.ensureAuthenticated = () => {
    return (req, res, next) => {
        next();
    };
};
