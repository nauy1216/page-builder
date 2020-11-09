import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import store from "wepage-admin/store";
import { uuid } from "shared/utils";

function getDefaultLayout(): PageLyout {
  return {
    id: uuid(),
    name: "默认",
    zIndex: 0,
    show: true,
    mode: "position"
  };
}

function getDefaultPageConfig(): PageConfig {
  return {
    id: uuid(),
    key: uuid(),
    alias: "",
    width: 1920,
    height: 1080,
    background: "",
    layouts: [getDefaultLayout()], // 图层
    children: []
  };
}

const defaultPageConfig = getDefaultPageConfig();

type CompId = string;

@Module({ name: "page", dynamic: true, namespaced: true, store })
export default class PageModule extends VuexModule implements PageConfig {
  dragComp: PureComp = null; // 从组件列表中拖动的组件
  activeComp: PageComp = null; // 当前激活的组件
  activeLayout: PageLyout | null = defaultPageConfig.layouts[0]; // 当前激活的图层

  id = defaultPageConfig.id;
  key = defaultPageConfig.key;
  alias = defaultPageConfig.alias;
  width = defaultPageConfig.width;
  height = defaultPageConfig.height;
  background = defaultPageConfig.background;
  layouts = [defaultPageConfig.layouts[0]]; // 图层
  children = defaultPageConfig.children;

  get config() {
    return {
      id: this.id,
      key: this.key,
      alias: this.alias,
      width: this.width,
      height: this.height,
      background: this.background,
      layouts: this.layouts, // 图层
      children: this.children
    };
  }

  // 获取指定组件的索引
  private getCompIndex(comp: PageComponentOptions | CompId) {
    if (!comp) return -1;
    let index = -1;
    if (typeof comp === "string") {
      index = this.children.findIndex(child => child.id === comp);
    } else {
      index = this.children.indexOf(comp);
    }
    return index;
  }

  // 通过组件id获取组件
  private getCompById(id: CompId): PageComp {
    if (!id) {
      return null;
    }
    return this.children.find(child => child.id === id) as PageComp;
  }

  private getLayoutById(layoutId: string): PageLyout | null {
    if (!layoutId) {
      return null;
    }
    return this.layouts.find(child => child.id === layoutId) as PageLyout;
  }

  private getLayoutIndex(layoutId: string) {
    if (!layoutId) return -1;
    return this.layouts.findIndex(child => child.id === layoutId);
  }

  @Mutation
  setActiveComp(comp: PageComp | CompId) {
    let getComp: PageComp;
    if (typeof comp === "string") {
      getComp = this.getCompById(comp);
    } else {
      getComp = comp;
    }
    if (this.activeComp) {
      this.activeComp.config.active = false;
    }
    if (getComp) {
      getComp.config.active = true;
    }
    this.activeComp = getComp;
  }

  @Mutation
  setDragComp(comp: PureComp) {
    this.dragComp = comp;
  }

  @Mutation
  addComponent(comp: PageComponentOptions) {
    if (comp) {
      this.children.push(comp);
      // this.setActiveComp(comp);
      store.commit("page/setActiveComp", comp);
    }
  }

  @Mutation
  removeComponent(comp: PageComponentOptions | CompId) {
    if (!comp) return;
    const index = this.getCompIndex(comp);
    if (index > -1) {
      if (typeof comp === "string") {
        if (this.activeComp && this.activeComp.id === comp) {
          this.activeComp = null;
        }
      } else {
        if (this.activeComp && this.activeComp.id === comp.id) {
          this.activeComp = null;
        }
      }
      this.children.splice(index, 1);
    }
  }

  @Mutation
  refreshComponent(comp: PageComponentOptions) {
    // TODO 做节流处理
    comp.key = uuid();
  }

  @Mutation
  clearAllComponent() {
    this.children = [];
  }

  @Mutation
  refreshPage() {
    this.key = uuid();
  }

  @Mutation
  setPageConfig(data: Partial<PageConfig> = getDefaultPageConfig()) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        this[key] = data[key];
      }
    });
  }

  @Mutation
  initPageConfig() {
    const defaultState = getDefaultPageConfig();
    this.activeComp = null;
    this.dragComp = null;
    this.activeLayout = defaultState.layouts[0];
  }

  @Mutation
  setActiveLayout(layout: PageLyout | string | null) {
    if (layout == null) {
      this.activeLayout = null;
    } else if (typeof layout === "string") {
      this.activeLayout = this.getLayoutById(layout);
    } else {
      this.activeLayout = layout;
    }
    // this.setActiveComp(null);
    store.commit("page/setActiveComp", null);
  }

  @Mutation
  addLayout(layout: PageLyout) {
    if (layout) {
      this.layouts.push(layout);
      this.setActiveLayout(layout);
    }
  }

  @Mutation
  removeLayout(layoutId: string) {
    const index = this.getLayoutIndex(layoutId);
    if (index > -1) {
      this.layouts.splice(index, 1);
      this.children = this.children.filter(child => child.layoutId != layoutId);
    }
  }
}
