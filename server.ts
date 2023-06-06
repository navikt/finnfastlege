import express from "express";
import path from "path";
import prometheus from "prom-client";

import { setupAuth } from "./server/auth";
import { setupProxy } from "./server/proxy";

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({});

const server = express();
server.use(express.json());

const setupServer = async () => {
  const authClient = await setupAuth(server);

  server.use(setupProxy(authClient));

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
    if (req.headers["authorization"]) {
      next();
    } else {
      res.redirect(`/oauth2/login?redirect=${req.originalUrl}`);
    }
  };

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

  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
};

setupServer();
