<script lang="tsx">
import BaseVue from "wepage-admin/BaseVue";
import { Component } from "vue-property-decorator";
import { VueConstructor } from "vue";
@Component({
  name: "RpExample"
})
export default class Playground extends BaseVue {
  cuerrentComponents: VueConstructor[] = [];
  cuerrentComponentsConf: any[] = [];

  selectComponent(name: string, flag: boolean) {
    if (!this.$components[name]) {
      return;
    }
    this.cuerrentComponents = [this.$components[name]];
    this.cuerrentComponentsConf = [this.$componentsConfig[name]];
    if (flag) {
      location.href = location.href.split("?")[0] + `?component=${name}`;
    }
  }

  getDefaultProps(index) {
    const props = this.cuerrentComponentsConf[index].componentProps;
    const res = {};
    Object.keys(props).forEach(key => {
      res[key] = props[key].default;
    });
    return res;
  }

  created() {
    if (this.$route.query.component) {
      this.selectComponent(this.$route.query.component as string, false);
    }
  }

  render(h) {
    return (
      <div class="rp-playground">
        <div class="rp-playground__components-list">
          {Object.keys(this.$components).map(name => {
            return (
              <div
                class="rp-playground__components-item"
                onClick={() => {
                  this.selectComponent(name, true);
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
        <div class="rp-playground__content">
          {this.cuerrentComponents.map((comp, index) => {
            return h(comp, {
              props: {
                ...this.getDefaultProps(index)
              },
              attrs: {
                mockData: this.cuerrentComponentsConf[index].mockData
              }
            });
          })}
        </div>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "shared/style/bem.scss";
@include b(playground) {
  @include e(components-list) {
    position: fixed;
    left: 0;
    width: 200px;
    height: 100vh;
    overflow: auto;
    border-right: 1px solid #e0e0e0;
  }
  @include e(components-item) {
    padding: 10px 20px;
    border-bottom: 1px solid #e0e0e0;
    &:hover {
      background: #e0e0e0;
    }
  }
  @include e(content) {
    margin-left: 200px;
    padding: 20px;
  }
}
</style>
