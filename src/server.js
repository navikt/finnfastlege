const express = require('express');
// const passport = require('passport');
// const passportAzureAd = require('passport-azure-ad');
const path = require('path');

const LOG = require('./logger');
const app = express();

const setupRoutes = () => {
    app.use('/fastlege', express.static(path.join(__dirname, '..', 'build')));

    app.get('/fastlege', (req, res, next) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'fastlegefront.html'));
    });
    return Promise.resolve();
};

const port = process.env.PORT || 8080;

const startServer = () => {
    app.listen(port, () => {
        LOG.info(`App listening on port ${port}`);
    });
};

setupRoutes();
startServer();
