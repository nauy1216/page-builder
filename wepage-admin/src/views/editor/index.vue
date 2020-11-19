<script lang="tsx">
import LeftTool from "./left-tool/index.vue";
import RightTool from "./right-tool/index.vue";
import TopTool from "./top-tool/index.vue";
import PageContent from "./page-content/index.vue";
import vHead from "wepage-admin/components/frame/Header.vue";
import keepAlive from "shared/mixins/keepAliveMixin";
import { EditorStore, AppStore } from "wepage-admin/store/modules";

import BaseVue from "wepage-admin/BaseVue";
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
export default class EditorIndex extends Mixins<BaseVue>(BaseVue.extend(mixin)) {
  get showLeftTool() {
    return EditorStore.showLeftTool;
  }
  get showRightTool() {
    return EditorStore.showRightTool;
  }

  created() {
    this.getApp();
  }

  getApp() {
    AppStore.initApp(this.$route.query.appId as string);
    // this.$ajax("get", this.$api.getApp, {
    //   appId: this.$route.query.appId
    // }).then(res => {
    //   console.log(res);
    //   delete res.data.pages;
    //   AppStore.setApp(res.data);
    //   try {
    //     if (res.data.config) {
    //       const config = JSON.parse(res.data.config);
    //       AppStore.setAppConfig({
    //         children: config.children
    //       });
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // });
  }

  render() {
    return (
      <div class="l-editor">
        <vHead>
          <TopTool></TopTool>
        </vHead>
        <div class="l-editor__main">
          <LeftTool class="l-editor__left" v-show={this.showLeftTool}></LeftTool>
          <PageContent class="l-editor__content"></PageContent>
          <RightTool class="l-editor__right" v-show={this.showRightTool}></RightTool>
        </div>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@import "shared/style/bem.scss";
@include b(editor) {
  width: 100vw;
  height: 100vh;
  @include e(main) {
    width: 100vw;
    height: calc(100vh - var(--header-height));
    display: flex;
    justify-content: space-between;
    align-items: center;
    .l-editor__left,
    .l-editor__right {
      flex: 0 0 260px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 4px 0px #e0e0e0;
      height: calc(100vh - var(--header-height));
      top: var(--header-height);
    }
    .l-editor__left {
      width: 260px;
    }
    .l-editor__right {
      width: 340px;
      padding: 20px;
    }
  }
  .l-editor__content {
    max-width: calc(100vw - 600px - 40px);
    max-height: calc(100vh - var(--header-height) - 40px);
    box-shadow: 0 0 4px 0 #e0e0e0;
    // flex: 1 1 100%;
  }
}
</style>
