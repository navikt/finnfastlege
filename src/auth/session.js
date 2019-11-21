const session = require('express-session');
const serverConfig = require('../serverConfig');

exports.configureSession = () => {
    const configuredSession = session({
        secret: serverConfig.sessionSecret,
        name: 'fastlege',
        saveUninitialized: true,
        resave: false,
    });
    return configuredSession;
};
