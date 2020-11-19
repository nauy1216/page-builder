<script lang="tsx">
import BaseVue from "wepage-components/BaseVue";
import { Component, Prop, Watch } from "vue-property-decorator";
import "swiper/swiper-bundle.min.css";
import Swiper from "swiper/swiper-bundle.cjs";
import { px2rem } from "shared/utils";

@Component({
  name: "WuiSwipper"
})
export default class WuiSwipper extends BaseVue {
  @Prop({
    required: true,
    type: Number
  })
  width!: number;

  @Prop({
    required: true,
    type: Number
  })
  height!: number;

  @Prop({
    required: true,
    type: Number
  })
  cols!: number;

  @Prop({
    required: true,
    type: Number
  })
  rows!: number;

  @Prop({
    type: String
  })
  background!: string;

  imgList: any[] = [];
  oSwiper!: Swiper;

  $refs!: {
    swiper: HTMLElement;
  };

  get slideWidth() {
    return this.width / this.cols;
  }

  get slideHeight() {
    return this.height / this.rows;
  }

  mounted() {
    this.initSwiper();
    this.imgList = (this.$attrs.mockData as any).imgList;
  }

  @Watch("imgList")
  watchImgList() {
    this.initSwiper();
  }

  initSwiper() {
    setTimeout(() => {
      this.oSwiper = new Swiper(this.$refs.swiper, {
        initialSlide: 0, // 设定初始化时slide的索引
        direction: "horizontal", // Swiper的滑动方向
        speed: 300, // 切换速度
        grabCursor: false, // 设置为true时，鼠标覆盖Swiper时指针会变成手掌形状
        parallax: false,
        setWrapperSize: false, // 使用flex
        roundLengths: true, //则将slide的宽和高取整(四舍五入)，以防止某些分辨率的屏幕上文字或边界(border)模糊。
        autoHeight: false, // 设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        uniqueNavElements: true, // 独立分页元素
        nested: false, // 用于嵌套相同方向的swiper时，当切换到子swiper时停止父swiper的切换。
        runCallbacksOnInit: true, // 初始化时会触发一次 [Transition/SlideChange] [Start/End] 回调函数。
        init: true, // 是否立即初始化
        preloadImages: true, // 为true，Swiper会强制加载所有图片后才初始化。
        updateOnImagesReady: true, // 当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化
        cssMode: false,
        updateOnWindowResize: true, //
        centeredSlides: false, // 设定为true时，active slide会居中，而不是默认状态下的居左。
        watchOverflow: false,
        slidesPerView: this.cols,
        slidesPerGroup: this.cols,
        slidesPerGroupSkip: 0,
        spaceBetween: 0,
        slidesPerColumn: this.rows,
        slidesPerColumnFill: "column",
        slidesOffsetBefore: 0, // 设定slide与左边框的预设偏移量（单位px）。
        slidesOffsetAfter: 0, // 设定slide与右边框的预设偏移量（单位px）。
        normalizeSlideIndex: true,
        centerInsufficientSlides: true, // 开启这个参数，当slides的总数小于slidesPerView时，slides居中。 不适用于loop模式和slidesPerColumn
        loop: false,
        observer: true,
        observeParents: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      });
    }, 50);
  }

  handleClickSlide(item) {
    console.log("item", item);
  }

  destoryed() {
    if (this.oSwiper) {
      this.oSwiper.destroy();
    }
  }

  render() {
    return (
      <div class="swiper-container" ref="swiper" style={{ width: px2rem(this.width), height: px2rem(this.height), background: this.background }}>
        <div class="swiper-wrapper">
          {this.imgList.length > 0 &&
            this.imgList.map((item, index) => {
              return (
                <div
                  class="swiper-slide"
                  key={index}
                  onClick={() => {
                    this.handleClickSlide(item);
                  }}
                  style={{ width: px2rem(this.slideWidth), height: px2rem(this.slideHeight) }}>
                  <img src={item.img} alt="" />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
.swiper-wrapper {
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
