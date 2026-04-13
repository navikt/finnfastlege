import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "",
  },
};

export default merge(common, devConfig);
