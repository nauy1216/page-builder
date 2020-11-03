import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./style/reset.scss";
import "./style/index.scss";
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import WepageComponents from "wepage-components";
import apis from "wepage-admin/api";
import ajax from "shared/utils/ajax";

Vue.use(WepageComponents);
Vue.prototype.$api = apis;
Vue.prototype.$ajax = ajax;

Vue.component("vue-draggable-resizable", VueDraggableResizable);

Vue.use(ElementUI, {
  size: "mini"
});

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
