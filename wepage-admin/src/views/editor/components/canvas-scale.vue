<script lang="tsx">
import BaseVue from "wepage-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { EditorStore } from "wepage-admin/store/modules";

type Option = {
  label: string;
  value: number;
  divided?: boolean;
  isAdd?: boolean;
};

@Component
export default class CanvasScale extends BaseVue {
  options: Option[] = [
    { label: "放大", value: 0.1, isAdd: true },
    { label: "缩小", value: -0.1, isAdd: true },
    { label: "25%", value: 0.25, divided: true },
    { label: "50%", value: 0.5 },
    { label: "100%", value: 1 },
    { label: "200%", value: 2 }
  ];

  scale(opt: Option) {
    let zoom = EditorStore.zoom;
    if (opt.isAdd) {
      zoom += opt.value;
    } else {
      zoom = opt.value;
    }
    zoom = Math.max(0, zoom);
    EditorStore.setEditorConfig({
      zoom
    });
  }

  render() {
    return (
      <el-dropdown trigger="click">
        <span class="l-canvas-scale">
          缩放 {(EditorStore.zoom * 100).toFixed(0)}%<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          {this.options.map((item, index) => {
            return (
              <el-dropdown-item
                key={index}
                divided={item.divided}
                nativeOnClick={() => {
                  this.scale(item);
                }}>
                {item.label}
              </el-dropdown-item>
            );
          })}
        </el-dropdown-menu>
      </el-dropdown>
    );
  }
}
</script>
<style scoped lang="scss">
@import "shared/style/bem.scss";
@include b(canvas-scale) {
  margin-left: 20px;
  color: var(--font-color-gray1);
  cursor: pointer;
  &:hover {
    color: var(--theme-color);
  }
}
</style>
