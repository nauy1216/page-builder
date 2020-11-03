/* eslint-disable */
console.log("targetApp ====", process.env.targetApp)
module.exports = (function () {
  if (process.env.targetApp === "admin") {
    return require("./wepage-admin/vue.config")
  } else if (process.env.targetApp === "web") {
    return require("./wepage-web/vue.config")
  }
  return require("./wepage-components/vue.config")
})()