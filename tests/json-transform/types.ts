type ValueType = string | Array<any> | "record";
interface Methods {
  string: {
    appendAfter(val: string, ...after: string[]): string;
  };
}
