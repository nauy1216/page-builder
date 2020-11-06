<template>
  <el-form label-position="right" label-width="100px">
    <el-form-item v-for="(prop, key) in activeCompProps" :key="key" :label="prop.label">
      <component :is="prop.inputComponent" v-model="activeComp.data[key]"></component>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import defineComponent from "wepage-admin/types/defineComponent";
import { mapStateTyped } from "wepage-admin/types/store";
export default defineComponent({
  computed: {
    ...mapStateTyped("page", ["pageConfig", "activeComp"]),
    ...mapStateTyped("editor", ["editorConfig"]),
    // 当前活动组件的属性
    activeCompProps() {
      return this.activeComp && this.$components[this.activeComp.name].extendOptions.props;
    }
  }
});
</script>

<style></style>
