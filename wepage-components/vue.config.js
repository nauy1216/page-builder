/* eslint-disable */
const path = require("path");
const WebpackPlugin = require("./webpackPlugin")
module.exports = {
  devServer: {
    port: "8001",
    proxy: {
      "/apis": {
        target: "http://localhost:3000",
        ws: false,
        changeOrigin: true
      }
    }
  },
  outputDir: path.resolve(process.cwd(), "./dist/components"),
  configureWebpack(config) {
    config.mode = "development"
    config.entry = {
      "wepage-components": "./wepage-components/index.ts"
    }
    delete config.optimization
    config.output["filename"] = "wepage-components.js"
    config.output["library"] = "WepageComponents"
    config.output["libraryTarget"] = "umd"
    config.plugins.push(new WebpackPlugin())
    config.resolve.alias["shared"] = path.resolve(process.cwd(), "./shared");
  }
};