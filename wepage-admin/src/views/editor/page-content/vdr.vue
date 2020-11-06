<template>
  <vue-draggable-resizable
    :x="comp.config.x"
    :y="comp.config.y"
    :w="comp.config.width"
    :h="comp.config.height"
    :parent="editorConfig.parent"
    :debug="false"
    :active.sync="comp.config.active"
    :prevent-deactivation="true"
    :isConflictCheck="false"
    :snap="true"
    :snapTolerance="10"
    @dragging="(left, right) => handleDrag(comp, left, right)"
    @resizing="(left, top, width, height) => handleResize(comp, left, top, width, height)"
    @deactivated="handleDeactivated(comp)"
    @activated="handleActivated(comp)"
  >
    <div
      @contextmenu="handleComponentContextMenu($event, comp)"
      :style="{
        width: comp.config.width + 'px',
        height: comp.config.height + 'px'
      }"
    >
      <component ref="component" :is="$components[comp.name]" v-bind="comp.data"></component>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import defineComponent, { PropValidator } from "wepage-admin/types/defineComponent";
import { mapMutationsTyped, mapStateTyped } from "wepage-admin/types/store";
import { PageComponentOptions } from "wepage-admin/types/page";

export default defineComponent({
  props: {
    comp: {
      required: true,
      type: Object
    } as PropValidator<PageComponentOptions>
  },
  computed: {
    ...mapStateTyped("editor", ["editorConfig"])
  },
  mounted() {
    this.calcSize();
  },
  methods: {
    ...mapMutationsTyped("page", ["refreshComponent", "setActiveComp"]),
    handleDrag(comp, left, top) {
      comp.config.x = left;
      comp.config.y = top;
    },
    handleResize(comp, left, top, width, height) {
      comp.config.x = left;
      comp.config.y = top;
      comp.config.width = width;
      comp.config.height = height;
      this.refreshComponent(comp);
    },
    handleDeactivated() {
      //   this.setActiveComp(null);
    },
    handleActivated(comp) {
      this.setActiveComp(comp);
    },
    handleComponentContextMenu($event, comp) {
      this.$emit("contextmenu", $event, comp);
    },
    // 计算内容组件的尺寸，并且自适应宽高
    calcSize() {
      this.$nextTick(() => {
        console.log("component", this.$refs.component);
        const ele = (this.$refs.component as Vue).$el as HTMLElement;
        const rect = ele.getBoundingClientRect();
        this.comp.config.width = rect.width;
        this.comp.config.height = rect.height;
      });
    }
  }
});
</script>

<style></style>
