/* eslint-disable */
const path = require("path");
module.exports = {
  devServer: {
    port: "9501",
    proxy: {
      "/apis": {
        target: "http://localhost:3000",
        ws: false,
        changeOrigin: true
      }
    }
  },
  outputDir: path.resolve(process.cwd(), "./dist/admin"),
  configureWebpack(config) {
    config.entry = {
      "wepage-admin": path.resolve(process.cwd(), "wepage-admin/src/main.ts")
    }
    config.resolve.alias["wepage-components"] = path.resolve(process.cwd(), "./wepage-components");
    config.resolve.alias["wepage-admin"] = path.resolve(process.cwd(), "./wepage-admin/src");
  }
};