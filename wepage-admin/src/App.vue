<template>
  <div id="app">
    <Hello></Hello>
    <keep-alive>
      <router-view v-if="$route.meta && $route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta || !$route.meta.keepAlive"></router-view>
  </div>
</template>
<script lang="ts">
import Hello from "wepage-admin/components/HelloWorld.vue";
export default {
  components: {
    Hello
  }
};
</script>
<style lang="scss"></style>
