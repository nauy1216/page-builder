import * as NS from "shared/typed/defineComponent";
import { ExtendProps } from "./extendProps";

const defineComponent = NS.UseMixin<ExtendProps>();
export default defineComponent;

export * from "shared/typed/defineComponent";
export type Mixin<T, U = {}, V = {}> = NS.Mixin<ExtendProps, T, U, V>;
export type PropValidator<T> = NS.PropValidator<T>;
