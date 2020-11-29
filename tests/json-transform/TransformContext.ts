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

// type bool = 0 | 1;

export default class JsonTransform {
  isCreateElement = false;
  data: any = null;
  vars: Record<string, any> = {};
  $e: any | undefined = undefined;
  $i = 0;

  constructor(data: Record<string, any>) {
    this.data = data;
  }

  //   $string(path: string, isPath: bool = 1): StringTransform {
  //     const value = isPath ? JTUtil.getVal(path, this.context.data) : path;
  //     return new StringTransform(value);
  //   }

  //   $number(path: string, isPath: bool = 1): NumberTransform {
  //     const value = isPath ? JTUtil.getVal(path, this.context.data) : path;
  //     return new NumberTransform(value);
  //   }

  //   $object(path: string, isPath: bool = 1): ObjectTransform {
  //     const value = isPath ? JTUtil.getVal(path, this.context.data) : path;
  //     return new ObjectTransform(value);
  //   }

  //   $var(name: string, value: any) {
  //     if (this.context.isCreateElement) {
  //       return [`$var`, name, value];
  //     } else {
  //       this.context.vars[name] = value;
  //     }
  //   }

  //   $getVar(path: string) {
  //     if (this.context.isCreateElement) {
  //       return [`$getVar`, path];
  //     } else {
  //       return JTUtil.getVal(path, this.context);
  //     }
  //   }

  //   $call(func: Function, ...args: any[]) {
  //     if (this.context.isCreateElement) {
  //       return [`$call`, func, args];
  //     } else {
  //       return () => {
  //         func.apply({}, args);
  //       };
  //     }
  //   }

  //   $func(...funcs: any[]) {
  //     if (this.context.isCreateElement) {
  //       return [`$func`, ...funcs];
  //     } else {
  //       return function() {
  //         for (const func of funcs) {
  //           if ((func as any).__isReturn) {
  //             return (func as Function)();
  //           } else {
  //             (func as Function)();
  //           }
  //         }
  //       };
  //     }
  //   }

  //   $return(returnVal) {
  //     if (this.context.isCreateElement) {
  //       return [`$return`, returnVal];
  //     } else {
  //       return () => {
  //         return returnVal;
  //       };
  //     }
  //   }
}
