const session = require('express-session');
const express = require('express');
const passport = require('passport');

/**
 * @param app {express.application}
 * @param passport {passport}
 */
exports.configureSession = (app, passport) => {
    const configuredSession = session({
        secret: 'secret cat'
    });
    return configuredSession;
};
