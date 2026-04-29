import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const productionConfig = {
  mode: "production",
};

export default merge(common, productionConfig);
