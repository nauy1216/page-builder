import _ from "lodash";

// ===========全局变量=============
const INTERNAL_PREFIX = "internal_";

export const EnvironmentVars = {
  $e: "$e",
  $i: "$i"
};
export const $e = "$e";
export const $i = "$i";

const Context: {
  isCreateElement: boolean;
  data: any;
  vars: Record<string, any>;
  $e: any | undefined;
  $i: number;
} = {
  isCreateElement: false,
  data: null,
  vars: {},
  $e: undefined,
  $i: 0
};

// ===========核心处理器=============
// 全局获取变量值
export function $(paths: string, data: Record<string, any> = Context.data) {
  if (Context.isCreateElement) {
    return [`${INTERNAL_PREFIX}getValue`, paths];
  }
  const pathArray = paths.split(".");
  let res = data,
    path: string;
  while (pathArray.length) {
    if (Object.prototype.toString.call(res) !== "[object Object]" && Object.prototype.toString.call(res) !== "[object Array]") return res;
    path = pathArray.shift()!;
    res = res[path];
  }
  return res;
}

// 定义变量
export function $defineVar(name: string, value: any) {
  debugger;
  if (Context.isCreateElement) {
    return [`${INTERNAL_PREFIX}defineVar`, name, value];
  } else {
    Context.vars[name] = value;
  }
}

// 获取义变量
export function $getVar(path: string) {
  debugger;
  if (Context.isCreateElement) {
    return [`${INTERNAL_PREFIX}getVar`, path];
  } else {
    return $(Context.vars[name], Context.vars);
  }
}

export function $call(func: Function, ...args: any[]) {
  if (Context.isCreateElement) {
    return [`${INTERNAL_PREFIX}call`, func, args];
  } else {
    return () => {
      func.apply({}, args);
    };
  }
}

// 函数
export function $func(...funcs: ReturnType<typeof $call>[]) {
  debugger;
  if (Context.isCreateElement) {
    return [`${INTERNAL_PREFIX}func`, ...funcs];
  } else {
    return function() {
      for (const func of funcs) {
        if ((func as any).__isReturn) {
          return (func as Function)();
        } else {
          (func as Function)();
        }
        // if (Array.isArray(child)) {
        //   const func = child[0];
        //   const funcArgs = child.slice(1);
        //   if ((func as any).__isReturn) {
        //     return func.apply({}, funcArgs);
        //   } else {
        //     func.apply({}, funcArgs);
        //   }
        // }
      }
    };
  }
}
$func.__isFunc = true;

// 返回值
function $return(returnVal) {
  if (Context.isCreateElement) {
    return [`${INTERNAL_PREFIX}return`, returnVal];
  } else {
    return () => {
      return returnVal;
    };
  }
}
$return.__isReturn = true;

// 局部获取变量值
export function $scope(path: string) {
  return [`${INTERNAL_PREFIX}getScopeValue`, path];
}

export function $map(arr: any[], callback: (data: any, index) => any): any[] {
  debugger;
  return arr.map((item, index) => {
    Context[EnvironmentVars.$e] = item;
    Context[EnvironmentVars.$i] = index;
    return callback(item, index);
  });
}

// =================扩展处理器=====================
function appendAfter(val: any, after: string) {
  return val + String(after);
}

function toString(val: any) {
  return String(val);
}

function toNumber(val: any): number {
  return Number(val);
}

function replace(val: any, oldStr, newStr): string {
  return String(val).replace(oldStr, newStr);
}

function concat(...val: any[]): string {
  return val.join("");
}

export function compilper(transform: string) {
  transform;
}

export default function transform(data: any, transform: string) {
  Context.data = data;
  const res = eval(`(${transform})`);
  return res;
}
