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

export function isTypeOf<T>(p: any): p is T {
  if (typeof p === "string") {
    return true;
  }
  return false;
}

export function px2rem(pxValue: number | string): string {
  const htmlFontSize = process.env.VUE_APP_HTML_FONT_SIZE;
  if (isTypeOf<number>(pxValue)) {
    return pxValue / htmlFontSize + "rem";
  }
  if (/px$/.test(pxValue)) {
    pxValue = pxValue.replace(/px$/, "");
  }
  return Number(pxValue) / htmlFontSize + "rem";
}
