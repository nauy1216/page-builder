export function uuid() {
  return String(+new Date()) + parseInt("" + Math.random() * 10000);
}

export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function serialize(obj) {
  let str = "";
  if (obj == null || obj == undefined) {
    return str;
  }

  Object.keys(obj).forEach(function(key) {
    str += `${key}=${obj[key]}&`;
  });

  return str.slice(0, -1);
}

export * from "./useDirectives";

type VarType = "String" | "Number" | "Boolean" | "Undefined" | "Null";
function getType(v: any): string {
  return Object.prototype.toString.call(v);
}
export function isTypeOf<T>(type: VarType, v: any): v is T {
  if (getType(v) === type) {
    return true;
  }
  return false;
}

export function px2rem(pxValue: number | string): string {
  const htmlFontSize = process.env.VUE_APP_HTML_FONT_SIZE;
  if (isTypeOf<number>("Number", pxValue)) {
    return (pxValue / htmlFontSize).toFixed(8) + "rem";
  }
  if (/rem$/.test(pxValue)) {
    return pxValue;
  }
  if (/px$/.test(pxValue)) {
    pxValue = pxValue.replace(/px$/, "");
  }
  return (Number(pxValue) / htmlFontSize).toFixed(8) + "rem";
}
