<script lang="tsx">
// https://tingtas.com/vue-draggable-resizable-gorkys/
import { uuid } from "shared/utils";
import LayoutPosition from "./layout-position.vue";
import { Component, Mixins } from "vue-property-decorator";
import { PageStore, EditorStore } from "wepage-admin/store/modules";
import ContexMenuMixin from "./context-menu-mixin";

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
export default class PageContent extends Mixins(ContexMenuMixin) {
  isStartMove = false;
  scrollLeft = 0; // 页面横向滚动距离
  scrollTop = 0;
  maxScrollLeft = 0; // 页面最大横向滚动距离
  maxScrollTop = 0;
  startX = 0;
  startY = 0;
  viewportWidth = 0; // 编辑器视口宽度
  viewportHeight = 0; // 编辑器视口高度
  refreshKey = 0;

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
        config,
        data
      });
    }
  }

  // 视口增加拖动事件
  addMoveEvent() {
    const handlePageMouseMove = ev => {
      if (this.isStartMove) {
        const dom = this.$refs.viewport as HTMLElement;
        this.viewportWidth = dom.clientWidth;
        this.viewportHeight = dom.clientHeight;

        if (EditorStore.showScrollbar) {
          this.maxScrollLeft = dom.scrollWidth - this.viewportWidth;
          this.maxScrollTop = dom.scrollHeight - this.viewportHeight;
        } else {
          this.maxScrollLeft = PageStore.width - this.viewportWidth;
          this.maxScrollTop = PageStore.height - this.viewportHeight;
        }

        this.scrollLeft += this.startX - ev.clientX;
        this.scrollTop += this.startY - ev.clientY;

        this.scrollLeft = Math.max(0, this.scrollLeft);
        this.scrollTop = Math.max(0, this.scrollTop);
        this.scrollLeft = Math.min(this.maxScrollLeft, this.scrollLeft);
        this.scrollTop = Math.min(this.maxScrollTop, this.scrollTop);

        if (EditorStore.showScrollbar) {
          dom.scrollTo(this.scrollLeft, this.scrollTop);
        }

        this.startX = ev.clientX;
        this.startY = ev.clientY;
      }
    };

    const handlePageMouseDown = ev => {
      if (ev.target.className.indexOf("page-content") > -1) {
        this.isStartMove = true;
        this.startX = ev.clientX;
        this.startY = ev.clientY;
        document.body.addEventListener("mousemove", handlePageMouseMove);
      }
    };

    const handlePageMouseUp = () => {
      this.isStartMove = false;
      document.body.removeEventListener("mousemove", handlePageMouseMove);
    };

    document.body.addEventListener("mousedown", handlePageMouseDown);
    document.body.addEventListener("mouseup", handlePageMouseUp);
    this.$once("hook:beforeDestroy", () => {
      document.body.removeEventListener("mousedown", handlePageMouseDown);
      document.body.removeEventListener("mouseup", handlePageMouseUp);
    });
  }

  render() {
    return (
      <div
        class="view-port"
        ref="viewport"
        style={{
          overflow: EditorStore.showScrollbar ? "auto" : "hidden",
          background: this.createBackground(EditorStore.gridX, EditorStore.gridY),
          cursor: this.isStartMove ? "pointer" : ""
        }}
        onDragover={this.handlePageDrageover}
        onDrop={this.handlePageDrop}
        onContextmenu={this.handleCanvasContextMenu}>
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
    border: 1px solid red;
  }
  .handle {
    z-index: 100;
    border: 0;
    background: red;
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
.drag-mode * {
  pointer-events: none !important;
}
</style>
