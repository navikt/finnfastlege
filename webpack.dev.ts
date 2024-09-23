import { merge } from "webpack-merge";
import * as Webpack from "webpack";

import common from "./webpack.common";

const devConfig: Webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "",
  },
};

export default merge(common, devConfig);
