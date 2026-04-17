import express from "express";
import expressHttpProxy from "express-http-proxy";
import url from "url";

import { getOnBehalfOfToken } from "./authUtils.js";
import * as Config from "./config.js";

const proxyExternalHost = (
  { applicationName, host, removePathPrefix }: any,
  accessToken: any,
  parseReqBody: any
) =>
  expressHttpProxy(host, {
    https: false,
    parseReqBody: parseReqBody,
    proxyReqOptDecorator: async (options) => {
      if (!accessToken) {
        return options;
      }
      if (!options.headers) {
        options.headers = {};
      }
      (options.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${accessToken}`;
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
        return newPath.replace(`${applicationName}/`, "");
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
  externalAppConfig: Config.ExternalAppConfig
) => {
  getOnBehalfOfToken(req, externalAppConfig.clientId)
    .then((accessToken) => {
      if (!accessToken) {
        res.status(500).send("Failed to fetch access token on behalf of user.");
        console.log("proxyOnBehalfOf: on-behalf-of-token was undefined");
        return;
      }
      return proxyExternalHost(
        externalAppConfig,
        accessToken,
        req.method === "POST"
      )(req, res, next);
    })
    .catch((error) => {
      console.log("Failed to get OBO token. Original error: %s", error);
      res
        .status(500)
        .send("Failed to fetch access tokens on behalf of user");
    });
};

export const setupProxy = (): express.Router => {
  const router = express.Router();

  router.use(
    "/modiacontextholder/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(req, res, next, Config.auth.modiacontextholder);
    }
  );

  router.use(
    "/fastlegerest/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(req, res, next, Config.auth.fastlegerest);
    }
  );

  router.use(
    "/syfoperson/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(req, res, next, Config.auth.syfoperson);
    }
  );

  router.use(
    "/istilgangskontroll/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(req, res, next, Config.auth.istilgangskontroll);
    }
  );
  return router;
};
