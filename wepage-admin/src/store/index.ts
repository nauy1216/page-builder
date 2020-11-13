import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store<{
  page: PageConfig;
  app: AppConfig;
  editor: EditorConfig;
}>({
  state: {} as any,
  mutations: {},
  actions: {},
  modules: {}
});

export type State = any;
export type Mutations = any;
export type Getters = any;
export type Actions = any;
