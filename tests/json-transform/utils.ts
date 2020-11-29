type Keys<T, A extends keyof T, B extends keyof T[A], C extends keyof T[A][B]> = [A, B, C];

function getVal(paths: string, data: Record<string, any>): any;
function getVal<T, A extends keyof T>(paths: [A], data: T): T[A];
function getVal<T, A extends keyof T, B extends keyof T[A]>(paths: [A, B], data: T): T[A][B];
function getVal<T, A extends keyof T, B extends keyof T[A], C extends keyof T[A][B]>(paths: [A, B, C], data: T): T[A][B][C];
function getVal(paths, data) {
  if (!paths) return data;
  const pathArray = Array.isArray(paths) ? paths : paths.split(".");
  let res = data,
    path: string;
  while (pathArray.length) {
    if (Object.prototype.toString.call(res) !== "[object Object]" && Object.prototype.toString.call(res) !== "[object Array]") return res;
    path = pathArray.shift()!;
    res = res[path];
  }
  return res;
}

export const JTUtil = {
  getVal,

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
