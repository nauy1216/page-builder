<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";
import Vdr from "./vdr.vue";

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

  get components() {
    const showLayouts = PageStore.layouts.filter(lay => lay.show).map(lay => lay.id);
    const showAppLayout = layoutId => layoutId === "appLayout";
    return PageStore.children.filter(comp => showLayouts.indexOf(comp.layoutId) > -1 || showAppLayout(comp.layoutId));
  }

  handleComponentContextMenu($event, comp) {
    this.$emit("contextmenu", $event, comp);
  }

  render() {
    return (
      <div style={{ width: this.width + "px", height: this.height + "px" }} class="layout-position">
        {this.components.length > 0 &&
          this.components.map(comp => {
            return <Vdr key={comp.id} comp={comp} onContextmenu={this.handleComponentContextMenu}></Vdr>;
          })}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.layout-position {
  pointer-events: none;
  & * {
    pointer-events: all;
  }
}
</style>
