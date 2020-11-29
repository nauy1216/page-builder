import TransformContext from "./TransformContext";
import { JTUtil } from "./utils";
import NumberTransform from "./transforms/NumberTransform";
import StringTransform from "./transforms/StringTransform";
import ObjectTransform from "./transforms/ObjectTransform";

type bool = 0 | 1;

export function newJsonTransform(data) {
  const context = new TransformContext(data);

  function $string(path: string, isPath: bool = 1): StringTransform {
    const value = isPath ? JTUtil.getVal(path, context.data) : path;
    return new StringTransform(value);
  }

  function $number(path: string, isPath: bool = 1): NumberTransform {
    const value = isPath ? JTUtil.getVal(path, context.data) : path;
    return new NumberTransform(value);
  }

  function $object(path: string, isPath: bool = 1): ObjectTransform {
    const value = isPath ? JTUtil.getVal(path, context.data) : path;
    return new ObjectTransform(value);
  }

  function $var(name: string, value: any) {
    if (context.isCreateElement) {
      return [`$var`, name, value];
    } else {
      context.vars[name] = value;
    }
  }

  function $getVar(path: string) {
    if (context.isCreateElement) {
      return [`$getVar`, path];
    } else {
      return JTUtil.getVal(path, context);
    }
  }

  function $call(func: Function, ...args: any[]) {
    if (context.isCreateElement) {
      return [`$call`, func, args];
    } else {
      return () => {
        func.apply({}, args);
      };
    }
  }

  function $func(...funcs: ReturnType<typeof $call>[]) {
    if (context.isCreateElement) {
      return [`$func`, ...funcs];
    } else {
      return function() {
        for (const func of funcs) {
          if ((func as any).__isReturn) {
            return (func as Function)();
          } else {
            (func as Function)();
          }
        }
      };
    }
  }
  $func.__isFunc = true;

  function $return(returnVal) {
    if (context.isCreateElement) {
      return [`$return`, returnVal];
    } else {
      return () => {
        return returnVal;
      };
    }
  }
  $return.__isReturn = true;

  return {
    $string,
    $number,
    $object,
    $var,
    $getVar,
    $call,
    $func,
    $return,
    _: JTUtil
  };
}

export default function transform(data: any, transform: string) {
  // eslint-disable-next-line
  const { $string, $number, $object,  _ } = newJsonTransform(data);
  const res = eval(`(${transform})`);
  return res;
}
