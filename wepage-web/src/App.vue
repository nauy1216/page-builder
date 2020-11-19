<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import defineComponent from "wepage-web/types/defineComponent";
import { mapMutationsTyped, mapStateTyped } from "wepage-web/types/store";
import { getAppId, getPageId } from "shared/utils/app";
export default defineComponent({
  created() {
    this.getAppConfig();
  },
  computed: {
    ...mapStateTyped(["isFrame"])
  },
  methods: {
    ...mapMutationsTyped(["setAppConfig"]),
    getAppConfig() {
      const appId = getAppId();
      const pageId = getPageId();
      this.$ajax("get", this.$api.getAppConfig, {
        appId
      }).then(res => {
        const appConfig = res.data;
        if (appConfig.config) {
          appConfig.config = JSON.parse(appConfig.config);
          this.setAppConfig(appConfig);
        }
        if (appConfig.pages.length > 0 && !pageId) {
          this.$router.replace("/page/" + appConfig.pages[0].id);
        }
      });
    }
  }
});
</script>

<style lang="scss"></style>
