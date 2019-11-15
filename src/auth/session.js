const session = require('express-session');

exports.configureSession = () => {
    const configuredSession = session({
        secret: 'session_secret',
        name: 'fastlege',
        saveUninitialized: true,
        resave: false,
    });
    return configuredSession;
};
