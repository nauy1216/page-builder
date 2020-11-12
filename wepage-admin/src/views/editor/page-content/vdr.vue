<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore, EditorStore } from "wepage-admin/store/modules";

@Component({})
export default class Vdr extends BaseVue {
  @Prop({
    required: true,
    type: Object
  })
  comp;

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
    PageStore.refreshComponent(comp);
  }

  handleDeactivated() {
    //   this.setActiveComp(null);
  }

  handleActivated(comp) {
    PageStore.setActiveComp(comp);
  }

  handleComponentContextMenu($event, comp) {
    this.$emit("contextmenu", $event, comp);
  }

  // 计算内容组件的尺寸，并且自适应宽高
  calcSize() {
    this.$nextTick(() => {
      const ele = (this.$refs.component as Vue).$el as HTMLElement;
      const rect = ele.getBoundingClientRect();
      this.comp.config.width = rect.width;
      this.comp.config.height = rect.height;
    });
  }

  render(h) {
    if (!this.comp) return;
    return (
      this.comp && (
        <vue-draggable-resizable
          on={{ "update:active": value => (this.comp.config.active = value) }}
          active={this.comp.config.active}
          x={this.comp.config.x}
          y={this.comp.config.y}
          w={this.comp.config.width}
          h={this.comp.config.height}
          parent={EditorStore.parent}
          debug={false}
          prevent-deactivation={true}
          isConflictCheck={false}
          snap={true}
          snapTolerance={10}
          onDragging={(left, right) => this.handleDrag(this.comp, left, right)}
          onResizing={(left, top, width, height) => this.handleResize(this.comp, left, top, width, height)}
          onDeactivated={this.handleDeactivated}
          onActivated={() => this.handleActivated(this.comp)}>
          {
            <div
              onContextmenu={$event => this.handleComponentContextMenu($event, this.comp)}
              style={{
                width: this.comp.config.width + "px",
                height: this.comp.config.height + "px"
              }}>
              <div>{this.comp.name}</div>
              {h(this.$components[this.comp.name], {
                ref: "component",
                props: this.comp.data
              })}
            </div>
          }
        </vue-draggable-resizable>
      )
    );
  }
}
</script>

<style></style>
