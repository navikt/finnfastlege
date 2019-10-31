const isProduction = () => process.env.NODE_ENV === 'production';
const isDev = () => process.env.NODE_ENV === 'development';
const decideLogLevel = () => {
    if (isDev()) {
        return 'debug';
    } else {
        return 'info';
    }
};

module.exports = {
    isDev: isDev(),
    isProd: isProduction(),
    port: process.env.PORT || 8080,
    env: process.env.ENV || 'local',
    logLevel: process.env.LOG_LEVEL || decideLogLevel()
};