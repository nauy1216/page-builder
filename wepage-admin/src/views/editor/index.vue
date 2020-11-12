<script lang="tsx">
import LeftTool from "./left-tool/index.vue";
import RightTool from "./right-tool/index.vue";
import TopTool from "./top-tool/index.vue";
import PageContent from "./page-content/index.vue";
import vHead from "wepage-admin/components/frame/Header.vue";
import keepAlive from "shared/mixins/keepAliveMixin";
import { EditorStore } from "wepage-admin/store/modules";

import Vue from "vue";
import { Component, Mixins } from "vue-property-decorator";
const mixin = keepAlive(["/pageShow"]);

@Component({
  components: {
    TopTool,
    LeftTool,
    RightTool,
    PageContent,
    vHead
  }
})
export default class EditorIndex extends Mixins<Vue>(Vue.extend(mixin)) {
  get showLeftTool() {
    return EditorStore.showLeftTool;
  }
  get showRightTool() {
    return EditorStore.showRightTool;
  }

  render() {
    return (
      <div class="editor">
        <vHead>
          <TopTool></TopTool>
        </vHead>
        <div class="main">
          <PageContent class="content"></PageContent>
          <LeftTool class="left" v-show="showLeftTool"></LeftTool>
          <RightTool class="right" v-show="showRightTool"></RightTool>
        </div>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
.main {
  width: 100vw;
  height: calc(100vh - var(--header-height));
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
    height: calc(100vh - var(--header-height));
    top: var(--header-height);
  }
  .left {
    left: 0px;
  }
  .right {
    right: 0px;
  }
  .content {
    max-width: calc(100vw - 540px);
    max-height: calc(100vh - var(--header-height) - 40px);
    box-shadow: 0 0 4px 0 #e0e0e0;
  }
}
</style>
