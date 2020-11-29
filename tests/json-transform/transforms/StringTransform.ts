import { JTUtil } from "../utils";
import Transform from "./TransformType";
import NumberTransform from "./NumberTransform";
export default class StringTransform extends Transform<string> {
  val = "";

  constructor(value?: any) {
    super();
    if (value) {
      this.val = String(value);
    }
  }

  appendAfter(...after: string[]): StringTransform {
    this.val = JTUtil.appendAfter(this.value, ...after);
    return this as any;
  }

  toNumber(): NumberTransform {
    return new NumberTransform(this.val);
  }
}
