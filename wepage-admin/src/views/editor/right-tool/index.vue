<template>
  <div class="right-tool" :style="{ width: width + 'px' }">
    <vue-draggable-resizable
      :x="0"
      :y="0"
      :w="width"
      :maxWidth="500"
      :minWidth="250"
      :draggable="false"
      :handles="['ml']"
      :active="true"
      :prevent-deactivation="true"
      class="right-tool-vdr"
      @resizing="handleResize"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="布局" name="1">
          <LayoutOperate></LayoutOperate>
        </el-tab-pane>
        <el-tab-pane label="属性" name="2">
          <div v-if="activeCompProps">
            <PropOperate></PropOperate>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据" name="3"> </el-tab-pane>
        <el-tab-pane label="交互" name="4"> </el-tab-pane>
      </el-tabs>
    </vue-draggable-resizable>
  </div>
</template>

<script lang="ts">
import defineComponent from "wepage-admin/types/defineComponent";
import LayoutOperate from "../components/layout-operate.vue";
import PropOperate from "../components/prop-operate.vue";
import { mapStateTyped } from "wepage-admin/types/store";

export default defineComponent({
  data() {
    return {
      activeName: "1",
      width: 250
    };
  },
  components: {
    LayoutOperate,
    PropOperate
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig", "activeComp"]),
    ...mapStateTyped("editor", ["editorConfig"]),
    // 当前活动组件的属性
    activeCompProps(): any {
      return this.activeComp && this.$compList[this.activeComp.name];
    }
  },
  methods: {
    handleResize(left, top, width) {
      this.width = width;
    }
  }
});
</script>
<style scoped lang="scss">
.right-tool-vdr {
  box-sizing: border-box;
  padding: 20px;
  height: 100% !important;
  &::before {
    display: none;
  }
  transform: translate(0, 0) !important;
}
/deep/.handle-ml {
  width: 4px !important;
  height: 40px !important;
  background: rgb(64, 158, 255) !important;
}
</style>
