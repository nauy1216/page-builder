import { Module, VuexModule, Mutation, getModule } from "vuex-module-decorators";
import store from "wepage-admin/store";
import ajax from "shared/utils/ajax";
import api from "wepage-admin/api";

function getDefaultConfig(): AppConfig {
  return {
    children: []
  };
}

@Module({ name: "app", dynamic: true, namespaced: true, store })
export default class AppModule extends VuexModule implements AppConfig {
  children: PageComponentOptions[];
  appData: any;

  constructor() {
    super({});
    const defaultConfig = getDefaultConfig();
    this.children = defaultConfig.children;
    this.appData = {};
  }

  static module() {
    return getModule(AppModule);
  }

  get config() {
    return {
      children: this.children
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

  @Mutation
  initApp(appId: string) {
    ajax("get", api.getApp, {
      appId
    }).then(res => {
      delete res.data.pages;
      AppModule.module().setApp(res.data);
      try {
        if (res.data.config) {
          const config = JSON.parse(res.data.config);
          AppModule.module().setAppConfig({
            children: config.children
          });
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
