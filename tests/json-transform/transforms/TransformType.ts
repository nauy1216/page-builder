export default abstract class Transform<T> {
  abstract val: T;

  get value() {
    return this.val;
  }

  set(value: T) {
    this.val = value;
    return this;
  }
}
