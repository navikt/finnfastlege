/* eslint-disable import/newline-after-import */
/* eslint-disable import/order */
const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
    dotenv.config();
} else {
    dotenv.config({
        path: '/var/run/secrets/nais.io/vault/.env',
        encoding: 'UTF-8',
    });
}
const LOG = require('./logger');
const serverConfig = require('./serverConfig');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { configureSession } = require('./auth/session');
const authMiddleware = require('./auth/authMiddleware');
const configurePassport = require('./config/passport');
const mockRouter = require('./mock');
const proxyRouter = require('./proxy');
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(configureSession());
app.set('trust proxy', 1);

const setupOidcRoutes = () => {
    app.use(
        '/fastlege/oidc/callback',
        authMiddleware.authenticateAzureCallback(),
        (req, res) => {
            res.redirect('/fastlege');
        },
    );

    app.use('/fastlege/login', authMiddleware.authenticateAzure());
    app.get('/fastlege/error', (req, res) => {
        res.send('Noe gikk galt under innlogging');
    });
};

const setupRoutes = () => {
    app.get('/health/isReady', (req, res) => {
        res.status(200).send('Im ready!');
    });
    app.get('/health/isAlive', (req, res) => {
        res.status(200).send('Im alive!');
    });

    app.use('/fastlege', express.static(path.join(__dirname, '..', 'build')));

    if (serverConfig.isDev) {
        app.use(mockRouter);
    } else {
        app.use(proxyRouter);
    }

    app.get(
        '/fastlege/*',
        authMiddleware.ensureAuthenticated(false),
        (req, res) => {
            res.cookie('isso-idtoken', req.user.idToken, {
                httpOnly: true,
                secure: true,
                domain: serverConfig.cookieHost,
                maxAge: new Date(req.user.idTokenExpiresIn + 7200),
            });
            res.sendFile(
                path.join(__dirname, '..', 'build', 'fastlegefront.html'),
                {},
            );
        },
    );
};

const startServer = () => {
    app.listen(serverConfig.port, () => {
        LOG.info(
            `App listening on port ${serverConfig.port} with configuration}`,
            serverConfig,
        );
    });
};

configurePassport(passport);
app.use(passport.initialize());
// app.use(passport.session());

// setupProxyRoutes();
setupOidcRoutes();
setupRoutes();
startServer();
