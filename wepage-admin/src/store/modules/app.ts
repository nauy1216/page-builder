import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import store from "wepage-admin/store";

function getDefaultConfig(): AppConfig {
  return {
    appComponents: []
  };
}
const defaultConfig = getDefaultConfig();
@Module({ name: "app", dynamic: true, namespaced: true, store })
export default class AppModule extends VuexModule implements AppConfig {
  appComponents: PageComponentOptions[] = defaultConfig.appComponents;
  appData: any = {};

  get config() {
    return {
      appComponents: JSON.stringify(this.appComponents)
    };
  }

  @Mutation
  setApp(data) {
    this.appData = data;
  }

  @Mutation
  setAppConfig(data: AppConfig) {
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        this[key] = data[key];
      }
    });
  }
}
