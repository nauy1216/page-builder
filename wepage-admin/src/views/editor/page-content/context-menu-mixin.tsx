import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import ContextMenu from "wepage-admin/views/editor/components/context-menu";
import { PageStore } from "wepage-admin/store/modules";
import { uuid } from "shared/utils/index";

@Component({})
export default class ContexMenuMixin extends BaseVue {
  isOperable(comp: PageComponentOptions) {
    if (comp.layoutId === "appLayout" && PageStore.activeLayout?.id !== "appLayout") {
      return false;
    }
    return true;
  }

  // 画布右键菜单
  handleCanvasContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    (this.$refs.contextMenu as ContextMenu).show(event.clientX, event.clientY, [
      {
        command: "delete-all-component",
        name: "删除所有组件",
        handle: () => {
          PageStore.clearAllComponent();
        }
      }
    ]);
  }

  // 组件右键菜单
  handleComponentContextMenu(event, comp: PageComponentOptions) {
    if (!this.isOperable(comp)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    (this.$refs.contextMenu as ContextMenu).show(event.clientX, event.clientY, [
      {
        command: "delete-component",
        name: "删除",
        handle: () => {
          PageStore.removeComponent(comp);
        }
      },
      {
        command: "copy-component",
        name: "复制",
        handle: () => {
          const copy = JSON.parse(JSON.stringify(comp));
          copy.id = uuid();
          copy.key = uuid();
          copy.component = (comp as any).component;
          PageStore.addComponent(copy);
        }
      },
      {
        command: "auto-width",
        name: "设置宽度与页面宽度一致",
        handle: () => {
          comp.layoutConfig.width = PageStore.width;
        }
      },
      {
        command: "auto-height",
        name: "设置高度与页面高度一致",
        handle: () => {
          comp.layoutConfig.height = PageStore.height;
        }
      },
      {
        command: "horizontal-left",
        name: "左对齐",
        handle: () => {
          comp.layoutConfig.x = 0;
        }
      },
      {
        command: "horizontal-right",
        name: "右对齐",
        handle: () => {
          comp.layoutConfig.x = PageStore.width - comp.layoutConfig.width;
        }
      },
      {
        command: "horizontal-center",
        name: "水平居中",
        handle: () => {
          comp.layoutConfig.x = (PageStore.width - comp.layoutConfig.width) / 2;
        }
      },
      {
        command: "vertical-top",
        name: "顶部对齐",
        handle: () => {
          comp.layoutConfig.y = 0;
        }
      },
      {
        command: "vertical-bottom",
        name: "底部对齐",
        handle: () => {
          comp.layoutConfig.y = PageStore.height - comp.layoutConfig.height;
        }
      },
      {
        command: "vertical-center",
        name: "垂直居中",
        handle: () => {
          comp.layoutConfig.y = (PageStore.height - comp.layoutConfig.height) / 2;
        }
      },
      {
        command: "center",
        name: "中心居中",
        handle: () => {
          comp.layoutConfig.x = (PageStore.width - comp.layoutConfig.width) / 2;
          comp.layoutConfig.y = (PageStore.height - comp.layoutConfig.height) / 2;
        }
      },
      {
        command: "refresh",
        name: "刷新组件",
        handle: () => {
          comp.tempData.key = uuid();
        }
      }
    ]);
  }

  renderContextMenu() {
    return <ContextMenu ref="contextMenu"></ContextMenu>;
  }
}
