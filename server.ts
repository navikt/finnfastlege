import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import prometheus from "prom-client";
import ViteExpress from "vite-express";

import { getOpenIdClient, getOpenIdIssuer } from "./server/authUtils";
import { setupProxy } from "./server/proxy";
import { setupSession } from "./server/session";
import mockEndepunkter from "./mock/mockEndepunkter";
import * as Config from "./server/config";

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({});

const server = express();
server.use(express.json());

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
  const envMode = Config.isProd ? "production" : "development";

  console.log(envMode);
  ViteExpress.config({ mode: envMode });

  setupSession(server);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (envMode === "development") {
    mockEndepunkter(server);
    server.use("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, "src", "index.html"));
    });
  } else {
    const issuer = await getOpenIdIssuer();
    const authClient = await getOpenIdClient(issuer);

    server.use(setupProxy(authClient, issuer));
  }

  const DIST_DIR = path.join(__dirname, "dist");
  const HTML_FILE = path.join(DIST_DIR, "index.html");

  server.get("/health/isReady", (req, res) => {
    res.status(200).send("Im ready!");
  });
  server.get("/health/isAlive", (req, res) => {
    res.status(200).send("Im alive!");
  });

  server.use("/fastlege", express.static(path.join(__dirname, "..", "build")));

  server.use("/fastlege/img", express.static(path.resolve(__dirname, "img")));

  server.get(
    ["/", "/fastlege", "/fastlege/*", /^\/fastlege\/(?!(resources|img)).*$/],
    [nocache, redirectIfUnauthorized],
    (req: express.Request, res: express.Response) => {
      res.sendFile(HTML_FILE);
    }
  );

  server.use("/static", express.static(DIST_DIR));

  const port = 8080;

  ViteExpress.listen(server, port, () => {
    console.log(`App listening on port: ${port}`);
  });

  // server.listen(port, () => {
  //   console.log(`App listening on port: ${port}`);
  // });
};

setupServer();
