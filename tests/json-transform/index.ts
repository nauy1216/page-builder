import JsonTransform from "./BaseJsonTransform";
import { JTUtil } from "./utils";

export function newJsonTransform(data) {
  const jt = new JsonTransform(data);
  return {
    $: jt.$.bind(jt),
    $string: jt.$string.bind(jt),
    $number: jt.$number.bind(jt),
    _: JTUtil
  };
}

export default function transform(data: any, transform: string) {
  // eslint-disable-next-line
  const { $string, $number, $, _ } = newJsonTransform(data);
  const res = eval(`(${transform})`);
  return res;
}
