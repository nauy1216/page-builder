<template>
  <div class="header">
    <div class="logo">wepage</div>
  </div>
</template>
<script lang="ts">
import defineComponent from "wepage-admin/types/defineComponent";
export default defineComponent({
  data() {
    return {
      collapse: false,
      fullscreen: false,
      username: "admin"
    };
  }
});
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 0 30px;
  font-size: 16px;
  background: #ffffff;
  box-shadow: rgba(141, 158, 167, 0.13) 0px 4px 10px 0px;
  z-index: 100;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 50px;
}
</style>
