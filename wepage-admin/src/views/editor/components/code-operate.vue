<template>
  <div class="code-operate">
    <el-button @click="handleCodeChange" style="margin-bottom: 10px;">提交</el-button>
    <el-input type="textarea" v-model="code" class="code"></el-input>
  </div>
</template>

<script lang="ts">
import defineComponent from "wepage-admin/types/defineComponent";
import { mapStateTyped, mapMutationsTyped } from "wepage-admin/types/store";
export default defineComponent({
  data() {
    return {
      code: ""
    };
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig", "activeComp"]),
    ...mapStateTyped("editor", ["editorConfig"]),
    // 当前活动组件的属性
    activeCompProps(): any {
      return this.activeComp && this.$components[this.activeComp.name];
    }
  },
  watch: {
    pageConfig: {
      handler(this: any) {
        this.code = JSON.stringify(this.pageConfig, null, 2);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutationsTyped("page", ["addComponent", "setPageConfig"]),
    ...mapMutationsTyped("editor", ["setEditorConfig"]),
    handleCodeChange() {
      try {
        const config = JSON.parse(this.code);
        this.setPageConfig(config);
      } catch {
        this.$message.error("json解析错误");
      }
    }
  }
});
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
