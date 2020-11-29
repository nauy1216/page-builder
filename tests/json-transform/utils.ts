export const JTUtil = {
  getVal(paths: string, data: Record<string, any>) {
    const pathArray = paths.split(".");
    let res: any = data,
      path: string;
    while (pathArray.length) {
      if (Object.prototype.toString.call(res) !== "[object Object]" && Object.prototype.toString.call(res) !== "[object Array]") return res;
      path = pathArray.shift()!;
      res = res[path];
    }
    return res;
  },

  appendAfter(val: string, ...after: string[]) {
    return val + after.join("");
  },

  toString(val: any) {
    return String(val);
  },

  toNumber(val: any): number {
    return Number(val);
  },

  replace(val: any, oldStr, newStr): string {
    return String(val).replace(oldStr, newStr);
  },

  concat(...val: any[]): string {
    return val.join("");
  }
};
