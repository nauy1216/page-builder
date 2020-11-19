<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";

@Component
export default class PropOperate extends BaseVue {
  get activeCompProps() {
    return PageStore.activeComp && this.$components[PageStore.activeComp.name].extendOptions.props;
  }

  get activeComp() {
    return PageStore.activeComp;
  }

  render(h) {
    return (
      <el-form label-position="right" label-width="100px">
        {this.activeCompProps &&
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
          })}
      </el-form>
    );
  }
}
</script>

<style></style>
