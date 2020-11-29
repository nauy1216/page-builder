import { JTUtil } from "./utils";
import _ from "lodash";
import NumberTransform from "./transforms/NumberTransform";
import StringTransform from "./transforms/StringTransform";
import ObjectTransform from "./transforms/ObjectTransform";

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

  constructor(data: Record<string, any>) {
    this.context.data = data;
    this.value = null;
  }

  $string(path: string): StringTransform {
    this.value = JTUtil.getVal(path, this.context.data);
    return new StringTransform(this.value);
  }

  $number(path: string): NumberTransform {
    this.value = JTUtil.getVal(path, this.context.data);
    return new NumberTransform(this.value);
  }

  $object(path: string): ObjectTransform {
    this.value = JTUtil.getVal(path, this.context.data);
    return new ObjectTransform(this.value);
  }
}
