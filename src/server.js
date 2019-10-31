const dotenv = require('dotenv');
const serverConfig = require('./serverConfig');
if (serverConfig.isDev) {
    console.log('Configuring dotgenv');
    dotenv.config();
} else {
    dotenv.config({ path: '/var/run/secrets/nais.io/vault/.env' });
}
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const passport = require('passport');
const bodyParser = require('body-parser');
const { configureSession } = require('./auth/session');
const mockRouter = require('./mock');
const LOG = require('./logger');
const authMiddleware = require('./auth/authMiddleware');
const configurePassport = require('./config/passport');
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(configureSession());
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

const setupOidcRoutes = () => {
    app.use(
        '/fastlege/oidc/callback',
        authMiddleware.authenticateAzureCallback()
    );
    app.use('/fastlege/login', authMiddleware.authenticateAzure());
};

const setupRoutes = () => {
    app.get('/health/isReady', (req, res) => res.status(200).send('Im ready!'));
    app.get('/health/isAlive', (req, res) => res.status(200).send('Im alive!'));

    app.use('/fastlege', authMiddleware.ensureAuthenticated(false));
    if (serverConfig.isDev) {
        app.use(mockRouter);
    }

    app.use('/fastlege', express.static(path.join(__dirname, '..', 'build')));
    app.get('*', (req, res, next) => {
        res.cookie('isso-idtoken', req.session.accessToken, {
            httpOnly: true,
            secure: true
        });
        res.sendFile(path.join(__dirname, '..', 'build', 'fastlegefront.html'));
    });
};

const startServer = () => {
    app.listen(serverConfig.port, () => {
        LOG.info(`App listening on port ${serverConfig.port}`);
    });
};

setupOidcRoutes();
setupRoutes();
startServer();
