import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./style/reset.scss";
import "./style/index.scss";
import WepageComponents from "wepage-components";
import apis from "wepage-web/api";
import ajax from "shared/utils/ajax";

Vue.use(WepageComponents);

Vue.prototype.$api = apis;
Vue.prototype.$ajax = ajax;

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
