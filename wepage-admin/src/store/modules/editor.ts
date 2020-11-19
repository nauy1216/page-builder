import { Module, VuexModule, Mutation, getModule } from "vuex-module-decorators";
import store from "wepage-admin/store";

function getDefaultConfig(): EditorConfig {
  return {
    gridX: 20,
    gridY: 20,
    showGrid: true,
    showScrollbar: true,
    parent: true,
    zoom: 1,
    showLeftTool: true,
    showRightTool: true,
    dragMode: false
  };
}

const defaultConfig = getDefaultConfig();
@Module({ name: "editor", dynamic: true, namespaced: true, store })
export default class EditorModule extends VuexModule implements EditorConfig {
  gridX = defaultConfig.gridX;
  gridY = defaultConfig.gridY;
  showGrid = defaultConfig.showGrid;
  showScrollbar = defaultConfig.showScrollbar;
  parent = defaultConfig.parent;
  zoom = defaultConfig.zoom;
  showLeftTool = defaultConfig.showRightTool;
  showRightTool = defaultConfig.showRightTool;
  dragMode = defaultConfig.dragMode;

  static module() {
    return getModule(EditorModule);
  }

  get config() {
    return {
      gridX: this.gridX,
      gridY: this.gridY,
      showGrid: this.showGrid,
      showScrollbar: this.showScrollbar,
      parent: this.parent,
      zoom: this.zoom,
      showLeftTool: this.showLeftTool,
      showRightTool: this.showRightTool,
      dragMode: this.dragMode
    };
  }

  @Mutation
  setEditorConfig(data: Partial<EditorConfig> = getDefaultConfig()) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        this[key] = data[key];
      }
    });
  }
}
