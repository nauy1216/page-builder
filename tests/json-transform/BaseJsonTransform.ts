import { JTUtil } from "./utils";
import _ from "lodash";

// const INTERNAL_PREFIX = "internal_";

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

function defineTransform<T>(obj) {
  return obj;
}

type StringTransform = ThisType<{
  value: string;
}>;

const stringTransform: StringTransform = {
  appendAfter(...after: string[]): StringTransform {
    JTUtil.appendAfter(this.value, ...after);
    return this;
  }
};

type NumberTransform = {
  value: number;
};

const numberTransform = defineTransform({
  appendAfter(this: NumberTransform): NumberTransform {
    return this;
  }
});

export default class BaseJsonTransform extends Object.create(stringTransform) {
  context: Context = {
    isCreateElement: false,
    data: null,
    vars: {},
    $e: undefined,
    $i: 0
  };

  protected value: any = null;

  constructor(data: Record<string, any>) {
    super();
    this.context.data = data;
  }

  $<T extends BaseJsonTransform>(path: string): T {
    this.value = JTUtil.getVal(path, this.context.data);
    return this as any;
  }

  val() {
    return this.value;
  }
}
