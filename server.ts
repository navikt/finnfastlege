import express from "express";
import path from "path";
import { logger } from "@navikt/pino-logger";
import { validateToken } from "./server/authUtils.js";
import { setupProxy } from "./server/proxy.js";
import { fileURLToPath } from "url";
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(express.json());
server.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

const nocache = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
};

const redirectIfUnauthorized = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (await validateToken(req)) {
    next();
  } else {
    res.redirect(`/oauth2/login?redirect=${req.originalUrl}`);
  }
};

const setupServer = async () => {
  const DIST_DIR = path.join(__dirname, "dist");
  const HTML_FILE = path.join(DIST_DIR, "index.html");

  server.use(setupProxy());

  server.get("/health/isReady", (req, res) => {
    res.status(200).send("Im ready!");
  });
  server.get("/health/isAlive", (req, res) => {
    res.status(200).send("Im alive!");
  });

  server.use(
    "/fastlege",
    express.static(DIST_DIR, {
      dotfiles: "allow" /* Express 5: preserve v4 behavior */,
    }),
  );

  server.get(
    ["/", "/fastlege/*splat"],
    [nocache, redirectIfUnauthorized],
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (path.extname(req.path)) {
        return next();
      }

      res.sendFile(HTML_FILE, {
        dotfiles: "allow" /* Express 5: preserve v4 behavior */,
      });
    },
  );

  const port = 8080;

  server.listen(port, () => {
    logger.info(`App listening on port: ${port}`);
  });
};

setupServer();
