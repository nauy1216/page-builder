import _ from "lodash";

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

export default class TransformContext<T> {
  isCreateElement = false;
  data: T;
  vars: Record<string, any> = {};
  $e: any | undefined = undefined;
  $i = 0;

  constructor(data: T) {
    this.data = data;
  }
}
