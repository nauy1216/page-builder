import { getModule } from "vuex-module-decorators";
import PageModule from "./page";
import EditorModule from "./editor";
import AppModule from "./app";

export const PageStore = getModule(PageModule);
export const EditorStore = getModule(EditorModule);
export const AppStore = getModule(AppModule);
