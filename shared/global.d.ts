import Vue from "vue";

import { Route, RawLocation } from "vue-router";

declare module "vue/types/vue" {
  // Augment component instance type
  interface Vue {
    beforeRouteEnter?(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => void)) => void): void;

    beforeRouteLeave?(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => void)) => void): void;

    beforeRouteUpdate?(to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => void)) => void): void;
  }

  export interface VueConstructor<V extends Vue = Vue & Record<string, any>> {
    // 构造函数重载， 解决自定义组件在tsx中使用时自定义属性报错的问题
    new (options?: any): CombinedVueInstance<V, object, object, object, Record<keyof object, any>>;
  }
}
