<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore, EditorStore } from "wepage-admin/store/modules";

@Component
export default class PageOperate extends BaseVue {
  created() {
    this.$watch(
      () => {
        return PageStore.width + " " + PageStore.height;
      },
      () => {
        PageStore.refreshPage();
      }
    );
  }

  get pageConfig() {
    return { ...PageStore };
  }

  get editorConfig() {
    return { ...EditorStore };
  }

  render() {
    return (
      <el-form label-position="top" label-width="300px">
        <el-form-item label="页面名称">
          <el-input
            value={PageStore.alias}
            onInput={alias => {
              PageStore.setPageConfig({ alias });
            }}></el-input>
        </el-form-item>
        <el-form-item label="页面宽度(px)">
          <el-input-number
            controls-position="right"
            value={PageStore.width}
            onInput={width => {
              PageStore.setPageConfig({ width });
            }}
            precision={2}
            step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="页面高度(px)">
          <el-input-number
            controls-position="right"
            value={PageStore.height}
            onInput={height => {
              PageStore.setPageConfig({ height });
            }}
            precision={2}
            step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="页面背景">
          <el-input
            value={PageStore.background}
            onInput={background => {
              PageStore.setPageConfig({ background });
            }}></el-input>
        </el-form-item>
        <el-form-item label="网格宽度(px)">
          <el-input-number
            controls-position="right"
            value={EditorStore.gridX}
            onInput={gridX => {
              EditorStore.setEditorConfig({ gridX });
            }}
            precision={0}
            step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="网格高度(px)">
          <el-input-number
            controls-position="right"
            value={EditorStore.gridY}
            onInput={gridY => {
              EditorStore.setEditorConfig({ gridY });
            }}
            precision={0}
            step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="缩放">
          <el-input-number
            controls-position="right"
            value={EditorStore.zoom}
            onInput={zoom => {
              EditorStore.setEditorConfig({ zoom });
            }}
            min={0.1}
            max={10}
            precision={1}
            step={0.1}></el-input-number>
        </el-form-item>
        <el-form-item label="不超出画布">
          <el-switch
            value={EditorStore.parent}
            onInput={parent => {
              EditorStore.setEditorConfig({ parent });
            }}></el-switch>
        </el-form-item>
      </el-form>
    );
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-form-item.el-form-item--mini {
  margin-bottom: 5px !important;
}
/deep/.el-form-item__label {
  padding-bottom: 0 !important;
}
</style>
