import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import { AppConfig } from "wepage-web/types/appConfig";
import FrameMessage from "shared/utils/message";
import ajax from "shared/utils/ajax";
import { getAppId, getPageId } from "shared/utils/app";
import api from "wepage-web/api";
const frameMessage = new FrameMessage("wepage-web", window.top);

Vue.use(Vuex);

const state = {
  isFrame: window.top !== window,
  appConfig: {} as AppConfig,
  pageConfig: null as any
};
const mutations = {
  setAppConfig(state: State, config: AppConfig) {
    state.appConfig = Object.assign({}, config);
  },
  setPageConfig(state: State, config: any) {
    state.pageConfig = config;
  }
};

const getters = {};
const actions = {
  getPageConfig(context) {
    const appId = getAppId();
    const pageId = getPageId();
    if (!context.state.isFrame) {
      ajax("get", api.getPageConfig, {
        appId,
        pageId
      }).then(res => {
        if (res.data.config) {
          context.commit("setPageConfig", JSON.parse(res.data.config));
        }
      });
    } else {
      frameMessage
        .getData("getPageConfig", {
          appId,
          pageId
        })
        .then(res => {
          context.commit("setPageConfig", (res as any).data);
        });
    }
  }
};
export type State = typeof state;
export type Mutations = typeof mutations;
export type Getters = typeof getters;
export type Actions = typeof actions;

const store = new Vuex.Store<State>({
  state,
  mutations: mutations as MutationTree<State>,
  getters,
  actions,
  modules: {}
});

export default store;
