// 定义组件配置接口, 编辑器使用
type ComponentConfig = {
  alias: string;
  layoutConfig: PageComponentOptions["layoutConfig"];
  componentProps: PackageComponentProps<PageComponentOptions["componentProps"]>;
  mockData: PageComponentOptions["mockData"];
  checkData: any;
};

type PackageComponentProps<T> = {
  [K in keyof T]: {
    default: T[K];
    label: string;
    inputComponent:
      | string
      | {
          componentName: string;
          props?: Record<string, any>;
        };
  };
};
