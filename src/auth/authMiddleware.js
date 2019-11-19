const passport = require('passport');
const cookieParser = require('cookie-parser');
// const { passportConfig } = require('../config/passportConfig');
const LOG = require('../logger');

const allowedRedirectRoutes = ['/fastlege/oidc/callback', '/fastlege', '404'];

exports.authenticateAzure = () => {
    return (req, res, next) => {
        const regex = /redirectUrl=(.*)/.exec(req.url);
        const validRedirectRoute =
            allowedRedirectRoutes.find((redirectRoute) => {
                return regex[1].includes(redirectRoute);
            }) !== undefined;

        // const successRedirect = regex && validRedirectRoute ? regex[1] : '/';
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

exports.ensureAuthenticated = (sendUnauthorized) => {
    return (req, res, next) => {
        const idToken = cookieParser.signedCookie("isso-idtoken");
        if (idToken) {
            return next();
        }
        res.cookie("isso-idtoken", { maxAge: Date.now() });
        // if (req.isAuthenticated()) {
        //     return next();
        // }
        // const pathname = req.originalUrl;
        if (sendUnauthorized) {
            res.status(401).send('Unauthorized');
        } else {
            res.redirect(`/fastlege/login?redirectUrl=/fastlege`);
        }
    };
};
