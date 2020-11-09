import { getModule } from "vuex-module-decorators";
import PageModule from "./page";
import EditorModule from "./editor";

export const PageStore = getModule(PageModule);
export const EditorStore = getModule(EditorModule);
