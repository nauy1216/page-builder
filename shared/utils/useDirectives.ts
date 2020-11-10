type Directive = {
  name: string;
  value?: any;
  modifiers?: Record<string, boolean>;
};

// const directives = [{ name: "loading", value: this.loading }];
// useDir("loading", this.loading)
function useDir(name: string, value: any, modifiers: Record<string, boolean>): Directive {
  return { name, value, modifiers };
}
// directives({
//   loading: this.loading
// }, loading)
export function directives(dirs: Record<string, any>) {
  let directives: Directive[] = [];
  if (Object.prototype.toString.call(dirs) === "[object Object]") {
    directives = Object.keys(dirs).map(key => {
      const params = key.split(".");
      const modifiers = {};
      params.slice(1).forEach(k => {
        modifiers[k] = true;
      });
      return useDir(params[0], dirs[key], modifiers);
    });
  }
  return {
    directives
  };
}
