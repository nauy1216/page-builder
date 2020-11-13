<template>
  <div class="test" :style="{ background: color }">
    <div @click="$router.push(`/page/033f61c0-2557-11eb-a2ff-f1529f21fa06`)">首页</div>
    <div @click="$router.push(`/page/37d1a240-2557-11eb-a2ff-f1529f21fa06`)">集团简介</div>
    <div @click="$router.push(`/gage/`)">页面3</div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-components/BaseVue";
import config from "./config";

@Component({
  name: "Menu",
  config: config.config,
  props: config.props
})
export default class Menu extends BaseVue {
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
