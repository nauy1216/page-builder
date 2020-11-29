import _ from "lodash";
console.log("lodash", _);

function isPlainObject(v: any): v is Record<string, any> {
  return Object.prototype.toString.call(v) === "[object Object]";
}

const INTERNAL_PREFIX = "internal_";

type ProcessorNodeAttr = string | number | ProcessorNode | Record<string, ProcessorNode>;
type ProcessorNode<Attr = {}> = [string, ...(ProcessorNodeAttr | Attr)[]];

export function createProcessor<T extends (...args: any[]) => any>(type: string): T {
  return function(...children: any[]): any {
    const node = [type, ...children];
    return node;
  } as T;
}

export const processor = {
  appendAfter: createProcessor("appendAfter"),
  toString: createProcessor("toString"),
  concat: createProcessor("concat"),
  toNumber: createProcessor("toNumber"),
  replace: createProcessor("replace"),
  map(arr: any[], ...children: ProcessorNode[]): ProcessorNode<any[]> {
    return [`map`, arr, ...children];
  },
  // 全局获取变量值
  $(path: string): ProcessorNode {
    return [`${INTERNAL_PREFIX}getValue`, path];
  },
  // 局部获取变量值
  $scope(path: string): ProcessorNode {
    return [`${INTERNAL_PREFIX}getScopeValue`, path];
  },
  // 定义变量
  $defineVar(name: string, value: any): ProcessorNode {
    return [`${INTERNAL_PREFIX}defineVar`, name, value];
  },
  // 获取义变量
  $getVar(path: string): ProcessorNode {
    return [`${INTERNAL_PREFIX}getVar`, path];
  },
  // 函数
  $func(...children: ProcessorNode[]): ProcessorNode {
    return [`${INTERNAL_PREFIX}func`, ...children];
  },
  // 返回值
  $return(returnVal: Record<string, ProcessorNode> | number | string): ProcessorNode {
    return [`${INTERNAL_PREFIX}return`, returnVal];
  }
};

export const EnvironmentVars = {
  $e: "$e",
  $i: "$i"
};

class BaseJsonTransform {
  // 上下文用于保存临时变量
  readonly context: Record<string, any> = {};

  constructor() {
    this.context = {};
  }

  getValue(paths: string, data: Record<string, any>): any {
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

  private processFunc(nodeChildren) {
    return (data: any) => {
      debugger;
      this.transform(nodeChildren.slice(0, nodeChildren.length - 1), data);
      return this.transformValue(nodeChildren[nodeChildren.length - 1] as any, data);
    };
  }

  private processDefineVar(nodeChildren) {
    // debugger;
    const [varName, varVal] = nodeChildren;
    this.context[varName] = varVal;
  }

  private processGetVar(nodeChildren) {
    // debugger;
    const varName = nodeChildren[0];
    // 如果值是环境变量
    if (this.context[varName] && EnvironmentVars[this.context[varName]]) {
      // debugger;
      return this.context[this.context[varName]];
    }
    return this.getValue(varName, this.context);
  }

  private processGetValue(nodeChildren, data) {
    // debugger;
    return this.getValue(nodeChildren[0], data);
  }

  private processReturn(nodeChildren, data) {
    // 返回值可能是对象、数组、基本类型
    return this.transform(nodeChildren, data);
  }

  private transformValue(node: ProcessorNode, data: Record<string, any>) {
    if (Array.isArray(node)) {
      const nodeType = node[0];
      const nodeChildren = node.slice(1);
      if (nodeType.indexOf(INTERNAL_PREFIX) > -1) {
        // 内置processor
        const funcName = nodeType.replace(INTERNAL_PREFIX, "");
        switch (funcName) {
          // 获取值
          case "getValue": {
            return this.processGetValue(nodeChildren, data);
          }
          // 函数
          case "func": {
            return this.processFunc(nodeChildren);
          }
          case "return": {
            return this.processReturn(nodeChildren[0], data);
          }
          // 定义变量
          case "defineVar": {
            return this.processDefineVar(nodeChildren);
          }
          // 获取变量
          case "getVar": {
            return this.processGetVar(nodeChildren);
          }
        }
      } else if (typeof this[nodeType] === "function") {
        const children = nodeChildren.map(childNode => {
          if (typeof childNode !== "string" && typeof childNode !== "number") {
            if (Array.isArray(childNode)) {
              return this.transformValue(childNode, data);
            } else {
              return this.transform(childNode, data);
            }
          }
          return childNode;
        });
        return this[nodeType].call(this, ...children);
      } else {
        // 如果是未知的processor, 那么可能就是用户定义的数据
        // throw new Error(`未知的processor ${nodeType}`);
        return node;
      }
    } else if (isPlainObject(node)) {
      return this.transform(node, data);
    } else {
      return node;
    }
  }

  transform(transfromMap: Record<string, any>, data: Record<string, any>) {
    if (!Array.isArray(data) && Object.prototype.toString.call(data) !== "[object Object]") {
      // eslint-disable-next-line
      console.log(`data的只能是数组或对象`);
      return null;
    }
    const isArry = Array.isArray(data);
    let value: any = null;
    const res: any = isArry ? [] : {};
    Object.keys(transfromMap).forEach(key => {
      if (typeof transfromMap[key] === "string") {
        value = transfromMap[key];
      } else {
        const processorNode = transfromMap[key];
        value = this.transformValue(processorNode, data);
      }
      if (isArry) {
        res.push(value);
      } else {
        res[key] = value;
      }
    });
    return res;
  }
}

export default class JsonTransform extends BaseJsonTransform {
  appendAfter(val: any, after: string) {
    return val + String(after);
  }

  toString(val: any) {
    return String(val);
  }

  toNumber(val: any): number {
    return Number(val);
  }

  replace(val: any, oldStr, newStr): string {
    return String(val).replace(oldStr, newStr);
  }

  concat(...val: any[]): string {
    return val.join("");
  }

  map(this: JsonTransform, arr: any[], callback: (data: any, index) => any): any[] {
    return arr.map((item, index) => {
      this.context[EnvironmentVars.$e] = item;
      this.context[EnvironmentVars.$i] = index;
      return callback(item, index);
    });
  }
}
