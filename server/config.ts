import path from "path";

import dotenv from "dotenv";
dotenv.config();

const hasEnvVar = (name: any) => {
  return process.env[name] !== undefined;
};

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

export const tokenSetSelfId = "self";

export interface ExternalAppConfig {
  clientId: string;
  host: string;
  removePathPrefix?: boolean;
}

export const server = {
  host: envVar({ name: "HOST", defaultValue: "localhost" }),
  port: Number.parseInt(envVar({ name: "PORT", defaultValue: "8080" })),
  finnfastlegeUrl: envVar({
    name: "FINNFASTLEGE_URL",
    defaultValue: "http://localhost:8080",
  }),

  frontendDir: envVar({
    name: "FRONTEND_DIR",
    defaultValue: path.join(__dirname, "frontend"),
  }),

  sessionKey: envVar({ name: "SESSION_KEY" }),
  sessionCookieName: envVar({
    name: "SESSION_COOKIE_NAME",
    defaultValue: "isso-idtoken-v2",
  }),

  mockOauthServerPort: Number.parseInt(
    envVar({ name: "LOCAL_AUTH_SERVER_PORT", defaultValue: "4321" })
  ),
  logLevel: envVar({ name: "LOG_LEVEL", defaultValue: "info" }),
};

// For auth
export const auth = {
  discoverUrl: envVar({
    name: "AZURE_APP_WELL_KNOWN_URL",
    defaultValue: {
      dev: `http://localhost:${server.mockOauthServerPort}/default`,
    },
  }),
  clientId: envVar({
    name: "AZURE_APP_CLIENT_ID",
    defaultValue: { dev: "finnfastlege" },
  }),
  jwksURI: envVar({
    name: "AZURE_OPENID_CONFIG_JWKS_URI",
    defaultValue: { dev: "" },
  }),

  issuer: enVar({ name: "AZURE_OPENID_CONFIG_ISSUER" }),
  redirectUri: envVar({ name: "AUTH_REDIRECT_URI" }),

  tokenEndpointAuthMethod: "private_key_jwt",
  responseType: "code",
  responseMode: "query",
  tokenEndpointAuthSigningAlg: "RS256",

  internarbeidsflatedecoratorHost: envVar({
    name: "INTERNARBEIDSFLATEDECORATOR_HOST",
  }),

  modiacontextholder: {
    clientId: envVar({
      name: "MODIACONTEXTHOLDER_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "MODIACONTEXTHOLDER_HOST",
    }),
  },

  fastlegerest: {
    clientId: envVar({
      name: "FASTLEGEREST_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "FASTLEGEREST_HOST",
    }),
  },
  syfoperson: {
    clientId: envVar({
      name: "SYFOPERSON_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "SYFOPERSON_HOST",
    }),
  },
  syfotilgangskontroll: {
    clientId: envVar({
      name: "SYFOTILGANGSKONTROLL_AAD_APP_CLIENT_ID",
    }),
    host: envVar({
      name: "SYFOTILGANGKONTROLL_HOST",
    }),
  },
};

export const redis = {
  host: envVar({ name: "REDIS_HOST", defaultValue: "" }),
  port: Number.parseInt(envVar({ name: "REDIS_PORT", defaultValue: "6379" })),
  password: envVar({
    name: "REDIS_PASSWORD",
    defaultValue: { dev: "", prod: "" },
  }),
};
