<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { AppStore, PageStore } from "wepage-admin/store/modules";
import Vdr from "./vdr.vue";
import { uuid } from "shared/utils";

@Component({
  components: {
    Vdr
  }
})
export default class LayoutPosition extends BaseVue {
  @Prop({
    type: Number
  })
  width;

  @Prop({
    type: Number
  })
  height;

  vLine: any[] = [];
  hLine: any[] = [];

  get components() {
    const components = PageStore.activeLayout?.id === "appLayout" ? PageStore.children : AppStore.children.concat(PageStore.children);
    const showLayouts = PageStore.layouts.filter(lay => lay.show).map(lay => lay.id);
    const showAppLayout = layoutId => layoutId === "appLayout";
    return components.filter(comp => showLayouts.indexOf(comp.layoutId) > -1 || showAppLayout(comp.layoutId));
  }

  handleComponentContextMenu($event, comp) {
    this.$emit("contextmenu", $event, comp);
  }

  getRefLineParams(params) {
    this.vLine = params.vLine;
    this.hLine = params.hLine;
  }

  render() {
    return (
      <div style={{ width: this.width + "px", height: this.height + "px" }} class="l-layout-position">
        {this.components.length > 0 &&
          this.components.map(comp => {
            return <Vdr key={comp.tempData.key} comp={comp} onRefLineParams={this.getRefLineParams} onContextmenu={this.handleComponentContextMenu}></Vdr>;
          })}
        {this.vLine.map(item => {
          return <span class="ref-line v-line l-layout-position__line" key={uuid()} v-show={item.display} style={{ left: item.position, top: item.origin, height: item.lineLength }} />;
        })}
        {this.hLine.map(item => {
          return <span class="ref-line h-line l-layout-position__line" key={uuid()} v-show={item.display} style={{ top: item.position, left: item.origin, width: item.lineLength }} />;
        })}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import "shared/style/bem.scss";
@include b(layout-position) {
  position: relative;
  pointer-events: none;
  & * {
    pointer-events: all;
  }
  @include e(line) {
    background-color: var(--theme-color);
  }
}
</style>
