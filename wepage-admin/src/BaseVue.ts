import Vue, { VueConstructor } from "vue";

// 私有全局属性在这里声明， 避免全几乎污染
export default class BaseVue extends Vue {
  $eventBus!: Pick<Vue, "$on" | "$emit" | "$off">;

  $components!: Record<string, VueConstructor>;
  $componentsConfig!: Record<string, any>;
}
