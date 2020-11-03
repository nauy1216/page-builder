<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta && $route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta || !$route.meta.keepAlive"></router-view>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style lang="scss"></style>
