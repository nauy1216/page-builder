import Vue, { VueConstructor } from "vue";
import apis from "wepage-admin/api";
import ajax from "shared/utils/ajax";

// 私有全局属性在这里声明， 避免全几乎污染
export default class BaseVue<T = any> extends Vue {
  $eventBus!: Pick<Vue, "$on" | "$emit" | "$off">;
  $components!: Record<string, VueConstructor & Record<string, any>>;
  $componentsConfig!: Record<string, any>;
  $ajax!: typeof ajax;
  $api!: typeof apis;
}
