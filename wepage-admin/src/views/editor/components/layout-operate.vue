<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";

@Component
export default class LayoutOperate extends BaseVue {
  preActiveComp: PageComp = null;
  isChangeActiveComp = false;

  created() {
    this.$watch(
      () => {
        return PageStore.activeComp;
      },
      (newVal, oldVal) => {
        this.preActiveComp = oldVal;
        this.isChangeActiveComp = true;
      }
    );
    this.$watch(
      () => {
        if (PageStore.activeComp) {
          return PageStore.activeComp.layoutConfig.width + " " + PageStore.activeComp.layoutConfig.height;
        }
        return null;
      },
      (newVal, oldVal) => {
        if (PageStore.activeComp && oldVal && PageStore.activeComp && !this.isChangeActiveComp) {
          PageStore.refreshComponent(PageStore.activeComp);
          this.isChangeActiveComp = false;
        }
      }
    );
  }

  get activeComp() {
    return PageStore.activeComp;
  }

  render() {
    return (
      this.activeComp && (
        <el-form label-position="top" label-width="100px">
          <el-form-item label="x(px)">
            <el-input-number controls-position="right" precision={2} step={1} vModel={this.activeComp.layoutConfig.x}></el-input-number>
          </el-form-item>
          <el-form-item label="y(px)">
            <el-input-number controls-position="right" precision={2} step={1} vModel={this.activeComp.layoutConfig.y}></el-input-number>
          </el-form-item>
          <el-form-item label="width(px)">
            <el-input-number controls-position="right" precision={2} step={1} vModel={this.activeComp.layoutConfig.width}></el-input-number>
          </el-form-item>
          <el-form-item label="height(px)">
            <el-input-number controls-position="right" precision={2} step={1} vModel={this.activeComp.layoutConfig.height}></el-input-number>
          </el-form-item>
          <el-form-item label="z-index(px)">
            <el-input-number controls-position="right" precision={2} step={1} vModel={this.activeComp.layoutConfig.zIndex}></el-input-number>
          </el-form-item>
        </el-form>
      )
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
