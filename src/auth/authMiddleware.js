const passport = require('passport');
const { passportConfig } = require('../config/passportConfig');
const LOG = require('../logger');
// const { loggUtlogging } = require('./bruker');

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

        if (!req.session) {
            req.session = {};
        }

        req.session.redirectUrl = successRedirect;
        try {
            passport.authenticate('azuread-openidconnect')(req, res, next);
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
                successRedirect: req.session.redirectUrl || '/',
                failureRedirect: '/fastlege/error'
            })(req, res, next);
        } catch (err) {
            throw `Error during authentication: ${err}`;
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
            res.redirect(
                `/fastlege/login?redirectUrl=${req.hostname}/${pathname}`
            );
        }
    };
};

exports.logout = (req, res) => {
    return async (req, res) => {
        try {
            // await loggUtlogging(req);
            req.session.destroy();
            res.redirect(passportConfig.logoutUri);
        } catch (err) {
            res.status(500).send(err);
            LOG.error(`error during logout: ${err}`);
        }
    };
};
