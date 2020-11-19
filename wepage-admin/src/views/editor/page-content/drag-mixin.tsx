import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";

@Component({})
export default class ContexMenuMixin extends BaseVue {
  isStartMove = false;
  scrollLeft = 0; // 页面横向滚动距离
  scrollTop = 0;
  maxScrollLeft = 0; // 页面最大横向滚动距离
  maxScrollTop = 0;
  startX = 0;
  startY = 0;
  viewportWidth = 0; // 编辑器视口宽度
  viewportHeight = 0; // 编辑器视口高度

  created() {
    this.addMoveEvent();
  }

  // 视口增加拖动事件
  addMoveEvent() {
    const handlePageMouseMove = (ev: MouseEvent) => {
      if (this.isStartMove) {
        const dom = (this.$refs.viewport as Vue).$el.querySelector(".el-scrollbar__wrap")!;
        this.viewportWidth = dom.clientWidth;
        this.viewportHeight = dom.clientHeight;

        this.maxScrollLeft = dom.scrollWidth - this.viewportWidth;
        this.maxScrollTop = dom.scrollHeight - this.viewportHeight;

        this.scrollLeft += this.startX - ev.clientX;
        this.scrollTop += this.startY - ev.clientY;

        this.scrollLeft = Math.max(0, this.scrollLeft);
        this.scrollTop = Math.max(0, this.scrollTop);
        this.scrollLeft = Math.min(this.maxScrollLeft, this.scrollLeft);
        this.scrollTop = Math.min(this.maxScrollTop, this.scrollTop);

        dom.scrollTo(this.scrollLeft, this.scrollTop);

        this.startX = ev.clientX;
        this.startY = ev.clientY;
      }
    };

    const handlePageMouseDown = (ev: MouseEvent) => {
      if (ev.target && (ev.target as HTMLElement).className.indexOf("page-content") > -1) {
        this.isStartMove = true;
        this.startX = ev.clientX;
        this.startY = ev.clientY;
        document.body.addEventListener("mousemove", handlePageMouseMove);
      }
    };

    const handlePageMouseUp = () => {
      this.isStartMove = false;
      document.body.removeEventListener("mousemove", handlePageMouseMove);
    };

    document.body.addEventListener("mousedown", handlePageMouseDown);
    document.body.addEventListener("mouseup", handlePageMouseUp);
    this.$once("hook:beforeDestroy", () => {
      document.body.removeEventListener("mousedown", handlePageMouseDown);
      document.body.removeEventListener("mouseup", handlePageMouseUp);
    });
  }
}
