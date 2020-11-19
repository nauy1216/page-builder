const config: ComponentConfig = {
  alias: "品牌矩阵",
  layoutConfig: {
    x: 0,
    y: 0,
    width: 400,
    height: 200,
    zIndex: 0
  },
  componentProps: {
    cols: {
      label: "列",
      default: 3,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    rows: {
      label: "行",
      default: 2,
      inputComponent: {
        componentName: "el-input-number",
        props: {
          controlsPosition: "right"
        }
      }
    },
    background: {
      label: "背景",
      default: "#ffffff",
      inputComponent: "el-input"
    }
  },

  mockData: {
    imgList: [
      { id: "1", name: "你我它", img: "http://10.1.1.6/wp-content/uploads/2019/09/编组-53-2.png" },
      { id: "2", name: "凯特喵", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-49.png" },
      { id: "3", name: "安安", img: "http://10.1.1.6/wp-content/uploads/2019/09/编组-46-1.png" },
      { id: "4", name: "宠颐生", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-69.png" },
      { id: "5", name: "爱玩乐", img: "http://10.1.1.6/wp-content/uploads/2019/10/%E7%BC%96%E7%BB%84-67.png" },
      { id: "6", name: "爱诺", img: "http://10.1.1.6/wp-content/uploads/2019/09/编组-45.png" },
      { id: "7", name: "瑞鹏", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-52.png" },
      { id: "8", name: "纳吉亚", img: "http://10.1.1.6/wp-content/uploads/2019/10/编组-46复制.png" },
      { id: "9", name: "美宠医和", img: "http://10.1.1.6/wp-content/uploads/2019/11/美宠医和.png" },
      { id: "10", name: "美联众合", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-48.png" },
      { id: "11", name: "芭比堂", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-51.png" },
      { id: "12", name: "凯特喵", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-49.png" },
      { id: "1", name: "你我它", img: "http://10.1.1.6/wp-content/uploads/2019/09/编组-53-2.png" },
      { id: "2", name: "凯特喵", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-49.png" },
      { id: "3", name: "安安", img: "http://10.1.1.6/wp-content/uploads/2019/09/编组-46-1.png" },
      { id: "4", name: "宠颐生", img: "http://10.1.1.6/wp-content/uploads/2019/09/%E7%BC%96%E7%BB%84-69.png" },
      { id: "5", name: "爱玩乐", img: "http://10.1.1.6/wp-content/uploads/2019/10/%E7%BC%96%E7%BB%84-67.png" }
    ]
  }
};

export default config;
