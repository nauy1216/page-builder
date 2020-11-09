declare interface EditorConfig {
  gridX: number; // 网格横向间隔
  gridY: number; // 网格纵向间隔
  showGrid: boolean; // 是否显示网格
  showScrollbar: boolean; // 是否显示滚动条
  parent: boolean; // 设置为true后将无法在其父元素之外拖动或调整大小的组件
  zoom: number; // 放大
  showLeftTool: boolean;
  showRightTool: boolean;
  dragMode: boolean; // 是否处于拖拽模式
}
