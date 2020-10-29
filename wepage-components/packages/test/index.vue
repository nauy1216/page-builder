<template>
  <div class="test" :style="{ background: color }">
    <p>【hello66666】 {{ msg }}</p>
  </div>
</template>

<script lang="ts">
import defineComponent from "../defineComponent";
import config from "./config";
export default defineComponent({
  name: "Test",
  config: config.config,
  created() {
    console.log("测试");
  },
  props: config.props
});
</script>
<style scoped lang="scss">
.test {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid red;
}
</style>
