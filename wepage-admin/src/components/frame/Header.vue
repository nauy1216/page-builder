<script lang="tsx">
import BaseVue from "wepage-admin/BaseVue";
import { Component } from "vue-property-decorator";

@Component
export default class Header extends BaseVue {
  render() {
    return (
      <div class="rp-header">
        {this.$slots.default || (
          <slot>
            <div class="rp-header__name">大屏后台管理</div>
          </slot>
        )}
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@import "shared/style/bem.scss";
@include b(header) {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: var(--header-height);
  padding: 0 20px;
  font-size: 16px;
  background: #ffffff;
  box-shadow: rgba(141, 158, 167, 0.13) 0px 4px 10px 0px;
  z-index: 500;
  @include e((name, logo)) {
    float: left;
    line-height: var(--header-height);
  }
  @include e(logo) {
    margin: calc(var(--header-height) * 0.25 / 2) 20px 0 0;
    height: calc(var(--header-height) * 0.75);
  }
}
</style>
