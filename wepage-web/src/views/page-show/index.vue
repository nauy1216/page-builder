<script lang="tsx">
import defineComponent from "wepage-web/types/defineComponent";
import { mapStateTyped, mapActionsTyped } from "wepage-web/types/store";
import { px2rem } from "shared/utils";

export default defineComponent({
  async created() {
    await this.getPageConfig();
    const htmlFontSize = document.documentElement.style.fontSize;
    const width = document.documentElement.getBoundingClientRect().width;
    const scale = width / this.pageConfig.width;
    document.documentElement.style.fontSize = `${(process.env.VUE_APP_HTML_FONT_SIZE * scale).toFixed(8)}px`;
    this.$on("hook:destoryed", () => {
      document.documentElement.style.fontSize = htmlFontSize || "12px";
    });
  },
  computed: {
    ...mapStateTyped(["appConfig", "pageConfig"])
  },
  watch: {
    "$route.params.pageId"() {
      this.getPageConfig();
    }
  },
  methods: {
    ...mapActionsTyped(["getPageConfig"]),
    createKey(comp) {
      if (comp.layoutId === "appLayout") {
        return "appLayout-" + comp.id;
      }
      return comp.id;
    }
  },
  render(h) {
    if (this.pageConfig === null) return <div></div>;
    const pageConfig = this.pageConfig as PageConfig;

    let components = pageConfig.children;
    if (this.appConfig?.config?.children) {
      components = pageConfig.children.concat(this.appConfig.config.children as any);
    }

    const compList = this.$components;
    // TODO: 这里采用的是定位， 后期可考虑改成transform，或做成可配置的
    return (
      <div class="view-port">
        <div
          class="page-content"
          style={{
            width: px2rem(pageConfig.width),
            height: px2rem(pageConfig.height)
          }}>
          {components &&
            components.map((comp, index) => {
              return (
                <div
                  key={this.createKey(comp)}
                  style={{
                    position: "absolute",
                    left: px2rem(comp.layoutConfig.x),
                    top: px2rem(comp.layoutConfig.y),
                    width: px2rem(comp.layoutConfig.width),
                    height: px2rem(comp.layoutConfig.height),
                    zIndex: comp.layoutConfig.zIndex
                  }}>
                  {h(compList[comp.name], {
                    key: comp.name + index,
                    props: {
                      ...comp.componentProps,
                      width: comp.layoutConfig.width,
                      height: comp.layoutConfig.height
                    },
                    attrs: {
                      mockData: comp.mockData
                    }
                  })}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
});
</script>

<style lang="scss" scoped>
.view-port {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .page-content {
    position: relative;
    zoom: 1;
  }
}
</style>
