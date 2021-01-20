const isProduction = () => process.env.NODE_ENV === "production";
const isDev = () => process.env.NODE_ENV === "development";

const decideLogLevel = () => {
  if (isDev()) {
    return "debug";
  }
  return "info";
};

const fullHost = process.env.HOST;
const appName = "finnfastlege";

const getCookieHostFromFullHostName = () => {
  return fullHost.replace(appName, "");
};

const config = {
  isDev: isDev(),
  isProd: isProduction(),
  port: process.env.PORT || 8080,
  env: process.env.ENV || "local",
  sessionSecret: process.env.SESSION_SECRET || "session_secret",
  appName: appName,
  host: process.env.HOST,
  cookieHost: getCookieHostFromFullHostName(),
  logLevel: process.env.LOG_LEVEL || decideLogLevel(),
  proxyUrl: process.env.HTTP_PROXY,
};

module.exports = config;
