import HttpsProxyAgent from "https-proxy-agent";
import express from "express";
import { TokenSet } from "openid-client";

import { tokenSetSelfId } from "./config";
import { requestOnBehalfOfToken, tokenIsValid } from "./azureAd";

const OBO_TOKEN_EXPIRATION_MARGIN_SECONDS = 30;

const expired = (oboToken: any) => {
  return oboToken.expires_in <= OBO_TOKEN_EXPIRATION_MARGIN_SECONDS;
};

const getTokenSetById = (tokenSets: any, id: any) => {
  if (!(id in tokenSets)) {
    return null;
  }
  if (tokenSets[id] instanceof TokenSet) {
    return tokenSets[id];
  }
  return new TokenSet(tokenSets[id]);
};

export const getOrRefreshOnBehalfOfToken = async (
  tokenSets: any,
  clientId: string
) => {
  const selfToken = getTokenSetById(tokenSets, tokenSetSelfId);
  if (!selfToken) {
    throw Error(
      "getOrRefreshOnBehalfOfToken: Missing self-token in tokenSets. This should have been set by the middleware."
    );
  }
  const onBehalfOfToken = getTokenSetById(tokenSets, clientId);
  if (!onBehalfOfToken || expired(onBehalfOfToken)) {
    const newOnBehalfOftoken = await requestOnBehalfOfToken(
      selfToken,
      clientId
    );
    tokenSets[clientId] = newOnBehalfOftoken;
  }
  return tokenSets[clientId];
};

export const ensureAuthenticated = () => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send("Unauthorized");
  };
};

export const userIsLoggedIn = async (req: express.Request) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  return token && (await tokenIsValid(token));
};
