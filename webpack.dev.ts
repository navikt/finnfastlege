const merge = require("webpack-merge");
const common = require("./webpack.common.ts");
const path = require("path");
const mockEndepunkter = require("./mock/mockEndepunkter");
const express = require("express");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "/static",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    inline: true,
    staticOptions: {
      redirect: false,
    },
    after: (app: any, server: any, compiler: any) => {
      mockEndepunkter(app, true);
      app.use("/fastlege/img", express.static(path.resolve(__dirname, "img")));
      app.use("/static", express.static(path.resolve(__dirname, "dist")));

      app.use("*", (req: any, res: any) => {
        const filename = path.join(compiler.outputPath, "index.html");
        compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) {
            res.sendFile(path.resolve(__dirname, "public/error.html"));
            return;
          }

          res.set("Content-Type", "text/html");
          res.send(result);
          res.end();
        });
      });
    },
  },
});
