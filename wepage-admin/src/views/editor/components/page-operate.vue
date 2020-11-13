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
          <el-input vModel={this.pageConfig.alias}></el-input>
        </el-form-item>
        <el-form-item label="页面宽度(px)">
          <el-input-number controls-position="right" vModel={this.pageConfig.width} precision={2} step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="页面高度(px)">
          <el-input-number controls-position="right" vModel={this.pageConfig.height} precision={2} step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="页面背景">
          <el-input vModel={this.pageConfig.background}></el-input>
        </el-form-item>
        <el-form-item label="网格宽度(px)">
          <el-input-number controls-position="right" vModel={this.editorConfig.gridX} precision={0} step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="网格高度(px)">
          <el-input-number controls-position="right" vModel={this.editorConfig.gridY} precision={0} step={1}></el-input-number>
        </el-form-item>
        <el-form-item label="缩放">
          <el-input-number controls-position="right" vModel={this.editorConfig.zoom} min={0.1} max={10} precision={1} step={0.1}></el-input-number>
        </el-form-item>
        <el-form-item label="不超出画布">
          <el-switch vModel={this.editorConfig.parent}> </el-switch>
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
