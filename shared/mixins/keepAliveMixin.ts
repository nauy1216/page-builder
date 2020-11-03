// 进入指定的路由缓存
export default function(paths: string[]) {
  let instance;
  return {
    beforeRouteEnter(to, from, next) {
      to.meta.keepAlive = true;
      next(vm => {
        instance = vm;
      });
    },
    beforeRouteLeave(to, from, next) {
      if (!(Array.isArray(paths) && paths.indexOf(to.path) > -1)) {
        instance && instance.$destroy();
        instance = null;
      }
      next();
    }
  };
}
