<template>
  <div class="test" :style="{ background: color }">
    <p>【hello66666】 {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-components/BaseVue";
import config from "./config";

@Component({
  name: "Test",
  config: config.config,
  props: config.props
})
export default class Test extends BaseVue {
  created() {
    console.log("测试");
  }
}
</script>
<style scoped lang="scss">
.test {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid red;
}
</style>
