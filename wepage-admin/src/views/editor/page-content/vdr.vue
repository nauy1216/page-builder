<script lang="tsx">
// https://tingtas.com/vue-draggable-resizable-gorkys/
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore, EditorStore } from "wepage-admin/store/modules";

@Component({})
export default class Vdr extends BaseVue {
  @Prop({
    required: true,
    type: Object
  })
  comp!: PageComponentOptions;

  mounted() {
    this.calcSize();
  }

  handleDrag(comp, left, top) {
    comp.config.x = left;
    comp.config.y = top;
  }

  handleResize(comp, left, top, width, height) {
    comp.config.x = left;
    comp.config.y = top;
    comp.config.width = width;
    comp.config.height = height;
    // PageStore.refreshComponent(comp);
  }

  handleDeactivated() {
    //   this.setActiveComp(null);
  }

  handleActivated(comp) {
    if (this.isOperable(comp)) {
      PageStore.setActiveComp(comp);
    }
  }

  handleComponentContextMenu($event, comp) {
    this.$emit("contextmenu", $event, comp);
  }

  // 计算内容组件的尺寸，并且自适应宽高
  calcSize() {
    this.$nextTick(() => {
      const ele = (this.$refs.component as Vue).$el as HTMLElement;
      const rect = ele.getBoundingClientRect();
      this.comp.layoutConfig.width = rect.width;
      this.comp.layoutConfig.height = rect.height;
    });
  }

  isOperable(comp: PageComponentOptions) {
    if (comp.layoutId === "appLayout" && PageStore.activeLayout?.id !== "appLayout") {
      return false;
    }
    return true;
  }

  getRefLineParams(params) {
    this.$emit("refLineParams", params);
  }

  render(h) {
    if (!this.comp) return;
    return (
      this.comp && (
        <vue-draggable-resizable
          on={{ "update:active": value => (this.comp.layoutConfig.active = value) }}
          active={this.comp.layoutConfig.active}
          x={this.comp.layoutConfig.x}
          y={this.comp.layoutConfig.y}
          w={this.comp.layoutConfig.width}
          h={this.comp.layoutConfig.height}
          style={{ zIndex: this.comp.layoutConfig.zIndex }}
          parent={EditorStore.parent}
          draggable={this.isOperable(this.comp)}
          resizable={this.isOperable(this.comp)}
          disableUserSelect={this.isOperable(this.comp)}
          debug={false}
          prevent-deactivation={true}
          isConflictCheck={false}
          snap={true}
          snapTolerance={10}
          onDragging={(left, right) => this.handleDrag(this.comp, left, right)}
          onResizing={(left, top, width, height) => this.handleResize(this.comp, left, top, width, height)}
          onDeactivated={this.handleDeactivated}
          onActivated={() => this.handleActivated(this.comp)}
          onRefLineParams={this.getRefLineParams}>
          {
            <div
              onContextmenu={$event => this.handleComponentContextMenu($event, this.comp)}
              style={{
                width: this.comp.layoutConfig.width + "px",
                height: this.comp.layoutConfig.height + "px"
              }}>
              {h(this.$components[this.comp.name], {
                ref: "component",
                props: this.comp.componentProps
              })}
            </div>
          }
        </vue-draggable-resizable>
      )
    );
  }
}
</script>

<style lang="scss">
.vdr {
  border: 0 !important;
  &:before {
    content: "";
    width: calc(100%);
    height: calc(100%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    box-sizing: border-box;
    border: 1px solid var(--theme-color);
  }
  .handle {
    z-index: 100;
    border: 0;
    background: var(--theme-color);
  }
  .handle-tl {
    top: 0px !important;
    left: 0px !important;
  }
  .handle-tm {
    top: 0px !important;
  }
  .handle-tr {
    top: 0px !important;
    right: 0px !important;
  }
  .handle-ml {
    left: 0px !important;
  }
  .handle-mr {
    right: 0px !important;
  }

  .handle-bl {
    bottom: 0px !important;
    left: 0px !important;
  }
  .handle-bm {
    bottom: 0px !important;
  }
  .handle-br {
    bottom: 0px !important;
    right: 0px !important;
  }
}
</style>
