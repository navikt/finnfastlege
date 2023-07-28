import express from "express";
import ViteExpress from "vite-express";

import path from "path";
import prometheus from "prom-client";

import { getOpenIdClient, getOpenIdIssuer } from "./authUtils";
import { setupProxy } from "./proxy";
import { setupSession } from "./session";
import mockEndepunkter from "./mock/mockEndepunkter";
import * as Config from "./config";

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({});

const nocache = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};

const redirectIfUnauthorized = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.headers["authorization"] || Config.isDev) {
    next();
  } else {
    res.redirect(`/oauth2/login?redirect=${req.originalUrl}`);
  }
};

const setupServer = async () => {
  const server = express();
  server.use(express.json());

  setupSession(server);

  if (process.env.NODE_ENV === "development") {
    mockEndepunkter(server);
  } else if (process.env.NODE_ENV === "production") {
    const issuer = await getOpenIdIssuer();
    const authClient = await getOpenIdClient(issuer);

    server.use(setupProxy(authClient, issuer));
    const DIST_DIR = path.join(__dirname, "dist");
    const HTML_FILE = path.join(DIST_DIR, "index.html");

    server.get("/health/isReady", (req, res) => {
      res.status(200).send("Im ready!");
    });
    server.get("/health/isAlive", (req, res) => {
      res.status(200).send("Im alive!");
    });

    server.use(
      "/fastlege",
      express.static(path.join(__dirname, "..", "build"))
    );

    server.use("/fastlege/img", express.static(path.resolve(__dirname, "img")));

    server.get(
      ["/", "/fastlege", "/fastlege/*", /^\/fastlege\/(?!(resources|img)).*$/],
      [nocache, redirectIfUnauthorized],
      (req: express.Request, res: express.Response) => {
        res.sendFile(HTML_FILE);
      }
    );

    server.use("/static", express.static(DIST_DIR));
  }

  const port = 8080;

  ViteExpress.listen(server, port, () =>
    console.log(`Server is listening on port ${port}...`)
  );
};

setupServer();
