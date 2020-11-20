<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";
import { isTypeOf } from "shared/utils";

@Component
export default class PropOperate extends BaseVue {
  get activeCompProps() {
    return PageStore.activeComp && this.$componentsConfig[PageStore.activeComp.name].componentProps;
  }

  get activeComp() {
    return PageStore.activeComp;
  }

  render(h) {
    if (!PageStore.activeComp || !this.activeCompProps) return;
    return (
      <el-form label-position="right" label-width="100px">
        {/**this.activeCompProps &&
          Object.keys(this.activeCompProps).map((prop, index) => {
            return (
              <el-form-item key={index} label={this.activeCompProps[prop].label}>
                {this.activeComp &&
                  h(this.activeCompProps[prop].inputComponent, {
                    key: index,
                    props: {
                      value: this.activeComp.componentProps[index]
                    },
                    on: {
                      input: value => {
                        if (PageStore.activeComp) {
                          PageStore.activeComp.componentProps[index] = value;
                        }
                      }
                    }
                  })}
              </el-form-item>
            );
          })*/}
        {Object.keys(this.activeCompProps).map((prop, index) => {
          const propConfig = this.activeCompProps![prop];
          let compName = "";
          let props: Record<string, any>;
          if (isTypeOf<string>("String", propConfig.inputComponent)) {
            compName = propConfig.inputComponent;
            props = {};
          } else {
            compName = propConfig.inputComponent.componentName;
            props = propConfig.inputComponent.props || {};
          }
          return (
            <el-form-item key={index} label={propConfig!.label}>
              {PageStore.activeComp &&
                h(compName, {
                  key: index,
                  props: {
                    ...props,
                    value: PageStore.activeComp!.componentProps[prop]
                  },
                  on: {
                    input: value => {
                      PageStore.activeComp!.componentProps[prop] = value;
                    }
                  }
                })}
            </el-form-item>
          );
        })}
      </el-form>
    );
  }
}
</script>

<style></style>
