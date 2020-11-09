<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";

export interface MenuCommand {
  command: string;
  name: string;
  handle: (comp: any) => void;
}

@Component
export default class ContextMenu extends BaseVue {
  @Prop({
    type: Array,
    required: true,
    default: () => [] as MenuCommand[]
  })
  options;

  x = 0;
  y = 0;
  component: Vue | null = null;

  show(x: number, y: number, component: Vue) {
    this.x = x;
    this.y = y;
    this.component = component;
    (this.$refs.trigger as HTMLElement).click();
  }

  handleCommand(command: string) {
    for (const c of this.options as MenuCommand[]) {
      if (c.command === command) {
        c.handle(this.component);
        break;
      }
    }
  }

  render() {
    return (
      <div style={{ left: this.x + "px", top: this.y + "px", position: "fixed" }}>
        <el-dropdown trigger="click" onCommand={this.handleCommand}>
          <span ref="trigger" class="trigger"></span>
          <el-dropdown-menu slot="dropdown">
            {this.options.map(command => (
              <el-dropdown-item key={command.command} command={command.command}>
                {command.name}
              </el-dropdown-item>
            ))}
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.trigger {
  position: fixed;
  z-index: 1000;
}
</style>
