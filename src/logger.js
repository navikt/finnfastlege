const winston = require('winston');
const config = require('./serverConfig');

const logger = winston.createLogger({
    level: config.logLevel,
    transports: [new winston.transports.Console()],
    format: winston.format.json()
});

module.exports = logger;
