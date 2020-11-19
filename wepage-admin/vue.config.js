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
    config.resolve.alias["shared"] = path.resolve(process.cwd(), "./shared");
    config.resolve.alias["wepage-admin"] = path.resolve(process.cwd(), "./wepage-admin/src");
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   enforce: "pre",
    //   use: [{
    //     loader: 'px2rem-loader',
    //     // options here
    //     options: {
    //       baseDpr: 2, // base device pixel ratio (default: 2)
    //       remUnit: 100, // rem unit value (default: 75)
    //       remPrecision: 8, // rem value precision (default: 6)
    //       forcePxComment: 'px', // force px comment (default: `px`)
    //       keepComment: 'no' // no transform value comment (default: `no`)
    //     }
    //   }],
    //   exclude: [
    //     path.resolve("node_modules")
    //   ]
    // })
  },
  chainWebpack: config => {
    config.module
      .rule('scss')
      .oneOf('vue')
      .include
      .add(path.resolve(process.cwd(), 'wepage-components'))
      .end()
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({
        baseDpr: 2, // base device pixel ratio (default: 2)
        remUnit: 100, // rem unit value (default: 75)
        remPrecision: 8, // rem value precision (default: 6)
        forcePxComment: 'px', // force px comment (default: `px`)
        keepComment: 'use px' // no transform value comment (default: `no`)
      })
      .end()
  }
};