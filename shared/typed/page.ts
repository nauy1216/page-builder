type LayoutMode = "position" | "response" | "h5";
declare interface PageConfig {
  id: string;
  key: string;
  alias: string; // 页面别名
  width: number; // 页面设计稿宽度
  height: number; // 页面设计稿高度
  background?: string; // 页面背景
  layouts: PageLyout[]; // 页面图层
  children: PageComponentOptions[]; // 页面组件
}

declare interface PageLyout {
  id: string;
  key?: string;
  name: string; // 图层名称
  type: "app" | "page";
  zIndex: number; // 图层层级
  show: boolean; // 是否显示
  mode: LayoutMode; // 图层模式
}

declare interface PageComponentOptions {
  id: string;
  // key: string;
  layoutId: string; // 所属图层
  name: string; // 组件名称
  alias: string; // 组件别名， 用于展示
  layoutConfig: PageComponentOptionsConfig; // 组件配置对象用于组件布局
  componentProps: Record<string, any>; // 组件内部定义的属性
  // 是否使用了用户定义的模拟数据
  useMockData: boolean;
  // 测试数据
  mockData: Record<string, any> | null;
  // 临时数据
  tempData: {
    active: boolean;
    key: string;
  } & Record<string, any>;
}

// declare type CustomVueConstructor = VueConstructor & Record<string, any>;
declare type CustomVueConstructor = Record<string, any>;
declare type PureComp = CustomVueConstructor | null;
declare type PageComp = PageComponentOptions | null;

declare interface PageComponentOptionsConfig {
  x: number; // 组件左上角在页面的x坐标
  y: number; // 组件左上角在页面的x坐标
  width: number; // 组件的宽度
  height: number; // 组件的高度
  minWidth?: number; // 组件的最小宽度
  minHeight?: number; // 组件的最小高度
  maxWidth?: number; // 组件的最大宽度
  maxHeight?: number; // 组件的最大高度
  // active?: boolean; // 当前组件是否处于激活状态
  zIndex?: number; // 层级
  // lockAspectRatio?: boolean; // 用于在调整大小期间保持组件的宽高比
  // isConflictCheck?: boolean; // 冲突检测
}
