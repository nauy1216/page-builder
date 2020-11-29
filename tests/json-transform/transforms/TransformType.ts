export default abstract class Transform<T> {
  abstract value: T;
  get(): T {
    return this.value;
  }
  set(value: T) {
    this.value = value;
    return this;
  }
}
