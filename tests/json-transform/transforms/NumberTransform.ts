// import { JTUtil } from "../utils";
import Transform from "./TransformType";
import StringTransform from "./StringTransform";
export default class NumberTransform extends Transform<number> {
  value!: number;

  constructor(value?: any) {
    super();
    if (value) {
      this.value = Number(value);
    }
  }

  toString(): StringTransform {
    return new StringTransform(this.value);
  }
}
