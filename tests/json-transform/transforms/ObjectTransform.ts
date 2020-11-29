import Transform from "./TransformType";

export default class ObjectTransform extends Transform<Record<string, any>> {
  value = {};

  constructor(value?: any) {
    super();
    if (value) {
      this.value = value;
    }
  }

  toString() {
    //
  }
}
