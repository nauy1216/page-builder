<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore, EditorStore } from "wepage-admin/store/modules";

@Component({})
export default class TopTool extends BaseVue {
  top = 10;
  isFullScreen = false;

  handleMouseMove(ev) {
    if (ev.clientY < 60) {
      this.top = 10;
    } else {
      this.top = -100;
    }
  }

  save() {
    console.log("pageConfig", JSON.parse(JSON.stringify(PageStore.config)));
    const config: PageConfig = JSON.parse(JSON.stringify(PageStore.config));
    config.children.forEach(child => {
      child.config.active = false;
    });
    console.log("PageStore.pageData =====>", PageStore.pageData);
    const pageData = JSON.parse(JSON.stringify(PageStore.pageData));
    pageData.config = JSON.stringify(config);

    this.$ajax("postJson", this.$api.pageAdd, pageData).then(() => {
      this.$message.success("操作成功");
    });
  }

  handleScale(num) {
    EditorStore.zoom += num;
    EditorStore.zoom = Math.max(0, EditorStore.zoom);
    EditorStore.zoom = Math.min(10, EditorStore.zoom);
  }

  requestFullScreen() {
    if (this.isFullScreen) {
      document.exitFullscreen();
      this.isFullScreen = false;
    } else {
      document.documentElement.requestFullscreen();
      this.isFullScreen = true;
    }
  }

  preview() {
    const appId = this.$route.query.appId;
    const pageId = this.$route.query.pageId;
    this.$router.push(`/pageShow?appId=${appId}&&pageId=${pageId}`);
  }

  changeDragMode() {
    EditorStore.dragMode = !EditorStore.dragMode;
  }

  render() {
    const { top, save, handleScale, requestFullScreen, preview, changeDragMode } = this;
    return (
      <div class="top-tool" style={{ top: top + "px" }}>
        <el-button-group>
          <el-button onClick={save}>保存</el-button>
          <el-button onClick={preview}>预览</el-button>
          <el-button onClick={requestFullScreen}>{this.isFullScreen ? "退出全屏" : "全屏"}</el-button>
          <el-button onClick={changeDragMode}>拖拽模式{EditorStore.dragMode ? <i class="el-icon-check"></i> : null}</el-button>
          <el-button onClick={() => handleScale(0.1)}>
            <i class="el-icon-zoom-in"></i>
          </el-button>
          <el-button onClick={() => handleScale(-0.1)}>
            <i class="el-icon-zoom-out"></i>
          </el-button>
          <el-button>
            <el-dropdown trigger="click">
              <span style="font-size:12px; line-height: 12px;">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  nativeOnClick={() => {
                    EditorStore.setEditorConfig({
                      showLeftTool: !EditorStore.showLeftTool
                    });
                  }}>
                  显示左侧工具栏
                  {EditorStore.showLeftTool && <i class="el-icon-check"></i>}
                </el-dropdown-item>
                <el-dropdown-item
                  nativeOnClick={() => {
                    EditorStore.setEditorConfig({
                      showRightTool: !EditorStore.showRightTool
                    });
                  }}>
                  显示右侧工具栏
                  {EditorStore.showRightTool && <i class="el-icon-check"></i>}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
        </el-button-group>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
.top-tool {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-radius: 2px;
  .el-dropdown {
    line-height: 12px !important;
  }
}
</style>
