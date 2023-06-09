import OpenIdClient from "openid-client";
import { Request, Response, NextFunction } from "express";

import * as Config from "./config";

type OboToken = {
  access_token: string;
  expires_in: number;
};

type CachedOboToken = {
  token: OboToken;
  expires: number;
};

type Scope = string;

declare module "express-session" {
  export interface SessionData {
    tokenCache: { [clientId: Scope]: CachedOboToken };
  }
}

const OBO_TOKEN_EXPIRATION_MARGIN_SECONDS = 60;

const expired = (token: CachedOboToken) => {
  return (
    token.expires < Date.now() - OBO_TOKEN_EXPIRATION_MARGIN_SECONDS * 1000
  );
};

export const ensureAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers["authorization"]) {
      return next();
    }
    res.status(401).send("Unauthorized");
  };
};

const retrieveToken = (req: Request) => {
  return req.headers.authorization?.replace("Bearer ", "") as string;
};

export const getOrRefreshOnBehalfOfToken = async (
  authClient: OpenIdClient.Client,
  req: Request,
  clientId: string
) => {
  if (req.session.tokenCache === undefined) {
    req.session.tokenCache = {};
  }

  var cachedOboToken = req.session.tokenCache[clientId];
  if (!cachedOboToken || expired(cachedOboToken)) {
    const token = retrieveToken(req);
    const onBehalfOfToken = await requestOnBehalfOfToken(
      authClient,
      token,
      clientId
    );
    cachedOboToken = {
      token: onBehalfOfToken,
      expires: Date.now() + onBehalfOfToken.expires_in * 1000,
    };
    req.session.tokenCache[clientId] = cachedOboToken;
  }
  return cachedOboToken.token;
};

const requestOnBehalfOfToken = async (
  authClient: OpenIdClient.Client,
  access_token: string,
  clientId: string
) => {
  if (!access_token) {
    throw Error(
      "Could not get on-behalf-of token because the access_token was undefined"
    );
  }
  const grantBody = {
    assertion: access_token,
    client_assertion_type:
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    requested_token_use: "on_behalf_of",
    scope: `api://${clientId}/.default`,
  };
  const tokenSet = await authClient.grant(grantBody);
  return {
    access_token: tokenSet.access_token,
    expires_in: tokenSet.expires_in,
  } as OboToken;
};

export const getOpenIdClient = async (
  issuerUrl: string
): Promise<OpenIdClient.Client> => {
  try {
    const issuer = await OpenIdClient.Issuer.discover(issuerUrl);

    return new issuer.Client(
      {
        client_id: Config.auth.clientId,
        redirect_uris: [Config.auth.redirectUri],
        token_endpoint_auth_method: "private_key_jwt",
        token_endpoint_auth_signing_alg: "RS256",
      },
      Config.auth.jwks
    );
  } catch (e) {
    console.log("Could not discover issuer", issuerUrl);
    throw e;
  }
};
