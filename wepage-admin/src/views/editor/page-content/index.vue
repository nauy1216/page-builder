<script lang="tsx">
import { uuid } from "shared/utils";
import LayoutPosition from "./layout-position.vue";
import { Component, Mixins } from "vue-property-decorator";
import { PageStore, EditorStore } from "wepage-admin/store/modules";
import ContexMenuMixin from "./context-menu-mixin";
import DragMixin from "./drag-mixin";

const defaultConfig: PageComponentOptionsConfig = {
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  zIndex: 0,
  lockAspectRatio: true,
  active: true
};

@Component({
  components: {
    LayoutPosition
  }
})
export default class PageContent extends Mixins(ContexMenuMixin, DragMixin) {
  get transform(): string {
    if (EditorStore.showScrollbar) {
      return `translate(0px, 0px})`;
    }
    return `translate(${-this.scrollLeft + "px"}, ${-this.scrollTop + "px"})`;
  }

  created() {
    this.addMoveEvent();
  }

  createBackground(x, y) {
    if (!EditorStore.showGrid) return "";
    return `linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${x}px ${x}px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${y}px ${y}px`;
  }

  handlePageDrageover(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  scalePosition(n: number) {
    return parseInt(String(n / EditorStore.zoom));
  }

  // 从组件列表拖拽组件释放
  handlePageDrop(event) {
    if (!PageStore.activeLayout) {
      this.$message.error("请先在图层管理中选择图层");
      return;
    }
    const comp = PageStore.dragComp;
    if (comp && comp.extendOptions) {
      // 设置组件所在位置
      const rect = event.target.getBoundingClientRect();
      const componentConfig = JSON.parse(JSON.stringify(this.$componentsConfig[comp.options.name]));
      let config = componentConfig.config;
      config.x = this.scalePosition(event.clientX - rect.left) + event.target.scrollLeft;
      config.y = this.scalePosition(event.clientY - rect.top) + event.target.scrollTop;

      config.x = Math.max(0, config.x);
      config.y = Math.max(0, config.y);
      config.x = Math.min(event.target.scrollWidth - config.width, config.x);
      config.y = Math.min(event.target.scrollHeight - config.height, config.y);

      config = Object.assign({}, defaultConfig, config);

      // 设置默认属性
      const data = {};
      const props = componentConfig.props;
      props &&
        Object.keys(props).forEach(key => {
          if (typeof props[key].default == "function") {
            data[key] = props[key].default();
          } else {
            data[key] = props[key].default;
          }
        });

      PageStore.addComponent({
        layoutId: PageStore.activeLayout.id,
        id: uuid(),
        key: uuid(),
        name: comp.options.name,
        alias: config.alias,
        layoutConfig: config,
        componentProps: data,
        useMockData: false,
        mockData: {},
        tempData: {
          active: true,
          key: uuid()
        }
      });
    }
  }

  render() {
    return (
      <div
        class="view-port l-page-canvas"
        onDragover={this.handlePageDrageover}
        onDrop={this.handlePageDrop}
        onContextmenu={this.handleCanvasContextMenu}
        style={{
          // overflow: EditorStore.showScrollbar ? "auto" : "hidden",
          background: this.createBackground(EditorStore.gridX, EditorStore.gridY),
          cursor: this.isStartMove ? "pointer" : ""
        }}>
        <el-scrollbar viewClass="l-page-canvas__scrollbar" ref="viewport">
          <div
            staticClass="page-content"
            class={{ "drag-mode": EditorStore.dragMode }}
            ref="pageContent"
            key={PageStore.key}
            style={{
              transform: this.transform,
              width: PageStore.width + "px",
              height: PageStore.height + "px",
              zoom: EditorStore.zoom
            }}>
            <LayoutPosition width={PageStore.height} height={PageStore.height} onContextmenu={this.handleComponentContextMenu}></LayoutPosition>
          </div>
          {this.renderContextMenu()}
        </el-scrollbar>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.view-port {
  .page-content {
    box-shadow: inset 0 0 0px 1px rgb(64, 158, 255);
    position: relative;
    zoom: 1;
  }
}
</style>
<style lang="scss">
.l-page-canvas__scrollbar {
  width: 100%;
  max-height: calc(100vh - var(--header-height) - 40px);
}
.drag-mode * {
  pointer-events: none !important;
}
</style>
