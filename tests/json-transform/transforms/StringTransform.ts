import { JTUtil } from "../utils";
import Transform from "./TransformType";
export default class StringTransform extends Transform<string> {
  value = "";

  appendAfter(...after: string[]): StringTransform {
    this.value = JTUtil.appendAfter(this.value, ...after);
    return this as any;
  }
}
