import * as express from "express";
import * as path from "path";
import { merge } from "webpack-merge";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";

import common from "./webpack.common";
import mockEndepunkter from "./mock/mockEndepunkter";
import * as Session from "./server/session";

const devConfig: Webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "",
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, "dist"),
      staticOptions: {
        redirect: false,
      },
    },
    setupMiddlewares: (
      middlewares: WebpackDevServer.Middleware[],
      devServer: WebpackDevServer
    ) => {
      setupDev(devServer);
      return middlewares;
    },
  },
};

const setupDev = async (devServer: WebpackDevServer) => {
  const app = devServer.app!!;
  const compiler = devServer.compiler;

  await Session.setupSession(app);

  mockEndepunkter(app);
  app.use("/fastlege/img", express.static(path.resolve(__dirname, "img")));
  app.use("/static", express.static(path.resolve(__dirname, "dist")));

  app.use("*", (req: express.Request, res: express.Response) => {
    const filename = path.join(compiler.outputPath, "index.html");
    compiler.outputFileSystem.readFile(filename, (err: any, result: any) => {
      if (err) {
        res.sendFile(path.resolve(__dirname, "public/error.html"));
        return;
      }

      res.set("Content-Type", "text/html");
      res.send(result);
      res.end();
    });
  });
};

export default merge(common, devConfig);
