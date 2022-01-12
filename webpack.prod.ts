const { merge } = require("webpack-merge");

import common from "./webpack.common";

module.exports = merge(common, {
  mode: "production",
});
