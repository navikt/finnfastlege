import dotenv from "dotenv";
dotenv.config();

interface EnvVarType {
  name: any;
  defaultValue?: any;
}

const envVar = ({ name, defaultValue }: EnvVarType) => {
  const fromEnv = process.env[name];
  if (fromEnv) {
    return fromEnv;
  }
  if (typeof defaultValue === "string") {
    return defaultValue;
  } else if (typeof defaultValue === "object") {
    if (isDev && typeof defaultValue.dev === "string") {
      return defaultValue.dev;
    }
    if (isProd && typeof defaultValue.prod === "string") {
      return defaultValue.prod;
    }
  }
  throw new Error(`Missing required environment variable ${name}`);
};

export const isDev = envVar({ name: "NODE_ENV" }) === "development";
export const isProd = envVar({ name: "NODE_ENV" }) === "production";

export interface ExternalAppConfig {
  clientId: string;
  host: string;
  removePathPrefix?: boolean;
}

// Config used internally in the server
export const server = {
  host: envVar({ name: "HOST", defaultValue: "localhost" }),
  port: Number.parseInt(envVar({ name: "PORT", defaultValue: "8080" })),

  logLevel: envVar({ name: "LOG_LEVEL", defaultValue: "info" }),
};

// For auth
export const auth = {
  texas: {
    introspectionEndpoint: envVar({
      name: "NAIS_TOKEN_INTROSPECTION_ENDPOINT",
      defaultValue: { dev: "" },
    }),
    tokenExchangeEndpoint: envVar({
      name: "NAIS_TOKEN_EXCHANGE_ENDPOINT",
      defaultValue: { dev: "" },
    }),
  },

  modiacontextholder: {
    applicationName: "modiacontextholder",
    clientId: envVar({
      name: "MODIACONTEXTHOLDER_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "MODIACONTEXTHOLDER_HOST",
    }),
    removePathPrefix: true,
  },

  fastlegerest: {
    applicationName: "fastlegerest",
    clientId: envVar({
      name: "FASTLEGEREST_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "FASTLEGEREST_HOST",
    }),
  },
  syfoperson: {
    applicationName: "syfoperson",
    clientId: envVar({
      name: "SYFOPERSON_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "SYFOPERSON_HOST",
    }),
  },
  istilgangskontroll: {
    applicationName: "istilgangskontroll",
    clientId: envVar({
      name: "ISTILGANGSKONTROLL_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "ISTILGANGKONTROLL_HOST",
    }),
    removePathPrefix: true,
  },
};
