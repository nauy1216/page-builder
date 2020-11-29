import JsonTransform from "./BaseJsonTransform";
export { JTUtil } from "./utils";

export function newJsonTransform(data) {
  return function(path: string) {
    const jt = new JsonTransform(data);
    return jt.$(path);
  };
}

export default function transform(data: any, transform: string) {
  // eslint-disable-next-line
  const jt = new JsonTransform(data)
  // eslint-disable-next-line
  const $ = function(path: string) {
    return jt.$(path);
  };
  const res = eval(`(${transform})`);
  return res;
}
