<script lang="tsx">
import { Component, Watch } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { EditorStore } from "wepage-admin/store/modules";

@Component
export default class EditorOperate extends BaseVue {
  editorCode = "";

  get editorConfig() {
    return { ...EditorStore };
  }

  @Watch("editorConfig", {
    deep: true,
    immediate: true
  })
  watchEditorConfig() {
    this.editorCode = JSON.stringify(this.editorConfig, null, 2);
  }

  handleEditorCodeChange() {
    try {
      const config = JSON.parse(this.editorCode);
      EditorStore.setEditorConfig(config);
    } catch {
      this.$message.error("json解析错误");
    }
  }

  render() {
    return (
      <div>
        <el-button onClick={this.handleEditorCodeChange} style="margin-bottom: 10px;">
          提交
        </el-button>
        <el-input type="textarea" vModel={this.editorCode} class="code"></el-input>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
/deep/.code {
  textarea {
    min-height: calc(60vh - 150px) !important;
  }
}
</style>
