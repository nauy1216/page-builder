/* eslint-disable */
const path = require("path");
module.exports = {
  devServer: {
    port: "9502",
    proxy: {
      "/apis": {
        target: "http://localhost:3000",
        ws: false,
        changeOrigin: true
      }
    }
  },
  outputDir: path.resolve(process.cwd(), "./dist/web"),
  configureWebpack(config) {
    config.entry = {
      "wepage-web": path.resolve(process.cwd(), "wepage-web/src/main.ts")
    }
    config.resolve.alias["wepage-components"] = path.resolve(process.cwd(), "./wepage-components");
    config.resolve.alias["wepage-web"] = path.resolve(process.cwd(), "./wepage-web/src");
  }
};