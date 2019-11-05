const passport = require('passport');
const { passportConfig } = require('../config/passportConfig');
const LOG = require('../logger');
const multiparty = require('multiparty');

const allowedRedirectRoutes = ['/fastlege/oidc/callback', '/fastlege', '404'];

exports.authenticateAzure = () => {
    return (req, res, next) => {
        const regex = /redirectUrl=(.*)/.exec(req.url);
        const validRedirectRoute =
            allowedRedirectRoutes.find(redirectRoute =>
                regex[1].includes(redirectRoute)
            ) !== undefined;

        const successRedirect = regex && validRedirectRoute ? regex[1] : '/';
        if (!validRedirectRoute) {
            LOG.error(`Ugyldig redirect path [${regex[1]}], fallback '/'`);
        }

        try {
            passport.authenticate('azuread-openidconnect', {
                response: res,
                session: false
            })(req, res, next);
        } catch (err) {
            throw `Error during authentication: ${err}`;
        }
    };
};

exports.authenticateAzureCallback = () => {
    return (req, res, next) => {
        try {
            passport.authenticate('azuread-openidconnect', {
                response: res,
            })(req, res, next);
        } catch (e) {
            throw `Error during authentication: ${e}`;
        }
    };
};

exports.ensureAuthenticated = sendUnauthorized => {
    return async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        const pathname = req.originalUrl;
        if (sendUnauthorized) {
            res.status(401).send('Unauthorized');
        } else {
            res.redirect(`/fastlege/login?redirectUrl=/fastlege`);
        }
    };
};

exports.logout = (req, res) => {
    return async (req, res) => {
        try {
            // await loggUtlogging(req);
            // req.session.destroy();
            res.redirect(passportConfig.logoutUri);
        } catch (err) {
            res.status(500).send(err);
            LOG.error(`error during logout: ${err}`);
        }
    };
};
