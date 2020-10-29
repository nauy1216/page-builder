<template>
  <div class="editor">
    <PageContent class="main"></PageContent>
    <TopTool class="top"></TopTool>
    <LeftTool class="left" v-show="showLeftTool"></LeftTool>
    <RightTool class="right" v-show="showRightTool"></RightTool>
  </div>
</template>

<script lang="ts">
import { UseMixin, Mixin } from "wepage-admin/types/defineComponent";
import LeftTool from "./left-tool/index.vue";
import RightTool from "./right-tool/index.vue";
import TopTool from "./top-tool/index.vue";
import PageContent from "./page-content/inex.vue";
import { mapStateTyped, mapMutationsTyped } from "wepage-admin/types/store";
import keepAlive from "wepage-components/shared/mixins/keepAliveMixin";

const mixin = keepAlive(["/pageShow"]);
export default UseMixin<Mixin<typeof mixin>>()({
  mixins: [mixin],
  components: {
    TopTool,
    LeftTool,
    RightTool,
    PageContent
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig"]),
    ...mapStateTyped("editor", {
      showLeftTool(state): boolean {
        return state.editorConfig.showLeftTool;
      },
      showRightTool(state): boolean {
        return state.editorConfig.showRightTool;
      }
    })
  },
  methods: {
    ...mapMutationsTyped("page", ["addComponent"])
  }
});
</script>
<style scoped lang="scss">
.editor {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .left,
  .right {
    position: fixed;
    z-index: 200;
    width: 250px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 4px 0px #e0e0e0;
    height: 95vh;
    top: 50%;
    transform: translateY(-50%);
  }
  .left {
    left: 0px;
  }
  .right {
    right: 0px;
  }
  .main {
    max-width: calc(100vw - 540px);
    max-height: calc(100vh - 20px);
    box-shadow: 0 0 4px 0 #e0e0e0;
  }
}
</style>
