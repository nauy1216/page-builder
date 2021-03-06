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

  handleDrag(comp: PageComponentOptions, left, top) {
    comp.layoutConfig.x = left;
    comp.layoutConfig.y = top;
  }

  handleResize(comp: PageComponentOptions, left, top, width, height) {
    comp.layoutConfig.x = left;
    comp.layoutConfig.y = top;
    comp.layoutConfig.width = width;
    comp.layoutConfig.height = height;
  }

  handleDeactivated() {
    //   this.setActiveComp(null);
  }

  handleActivated(comp) {
    if (this.isOperable(comp)) {
      PageStore.setActiveComp(comp);
    }
  }

  handleComponentContextMenu($event, comp: PageComponentOptions) {
    this.$emit("contextmenu", $event, comp);
  }

  // 计算内容组件的尺寸，并且自适应宽高
  calcSize() {
    setTimeout(() => {
      if (this.$refs.component) {
        const ele = (this.$refs.component as Vue).$el as HTMLElement;
        const rect = ele.getBoundingClientRect();
        this.comp.layoutConfig.width = rect.width;
        this.comp.layoutConfig.height = rect.height;
      }
    }, 50);
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
          on={{ "update:active": value => (this.comp.tempData.active = value) }}
          active={this.comp.tempData.active}
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
          snapTolerance={20}
          onDragging={(left, right) => this.handleDrag(this.comp, left, right)}
          onResizing={(left, top, width, height) => this.handleResize(this.comp, left, top, width, height)}
          onDeactivated={this.handleDeactivated}
          onActivated={() => this.handleActivated(this.comp)}
          onRefLineParams={this.getRefLineParams}>
          {
            <div
              onContextmenu={$event => this.handleComponentContextMenu($event, this.comp)}
              class="l-vdr-wrap"
              style={{
                width: this.comp.layoutConfig.width + "px",
                height: this.comp.layoutConfig.height + "px",
                position: "relative"
              }}>
              {h(this.$components[this.comp.name], {
                ref: "component",
                props: {
                  ...this.comp.componentProps,
                  width: this.comp.layoutConfig.width,
                  height: this.comp.layoutConfig.height,
                  componentData: this.comp.mockData
                }
              })}
              <div class="l-vdr-wrap__tool">
                <div class="l-vdr-wrap__drag-handle">
                  <i class="el-icon-rank"></i>
                </div>
              </div>
            </div>
          }
        </vue-draggable-resizable>
      )
    );
  }
}
</script>

<style lang="scss">
@import "shared/style/bem.scss";
@include b(vdr-wrap) {
  @include e(tool) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999999;
    padding: 4px;
    background-color: #ffffff;
    display: none;
    .el-icon-rank {
      color: var(--theme-color);
    }
  }
  @include e(drag-handle) {
    color: var(--font-color-gray1);
    font-size: 16px;
    &:hover {
      cursor: move;
    }
  }
  &:hover {
    @include e(tool) {
      display: flex;
    }
  }
}
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
