import express = require("express");
import expressHttpProxy = require("express-http-proxy");
import url = require("url");

import AuthUtils = require("./auth/utils");
import Config = require("./config");

const proxyExternalHost = (host: any, accessToken: any, parseReqBody: any) =>
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
      if (host === Config.auth.modiacontextholder.host) {
        const reqUser = srcReq.user as any;
        if (!reqUser) {
          return options;
        }
        const selfAccessToken = reqUser.tokenSets.self.access_token;
        options.headers["Authorization"] = `Bearer ${selfAccessToken}`;
        options.headers["Cookie"] = `isso-accesstoken=${accessToken}`;
      } else {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
      }
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
  authClient: any,
  externalAppConfig: Config.ExternalAppConfig
) => {
  const user = req.user as any;
  if (!user) {
    console.log("Missing user in route, waiting for middleware authentication");
    res
      .status(401)
      .header(
        "WWW-Authenticate",
        `OAuth realm=${externalAppConfig.host}, charset="UTF-8"`
      )
      .send("Not authenticated");
    return;
  }

  AuthUtils.getOrRefreshOnBehalfOfToken(
    authClient,
    user.tokenSets,
    externalAppConfig.tokenSetId,
    externalAppConfig.clientId
  )
    .then((onBehalfOfToken) => {
      if (!onBehalfOfToken.access_token) {
        res.status(500).send("Failed to fetch access token on behalf of user.");
        console.log(
          "proxyReqOptDecorator: Got on-behalf-of token, but the access_token was undefined"
        );
        return;
      }
      return proxyExternalHost(
        externalAppConfig.host,
        onBehalfOfToken.access_token,
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

const setup = (authClient: any) => {
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
      proxyOnBehalfOf(req, res, next, authClient, Config.auth.fastlegerest);
    }
  );

  router.use(
    "/syfoperson/*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      proxyOnBehalfOf(req, res, next, authClient, Config.auth.syfoperson);
    }
  );

  router.use(
    "/syfo-tilgangskontroll/*",
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
        Config.auth.syfotilgangskontroll
      );
    }
  );

  router.use(
    "/internarbeidsflatedecorator",
    expressHttpProxy(Config.auth.internarbeidsflatedecoratorHost, {
      https: true,
      proxyReqPathResolver: (req) => {
        return `/internarbeidsflatedecorator${req.url}`;
      },
      proxyErrorHandler: (err, res, next) => {
        console.log(
          `Error in proxy for internarbeidsflatedecorator ${err.message}, ${err.code}`
        );
        if (err && err.code === "ECONNREFUSED") {
          console.log("proxyErrorHandler: Got ECONNREFUSED");
          return res
            .status(503)
            .send({ message: `Could not contact internarbeidsflatedecorator` });
        }
        next(err);
      },
    })
  );

  return router;
};

module.exports = setup;