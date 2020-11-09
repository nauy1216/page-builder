<script lang="tsx">
import { Component, Watch } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";

@Component
export default class CodeOperate extends BaseVue {
  code = "";

  get pageConfig() {
    return {
      ...PageStore
    };
  }

  @Watch("pageConfig", {
    immediate: true,
    deep: true
  })
  watchPageConfig() {
    this.code = JSON.stringify(this.pageConfig, null, 2);
  }

  handleCodeChange() {
    try {
      const config = JSON.parse(this.code);
      PageStore.setPageConfig(config);
    } catch {
      this.$message.error("json解析错误");
    }
  }

  render() {
    return (
      <div class="code-operate">
        <el-button onClick={this.handleCodeChange} style="margin-bottom: 10px;">
          提交
        </el-button>
        <el-input type="textarea" vModel={this.code} class="code"></el-input>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.code-operate {
  height: 100%;
}
/deep/.code {
  textarea {
    min-height: calc(60vh - 150px) !important;
  }
}
</style>
