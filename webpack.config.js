const webpack = require("webpack");
const extensionsConfig = require("./webpack/webpack-extensions.config");

const API_URL = "https://vasilis.gr:3001/";

if (extensionsConfig.length === 0) {
  console.warn("You have to have at least one widget/theme.");
}

// Inject API_URL into all webpack configs
extensionsConfig.forEach((cfg) => {
  cfg.plugins = cfg.plugins || [];
  cfg.plugins.push(
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(API_URL),
    }),
  );
});

module.exports = extensionsConfig;
