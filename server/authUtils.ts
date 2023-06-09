import OpenIdClient from "openid-client";
import { Request, Response, NextFunction } from "express";

import * as Config from "./config";

type OboToken = {
  accessToken: string;
  expiresIn: number;
};

type CachedOboToken = {
  token: OboToken;
  expires: number;
};

declare module "express-session" {
  export interface SessionData {
    tokenCache: { [clientId: string]: CachedOboToken };
  }
}

const OBO_TOKEN_EXPIRATION_MARGIN_SECONDS = 60;

const isExpired = (token: CachedOboToken) => {
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

const retrieveToken = (req: Request): string | undefined => {
  return req.headers.authorization?.replace("Bearer ", "");
};

export const getOrRefreshOnBehalfOfToken = async (
  authClient: OpenIdClient.Client,
  req: Request,
  clientId: string
): Promise<OboToken | undefined> => {
  if (req.session.tokenCache === undefined) {
    req.session.tokenCache = {};
  }

  let cachedOboToken = req.session.tokenCache[clientId];
  if (!cachedOboToken || isExpired(cachedOboToken)) {
    const token = retrieveToken(req);
    const onBehalfOfToken = await requestOnBehalfOfToken(
      authClient,
      token,
      clientId
    );
    if (!onBehalfOfToken) {
      return undefined;
    }
    cachedOboToken = {
      token: onBehalfOfToken,
      expires: Date.now() + onBehalfOfToken.expiresIn * 1000,
    };
    req.session.tokenCache[clientId] = cachedOboToken;
  }
  return cachedOboToken.token;
};

const requestOnBehalfOfToken = async (
  authClient: OpenIdClient.Client,
  accessToken: string | undefined,
  clientId: string
): Promise<OboToken | undefined> => {
  if (!accessToken) {
    throw Error(
      "Could not get on-behalf-of token because the access_token was undefined"
    );
  }
  const grantBody = {
    assertion: accessToken,
    client_assertion_type:
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    requested_token_use: "on_behalf_of",
    scope: `api://${clientId}/.default`,
  };
  const tokenSet = await authClient.grant(grantBody);
  if (!tokenSet) {
    return undefined;
  } else {
    return {
      accessToken: tokenSet.access_token,
      expiresIn: tokenSet.expires_in,
    } as OboToken;
  }
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
