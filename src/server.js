const LOG = require('./logger');
const dotenv = require('dotenv');
const serverConfig = require('./serverConfig');
if (serverConfig.isDev) {
    dotenv.config();
} else {
    const { parsed } = dotenv.config({
        path: '/var/run/secrets/nais.io/vault/.env',
        encoding: 'UTF-8'
    });
    Object.keys(parsed).forEach(e => {
        LOG.info('Parsed env: ' + e);
    });
}
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const passport = require('passport');
const bodyParser = require('body-parser');
const authMiddleware = require('./auth/authMiddleware');
const configurePassport = require('./config/passport');
const cookieParser = require('cookie-parser');
const { configureSession } = require('./auth/session');
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
            res.cookie('isso-idtoken', req.session.idToken, {
                httpOnly: true
            });
            res.redirect('/fastlege');
        }
    );
    app.use('/fastlege/login', authMiddleware.authenticateAzure());
    app.get('/fastlege/error', (req, res) =>
        res.send('Noe gikk galt under innlogging')
    );
};

const setupRoutes = () => {
    app.get('/health/isReady', (req, res) => res.status(200).send('Im ready!'));
    app.get('/health/isAlive', (req, res) => res.status(200).send('Im alive!'));

    if (serverConfig.isDev) {
        app.use(require('./mock'));
    }

    app.use('/fastlege', express.static(path.join(__dirname, '..', 'build')));

    app.get(
        '/fastlege/*',
        authMiddleware.ensureAuthenticated(false),
        (req, res, next) => {
            res.sendFile(
                path.join(__dirname, '..', 'build', 'fastlegefront.html'),
                {}
            );
        }
    );
};

const startServer = () => {
    app.listen(serverConfig.port, () => {
        LOG.info(
            `App listening on port ${serverConfig.port} with configuration}`,
            serverConfig
        );
    });
};

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

setupOidcRoutes();
setupRoutes();
startServer();
