// app
interface App {
  id: string;
  name: string;
  create_time: string;
  update_time: string;
  desc: string;
  type: string; // 应用类型 "pc" | "h5" | "mp"height
  version: string;
  // string类型
  config: {
    // 应用公共配置，比如菜单
    type: string; // 页面类型 "pc" | "h5" | "mp"height
    width: number;
    height: number;
  };
}

/* 
创建应用
{
    name: "123",
    desc: "descdsd",
    type: "pc"
}

保存应用页面
{
 appId: 1,
 config: "",
 version: "v1.2.1",
 desc: "",
 pages: [
    {
        id: 0;
        app_id: "";
        name: "";
        desc: "";
        config: "";
        packageId: string;
        components: [
            {
                id: string;
                page_id: string;
                uuid: string;
                config: ""
            }
        ]
    }
 ]
}
*/

// page
interface Page {
  id: string;
  app_id: string;
  create_time: string;
  update_time: string;
  name: string;
  desc: string;
  // string类型
  config: {
    // 页面级别的配置
    width: number;
    height: number;
    pageStyle: {};
    componentIds: []; // 组件uuid集合
  };
}

// component
interface Component {
  id: string;
  app_id: string;
  page_id: string;
  uuid: string;
  packageId: string;
  // string类型
  config: {
    id: string;
    packageId: string;
    type: string; // 页面类型 "pc" | "h5" | "mp"height, 不同的页面类型画布的布局会不一样
    // 组件内部名称
    componentName: string;
    // 组件名称
    alias: string;
    // 组件描述
    desc: string;
    useScale: {}; // 是否根据组件的宽高自动缩放组件
    // 布局属性
    layoutConfig: {
      x: number;
      y: number;
      width: number;
      height: number;
      rotate: number;
      zIndex: number;
    };
    // 组件属性
    componentProps: {};
    // 是否使用了用户定义的模拟数据
    useMockData: boolean;
    // 测试数据
    mockData: Record<string, any> | null;
    // 临时数据
    tempData: {
      active: boolean;
      key: string;
      lockAspectRatio: boolean;
    } & Record<string, any>;
  };
}

interface Package {
  id: string;
  name: string;
  desc: string;
}

interface AppHistory extends App {
  version: string;
  historyId: string;
}

interface PageHistory extends Page {
  version: string;
  historyId: string;
}

interface ComponentHistory extends Component {
  version: string;
  historyId: string;
}

/**
说明： 
1、每保存一次，都会在AppHistory、PageHistory、ComponentHistory这三张表上多一条记录
2、只有点击按钮保存的时候才会新增一条记录， 其他情况直接更新最新的一条记录即可
3、发布的时候，将AppHistory、PageHistory、ComponentHistory这三张表最新的一条记录覆盖更新到App、Page 、Component
4、复制应用的时候， 先在AppHistory上增加一条app记录，得到新的appId, 然后将PageHistory和ComponentHistory表上的数据复制一份，
不同的是appId不同， version将变成空(因为这个时候还未发布)
*/
