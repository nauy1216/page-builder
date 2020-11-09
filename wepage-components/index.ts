import { VueConstructor } from "vue";

import Test from "./packages/test/index.vue";
import ChartHistogram from "./packages/chart-histogram/index.vue";
import ChartBar from "./packages/chart-bar/index.vue";
import ChartPie from "./packages/chart-pie/index.vue";
import ChartRing from "./packages/chart-ring/index.vue";

const compList = {
  Test,
  ChartHistogram,
  ChartBar,
  ChartPie,
  ChartRing
};

export default {
  install(Vue: VueConstructor): void {
    Object.keys(compList).forEach(comp => {
      if (typeof compList[comp] != "function") {
        compList[comp] = Vue.extend(compList[comp]);
      }
    });

    Vue.prototype.$components = compList;
  }
};