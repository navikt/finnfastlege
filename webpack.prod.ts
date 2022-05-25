import { merge } from "webpack-merge";
import common from "./webpack.common";
import { Configuration as WebpackConfiguration } from "webpack";

const productionConfig: WebpackConfiguration = {
  mode: "production",
};

export default merge(common, productionConfig);
