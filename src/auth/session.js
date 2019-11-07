const session = require('express-session');

exports.configureSession = () => {
    const configuredSession = session({
        secret: 'session_secret',
    });
    return configuredSession;
};
