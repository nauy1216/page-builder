import { JTUtil } from "./utils";
import _ from "lodash";
import NumberTransform from "./transforms/NumberTransform";
import StringTransform from "./transforms/StringTransform";

export const EnvironmentVars = {
  $e: "$e",
  $i: "$i"
};
export const $e = "$e";
export const $i = "$i";

type Context = {
  isCreateElement: boolean;
  data: any;
  vars: Record<string, any>;
  $e: any | undefined;
  $i: number;
};

export default class JsonTransform {
  protected context: Context = {
    isCreateElement: false,
    data: null,
    vars: {},
    $e: undefined,
    $i: 0
  };

  protected value: any = null;
  protected stringTransform!: StringTransform;
  protected numberTransform!: NumberTransform;

  constructor(data: Record<string, any>) {
    this.context.data = data;
    this.value = null;
    this.stringTransform = new StringTransform();
    this.numberTransform = new NumberTransform();
  }

  $(path: string) {
    this.value = JTUtil.getVal(path, this.context.data);
    return this;
  }

  $string(path: string): StringTransform {
    this.value = JTUtil.getVal(path, this.context.data);
    this.stringTransform.set(this.value);
    return this.stringTransform;
  }

  $number(path: string) {
    this.value = JTUtil.getVal(path, this.context.data);
    this.numberTransform.set(this.value);
    return this.numberTransform;
  }

  get() {
    return this.value;
  }
}
