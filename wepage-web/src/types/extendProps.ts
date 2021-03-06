import apis from "../api";
import ajax from "shared/utils/ajax";
import { VueConstructor } from "vue";

// 在组件实例或者原型上增加的属性可以在这里声明
// 在这里声明不会全局污染
export interface ExtendProps {
  $api: typeof apis;
  $eventBus: Pick<Vue, "$on" | "$emit">;
  $components: { [key: string]: VueConstructor & Record<string, any> };
  $ajax: typeof ajax;
}
