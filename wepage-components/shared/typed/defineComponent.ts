import Vue from "vue";
import * as VueOptions from "vue/types/options";

type DataDef<Data, Props, V> = Data | ((this: Readonly<Props> & V) => Data);
export type RecordPropsDefinition<T> = {
  [K in keyof T]: VueOptions.PropValidator<T[K]>;
};
type CombinedVueInstance<Instance extends Vue, Data, Methods, Computed, Props, ExtendProps> = Data & Methods & Computed & Props & Instance & ExtendProps;
type ThisTypedWithInterface<Data, Methods, Computed, Props, ExtendProps, V extends Vue = Vue> = object &
  VueOptions.ComponentOptions<V, DataDef<Data, Props, V>, Methods, Computed, RecordPropsDefinition<Props>, Props> &
  ThisType<CombinedVueInstance<V, Data, Methods, Computed, Readonly<Props>, ExtendProps>>;

export function UseMixin<ExtendProps>() {
  return function defineComponent<Data, Methods, Computed, Props, V extends Vue = Vue>(options?: ThisTypedWithInterface<Data, Methods, Computed, Props, ExtendProps, V>) {
    return Vue.extend<Data, Methods, Computed, Props>(options as any);
  };
}

export type PropValidator<T> = VueOptions.PropValidator<T>;

type ComputedType = VueOptions.ComputedOptions<any> | (() => any);
type ComputedTypeGet<T extends VueOptions.ComputedOptions<any>> = T["get"];
type InferComputed<T extends { [key: string]: ComputedType } | undefined> = {
  [K in keyof T]: T[K] extends () => any ? ReturnType<T[K]> : ComputedTypeGet<T[K]> extends () => any ? ReturnType<ComputedTypeGet<T[K]>> : any;
};

type InferData<T> = T extends (...args: any) => any ? ReturnType<T> : T extends undefined ? {} : T;

type InferProps<T> = {
  [K in keyof T]: T[K] extends VueOptions.PropOptions<infer U> ? U : any;
};

type InferMixin<T extends VueOptions.ComponentOptions<Vue>> = T["methods"] & InferProps<T["props"]> & InferData<T["data"]> & InferComputed<T["computed"]>;

export type Mixin<ExtendProps, T = {}, U = {}, V = {}> = ExtendProps & InferMixin<T> & InferMixin<U> & InferMixin<V>;
