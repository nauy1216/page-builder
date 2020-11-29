// import { JTUtil } from "../utils";
import Transform from "./TransformType";
import StringTransform from "./StringTransform";
export default class NumberTransform extends Transform<number> {
  val!: number;

  constructor(value?: any) {
    super();
    if (value) {
      this.val = Number(value);
    }
  }

  toString(): StringTransform {
    return new StringTransform(this.val);
  }
}
