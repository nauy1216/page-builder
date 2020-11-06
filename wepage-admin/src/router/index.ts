import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Editor from "../views/editor/index.vue";
import PageShow from "../views/page-show/index.vue";
import Frame from "wepage-admin/components/frame/index.vue";
import AppManage from "wepage-admin/views/app-manage/index.vue";
import PageManage from "wepage-admin/views/page-manage/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/appManage",
    component: Frame,
    meta: { title: "" },
    children: [
      {
        path: "/appManage",
        name: "AppManage",
        component: AppManage
      },
      {
        path: "/pageManage",
        name: "PageManage",
        component: PageManage
      }
    ]
  },
  {
    path: "/editor",
    name: "Editor",
    component: Editor,
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/pageShow",
    name: "PageShow",
    component: PageShow
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/index.vue")
  }
];

// 开发环境加入playground，用于组件测试
if (process.env.NODE_ENV === "development") {
  routes.push({
    path: "/playground",
    component: () => import(/* webpackChunkName: "app-playground" */ "../views/playground/index.vue")
  });
}

const router = new VueRouter({
  routes
});

export default router;
