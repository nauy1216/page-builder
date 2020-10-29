/* eslint-disable */
const path = require("path")
const fs = require("fs")
module.exports = class WebpackPlugin {
    constructor() {}
    apply(compiler) {
        compiler.hooks.done.tap("myPlugin", (compilation) => {
            setTimeout(() => {
                const dist = compilation.compilation.outputOptions.path
                const isExistDist = fs.existsSync(path.resolve(dist))
                if (isExistDist) {
                    fs.unlinkSync(path.resolve(dist, "index.html"))
                }
                const res = fs.readdirSync(path.resolve(dist, "css"))
                fs.copyFileSync(path.resolve(dist, `css/${res[0]}`), path.resolve(dist, "wepage-componnets.css"))
                fs.unlinkSync(path.resolve(dist, `css/${res[0]}`))
                fs.rmdirSync(path.resolve(dist, "css"))
            }, 500)
        });
    }
};