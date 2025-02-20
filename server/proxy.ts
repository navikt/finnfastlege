import express from "express";
import expressHttpProxy from "express-http-proxy";
import url from "url";
import OpenIdClient from "openid-client";

import { getOrRefreshOnBehalfOfToken } from "./authUtils";
import * as Config from "./config";

const proxyExternalHost = (
  { applicationName, host, removePathPrefix }: any,
  accessToken: any,
  parseReqBody: any
) =>
  expressHttpProxy(host, {
    https: false,
    parseReqBody: parseReqBody,
    proxyReqOptDecorator: async (options, srcReq: express.Request) => {
      if (!accessToken) {
        return options;
      }
      if (!options.headers) {
        options.headers = {};
      }
      options.headers["Authorization"] = `Bearer ${accessToken}`;
      return options;
    },
    proxyReqPathResolver: (req) => {
      const urlFromApi = url.parse(host);
      const pathFromApi =
        urlFromApi.pathname === "/" ? "" : urlFromApi.pathname;

      const urlFromRequest = url.parse(req.originalUrl);
      const pathFromRequest = urlFromRequest.pathname;

      const queryString = urlFromRequest.query;
      const newPath =
        (pathFromApi ? pathFromApi : "") +
        (pathFromRequest ? pathFromRequest : "") +
        (queryString ? "?" + queryString : "");

      if (removePathPrefix) {
        const newPathWithoutPrefix = newPath.replace(`${applicationName}/`, "");
        return newPathWithoutPrefix;
      }

      return newPath;
    },
    proxyErrorHandler: (err, res, next) => {
      console.log(`Error in proxy for ${host} ${err.message}, ${err.code}`);
      if (err && err.code === "ECONNREFUSED") {
        console.log("proxyErrorHandler: Got ECONNREFUSED");
        return res.status(503).send({ message: `Could not contact ${host}` });
      }
      next(err);
    },
  });

const proxyOnBehalfOf = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  authClient: OpenIdClient.Client,
  issuer: OpenIdClient.Issuer<any>,
  externalAppConfig: Config.ExternalAppConfig
) => {
  getOrRefreshOnBehalfOfToken(
    authClient,
    issuer,
    req,
    externalAppConfig.clientId
  )
    .then((onBehalfOfToken) => {
      if (!onBehalfOfToken || !onBehalfOfToken.accessToken) {
        res.status(500).send("Failed to fetch access token on behalf of user.");
        console.log(
          "proxyOnBehalfOf: on-behalf-of-token or access_token was undefined"
        );
        return;
      }
      return proxyExternalHost(
        externalAppConfig,
        onBehalfOfToken.accessToken,
        req.method === "POST"
      )(req, res, next);
    })
    .catch((error) => {
      console.log("Failed to renew token(s). Original error: %s", error);
      res
        .status(500)
        .send("Failed to fetch/refresh access tokens on behalf of user");
    });
};

export const setupProxy = (
  authClient: OpenIdClient.Client,
  issuer: OpenIdClient.Issuer<any>
) => {
  const router = express.Router();

  router.use(
    "/modiacontextholder/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(
        req,
        res,
        next,
        authClient,
        issuer,
        Config.auth.modiacontextholder
      );
    }
  );

  router.use(
    "/fastlegerest/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(
        req,
        res,
        next,
        authClient,
        issuer,
        Config.auth.fastlegerest
      );
    }
  );

  router.use(
    "/syfoperson/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(
        req,
        res,
        next,
        authClient,
        issuer,
        Config.auth.syfoperson
      );
    }
  );

  router.use(
    "/istilgangskontroll/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(
        req,
        res,
        next,
        authClient,
        issuer,
        Config.auth.istilgangskontroll
      );
    }
  );
  return router;
};
