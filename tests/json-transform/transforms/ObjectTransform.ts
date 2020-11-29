import Transform from "./TransformType";

export default class ObjectTransform extends Transform<Record<string, any>> {
  val = {};

  constructor(value?: any) {
    super();
    if (value) {
      this.val = value;
    }
  }

  toString() {
    //
  }
}
