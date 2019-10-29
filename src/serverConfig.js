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
    logLevel: process.env.LOG_LEVEL || decideLogLevel()
};
