<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore, EditorStore, AppStore } from "wepage-admin/store/modules";
import CanvasScale from "../components/canvas-scale.vue";

@Component({
  components: {
    CanvasScale
  }
})
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

  handleScale(num) {
    let zoom = EditorStore.zoom + num;
    zoom = Math.max(0, zoom);
    zoom = Math.min(10, zoom);
    EditorStore.setEditorConfig({
      zoom
    });
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
    EditorStore.setEditorConfig({
      dragMode: !EditorStore.dragMode
    });
  }

  render() {
    const { top, requestFullScreen, preview, changeDragMode } = this;
    return (
      <div class="top-tool" style={{ top: top + "px" }}>
        <div
          class="goback"
          onClick={() => {
            this.$router.go(-1);
          }}>
          <i class="el-icon-arrow-left"></i>
          {AppStore.appData && PageStore.pageData ? `${AppStore.appData.appName} - ${PageStore.pageData.pageName}` : "返回"}
        </div>
        <div class="tool">
          <el-button type="text" onClick={preview}>
            预览
          </el-button>
          <el-button type="text" onClick={requestFullScreen}>
            {this.isFullScreen ? "退出全屏" : "全屏"}
          </el-button>
          <el-button type="text" onClick={changeDragMode}>
            拖拽模式{EditorStore.dragMode ? <i class="el-icon-check"></i> : null}
          </el-button>
          <CanvasScale></CanvasScale>
          {/**
                    <el-button type="text">
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
          </el-button> */}
        </div>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
.top-tool {
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 2px;
  .goback {
    flex: 0 0 200px;
    cursor: pointer;
    .el-icon-arrow-left {
      font-size: 12px;
      margin-right: 4px;
    }
    &:hover {
      color: var(--theme-color);
      .el-icon-arrow-left {
        color: var(--theme-color);
      }
    }
  }
  .tool {
    flex: 1 1 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .el-dropdown {
    line-height: 12px !important;
  }
}
</style>
