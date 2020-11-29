import _ from "lodash";
import JsonTransform from "./json-transform copy";

// ===========全局变量=============
const INTERNAL_PREFIX = "internal_";

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

export class JTUtil {
  static getVal(paths: string, data: Record<string, any>) {
    const pathArray = paths.split(".");
    let res: any = data,
      path: string;
    while (pathArray.length) {
      if (Object.prototype.toString.call(res) !== "[object Object]" && Object.prototype.toString.call(res) !== "[object Array]") return res;
      path = pathArray.shift()!;
      res = res[path];
    }
    return res;
  }

  static appendAfter(val: string, ...after: string[]) {
    return val + after.join("");
  }

  static toString(val: any) {
    return String(val);
  }

  static toNumber(val: any): number {
    return Number(val);
  }

  static replace(val: any, oldStr, newStr): string {
    return String(val).replace(oldStr, newStr);
  }

  static concat(...val: any[]): string {
    return val.join("");
  }
}

export class BaseJsonTransform {
  context: Context = {
    isCreateElement: false,
    data: null,
    vars: {},
    $e: undefined,
    $i: 0
  };

  private value: any = undefined;

  constructor(data: Record<string, any>) {
    this.context.data = data;
  }

  $(path: string) {
    this.value = JTUtil.getVal(path, this.context.data);
    return this;
  }

  val() {
    return this.value;
  }

  static newJsonTransform(data) {
    return function(path: string) {
      const jt = new JsonTransform(data);
      return jt.$(path);
    };
  }
}

export class JsonTransform extends BaseJsonTransform {
  constructor(data) {
    super(data);
  }
}

export default function transform(data: any, transform: string) {
  // eslint-disable-next-line
  const jt = new JsonTransform(data)
  // eslint-disable-next-line
  const $ = function(path: string) {
    return jt.$(path);
  };
  const res = eval(`(${transform})`);
  return res;
}
