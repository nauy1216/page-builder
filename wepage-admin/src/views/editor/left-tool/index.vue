<script lang="tsx">
import CompTree from "../components/comp-tree.vue";
import PageOperate from "../components/page-operate.vue";
import CodeOperate from "../components/code-operate.vue";
import EditorOperate from "../components/editor-operate.vue";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";
import PageManage from "../components/page-manage.vue";

@Component({
  components: {
    CompTree,
    PageOperate,
    CodeOperate,
    EditorOperate,
    PageManage
  }
})
export default class LeftTool extends BaseVue {
  activeName = "1";
  width = 220;

  handleDragStart(event, comp) {
    PageStore.setDragComp(comp);
  }

  handleDragEnd() {
    PageStore.setDragComp(null);
  }

  handleResize(left, top, width) {
    this.width = width;
  }

  render() {
    return (
      <div class="l-left-tool" style={{ width: this.width + 30 + "px", background: "#fff" }}>
        <div class="l-left-tool__tool-list">
          <el-popover placement="right" width="400" trigger="hover">
            <EditorOperate></EditorOperate>
            <div class="tool-list-item" slot="reference">
              编辑器
            </div>
          </el-popover>
          <el-popover placement="right-start" width="300" trigger="hover">
            <CompTree></CompTree>
            <div class="tool-list-item" slot="reference">
              图层
            </div>
          </el-popover>
          <el-popover placement="right" width="400" trigger="hover">
            <CodeOperate></CodeOperate>
            <div class="tool-list-item" slot="reference">
              代码
            </div>
          </el-popover>
        </div>
        <div class="l-left-tool__vdr">
          {/**         <vue-draggable-resizable
            x={0}
            y={0}
            w={this.width}
            maxWidth={500}
            minWidth={220}
            draggable={false}
            handles={["mr"]}
            active={false}
            prevent-deactivation={true}
            class="l-left-tool__vdr"
            onResizing={this.handleResize}> */}
          <PageManage></PageManage>
          <el-tabs vModel={this.activeName}>
            <el-tab-pane label="组件列表" name="1">
              <div calss="left-tool-list">
                {Object.keys(this.$components).map((compName, index) => {
                  return (
                    <div
                      Key={compName + index}
                      class="left-tool-item"
                      draggable="true"
                      onDragstart={($event: MouseEvent) => {
                        $event.stopPropagation();
                        this.handleDragStart($event, this.$components[compName]);
                      }}
                      onDragend={($event: MouseEvent) => {
                        $event.stopPropagation();
                        this.handleDragEnd();
                      }}>
                      <span class="name">{this.$componentsConfig[compName].config.alias}</span>
                    </div>
                  );
                })}
              </div>
            </el-tab-pane>
          </el-tabs>
          {/**</vue-draggable-resizable> */}
        </div>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@import "shared/style/bem.scss";
@include b(left-tool) {
  display: flex;
  @include e(tool-list) {
    border-right: 1px solid rgb(235, 238, 245);
    width: 30px;
    .tool-list-item {
      border-bottom: 1px solid rgb(235, 238, 245);
      padding: 10px 0;
      line-height: 30px;
      writing-mode: vertical-lr;
      cursor: pointer;
      color: var(--font-color-gray1);
      &:hover {
        background-color: #f5f7fa;
        color: var(--theme-color);
      }
    }
  }
  @include e(vdr) {
    flex: 1 1 100%;
    box-sizing: border-box;
    padding: 20px 10px;
    height: 100% !important;
    &::before {
      display: none;
    }
  }
  /deep/.handle-mr {
    width: 4px !important;
    height: 40px !important;
    background: rgb(64, 158, 255) !important;
  }
  .left-tool-item {
    width: 100%;
    box-sizing: border-box;
    display: inline-flex;
    padding: 10px;
    text-align: left;
    color: var(--font-color-gray1);
    &:hover {
      background-color: #f5f7fa;
      color: var(--theme-color);
    }
    .icon {
      margin-bottom: 10px;
      font-size: 30px;
      color: #666666;
    }
  }
}
</style>
