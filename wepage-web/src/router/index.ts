import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PageShow from "../views/page-show/index.vue";
import Frame from "wepage-web/components/frame/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Frame,
    children: [
      {
        path: "/page/:pageId",
        name: "PageShow",
        component: PageShow
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
