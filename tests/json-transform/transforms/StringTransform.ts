import { JTUtil } from "../utils";
import Transform from "./TransformType";
import NumberTransform from "./NumberTransform";
export default class StringTransform extends Transform<string> {
  value = "";

  constructor(value?: any) {
    super();
    if (value) {
      this.value = String(value);
    }
  }

  appendAfter(...after: string[]): StringTransform {
    this.value = JTUtil.appendAfter(this.value, ...after);
    return this as any;
  }

  toNumber(): NumberTransform {
    return new NumberTransform(this.value);
  }
}
