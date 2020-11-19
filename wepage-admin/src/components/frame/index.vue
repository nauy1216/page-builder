<script lang="tsx">
import BaseVue from "wepage-admin/BaseVue";
import { Component } from "vue-property-decorator";
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
@Component({
  components: {
    vHead,
    vSidebar
  }
})
export default class Sidebar extends BaseVue {
  render() {
    return (
      <div class="l-frame">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div staticClass="l-frame__content-box">
          <div class="l-frame__content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@import "shared/style/bem.scss";
@include b(frame) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include e(content-box) {
    margin-left: var(--sidebar-width);
    padding: 20px;
    box-sizing: border-box;
    transition: left 0.3s ease-in-out;
    background: #f9f9f9;
    height: calc(100vh - var(--header-height));
    overflow: auto;
  }
  @include e(content) {
    width: auto;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
    min-height: calc(100vh - var(--header-height) - 40px);
    background: #ffffff;
  }
}
</style>
