<template>
  <div :style="{ width: width + 'px', height: height + 'px' }" class="layout-position">
    <Vdr v-for="comp in components" :key="comp.id" :comp="comp" @contextmenu="handleComponentContextMenu"> </Vdr>
  </div>
</template>

<script lang="ts">
import defineComponent from "wepage-admin/types/defineComponent";
import { mapStateTyped } from "wepage-admin/types/store";
import { PageComponentOptions } from "wepage-admin/types/page";
import Vdr from "./vdr.vue";
export default defineComponent({
  components: {
    Vdr
  },
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  computed: {
    ...mapStateTyped("page", ["pageConfig"]),
    ...mapStateTyped("editor", ["editorConfig"]),
    components(): PageComponentOptions[] {
      const showLayouts = this.pageConfig.layouts.filter(lay => lay.show).map(lay => lay.id);
      return this.pageConfig.children.filter(comp => showLayouts.indexOf(comp.layoutId) > -1);
    }
  },
  methods: {
    handleComponentContextMenu($event, comp) {
      this.$emit("contextmenu", $event, comp);
    }
  }
});
</script>

<style lang="scss" scoped>
.layout-position {
  pointer-events: none;
  & * {
    pointer-events: all;
  }
}
</style>
