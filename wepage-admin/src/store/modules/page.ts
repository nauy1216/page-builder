import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import store from "wepage-admin/store";
import { uuid } from "shared/utils";

// function getDefaultLayout(): PageLyout {
//   return {
//     id: uuid(),
//     name: "默认",
//     type: "page",
//     zIndex: 0,
//     show: true,
//     mode: "position"
//   };
// }

function getDefaultPageConfig(isAppFrame?: boolean): PageConfig {
  const defaultLayout: PageLyout = isAppFrame
    ? {
        id: "appLayout",
        name: "应用框架",
        type: "app",
        zIndex: 0,
        show: true,
        mode: "position"
      }
    : {
        id: uuid(),
        name: "默认",
        type: "page",
        zIndex: 0,
        show: true,
        mode: "position"
      };
  return {
    id: uuid(),
    key: uuid(),
    alias: "",
    width: 1920,
    height: 1080,
    background: "",
    layouts: [defaultLayout], // 图层
    children: []
  };
}

const defaultPageConfig = getDefaultPageConfig();

type CompId = string;

// 获取指定组件的索引
function getCompIndex(store: PageModule, comp: PageComponentOptions | CompId) {
  if (!comp) return -1;
  let index = -1;
  if (typeof comp === "string") {
    index = store.children.findIndex(child => child.id === comp);
  } else {
    index = store.children.indexOf(comp);
  }
  return index;
}

// 通过组件id获取组件
function getCompById(store: PageModule, id: CompId): PageComp {
  if (!id) {
    return null;
  }
  return store.children.find(child => child.id === id) as PageComp;
}

function getLayoutById(store: PageModule, layoutId: string): PageLyout | null {
  if (!layoutId) {
    return null;
  }
  return store.layouts.find(child => child.id === layoutId) as PageLyout;
}

function getLayoutIndex(store: PageModule, layoutId: string) {
  if (!layoutId) return -1;
  return store.layouts.findIndex(child => child.id === layoutId);
}

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

  pageData: any = null; // 后台返回页面数据

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

  @Mutation
  setPage(page) {
    this.pageData = page;
  }

  @Mutation
  setActiveComp(comp: PageComp | CompId) {
    let getComp: PageComp;
    if (typeof comp === "string") {
      getComp = getCompById(this, comp);
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
    debugger;
    if (comp) {
      this.children.push(comp);
      // this.setActiveComp(comp);
      store.commit("page/setActiveComp", comp);
    }
  }

  @Mutation
  removeComponent(comp: PageComponentOptions | CompId) {
    if (!comp) return;
    const index = getCompIndex(this, comp);
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
      // 如果是appFrame则同步
      if (this.activeLayout!.id === "appLayout") {
        store.commit("app/setAppConfig", {
          children: this.children
        });
      }
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
  initPageConfig(isAppFrame?: boolean) {
    const defaultState = getDefaultPageConfig(isAppFrame);
    store.commit("page/setPageConfig", defaultState);
    this.activeComp = null;
    this.dragComp = null;
    this.activeLayout = defaultState.layouts[0];
  }

  @Mutation
  setActiveLayout(layout: PageLyout | string | null) {
    if (layout == null) {
      this.activeLayout = null;
    } else if (typeof layout === "string") {
      this.activeLayout = getLayoutById(this, layout);
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
    const index = getLayoutIndex(this, layoutId);
    if (index > -1) {
      this.layouts.splice(index, 1);
      this.children = this.children.filter(child => child.layoutId != layoutId);
    }
  }
}
