export default {
  config: {
    alias: "菜单",
    icon: "el-icon-star-on",
    width: 100,
    height: 100
  },
  props: {
    msg: {
      type: String,
      inputComponent1: "el-input",
      default: "hello",
      label: "消息"
    },
    color: {
      type: String,
      inputComponent: "el-color-picker",
      default: "#ffffff",
      label: "颜色"
    }
  },
  dataSource: {}
};
