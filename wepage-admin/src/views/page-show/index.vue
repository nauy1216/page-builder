<script lang="tsx">
import defineComponent from "wepage-admin/types/defineComponent";
import FrameMessage from "wepage-components/shared/utils/message";
import { mapStateTyped } from "wepage-admin/types/store";

export default defineComponent({
  mounted() {
    const frameMessage = new FrameMessage("wepage-admin", (this.$refs.app as any).contentWindow);
    frameMessage.onMessage("getAppConfig", () => {
      return "appConfig 给你啦";
    });
    frameMessage.onMessage("getPageConfig", () => {
      const config = JSON.parse(JSON.stringify(this.pageConfig));
      config.children.forEach(child => {
        child.config.active = false;
      });
      return config;
    });
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig"])
  },
  render() {
    const host = process.env.VUE_APP_PAGE_SHOW_HOST || location.origin;
    const url = `${host}/${this.$route.query.appId}#/page/${this.$route.query.pageId}`;
    return <iframe ref="app" src={url} style="width: 100vw; height: 100vh;"></iframe>;
  }
});
</script>

<style></style>
