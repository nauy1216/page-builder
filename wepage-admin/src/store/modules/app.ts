import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import store from "wepage-admin/store";

function getDefaultConfig(): AppConfig {
  return {
    id: "",
    appName: "",
    appType: "",
    designHeight: 0,
    designWidth: 0,
    appComponents: []
  };
}
const defaultConfig = getDefaultConfig();
@Module({ name: "app", dynamic: true, namespaced: true, store })
export default class AppModule extends VuexModule implements AppConfig {
  id = defaultConfig.id;
  appName = defaultConfig.appName;
  appType = defaultConfig.appType;
  designHeight = defaultConfig.designHeight;
  designWidth = defaultConfig.designWidth;
  appComponents = defaultConfig.appComponents;

  @Mutation
  setAppConfig(data: Partial<AppConfig>) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        this[key] = data[key];
      }
    });
  }
}
