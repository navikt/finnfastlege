const express = require("express");
const path = require("path");
const prometheus = require("prom-client");
const proxy = require("express-http-proxy");

// Prometheus metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const server = express();

server.use(express.json());

const modiacontextholderUrl =
  process.env.ENV === "preprod"
    ? "modiacontextholder.q1"
    : "modiacontextholder.default";

const getQueryStringFromReq = (req) => {
  const queryString = req.url.split("?")[1];
  return queryString ? `?${queryString}` : "";
};

server.use(
  "/syfo-tilgangskontroll",
  proxy("syfo-tilgangskontroll.default", {
    proxyReqPathResolver: (req) => {
      return `/syfo-tilgangskontroll${req.path}${getQueryStringFromReq(req)}`;
    },
    https: false,
  })
);

server.use(
  "/fastlegerest",
  proxy("fastlegerest.default", {
    proxyReqPathResolver: (req) => {
      return `/fastlegerest${req.path}${getQueryStringFromReq(req)}`;
    },
    https: false,
  })
);

server.use(
  "/modiacontextholder/api",
  proxy(modiacontextholderUrl, {
    proxyReqPathResolver: function (req) {
      return `/modiacontextholder/api${req.url}`;
    },
    proxyErrorHandler: function (err, res, next) {
      console.error("Error in proxy for modiacontextholder", err);
      next(err);
    },
    https: false,
  })
);

server.use(
  "/syfoperson/api",
  proxy("syfoperson.default", {
    proxyReqPathResolver: (req) => {
      return `/syfoperson/api${req.path}${getQueryStringFromReq(req)}`;
    },
  })
);

function nocache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
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
  nocache,
  (req, res) => {
    res.sendFile(HTML_FILE);
  }
);

server.use("/static", express.static(DIST_DIR));

const port = 8080;

server.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
