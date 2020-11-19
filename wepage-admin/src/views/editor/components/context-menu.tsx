import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";

export interface MenuCommand {
  command: string;
  name: string;
  handle: () => void;
}

@Component
export default class ContextMenu extends BaseVue {
  x = 0;
  y = 0;
  options: MenuCommand[] = [];

  show(x: number, y: number, options: MenuCommand[]) {
    this.x = x;
    this.y = y;
    this.options = options;
    (this.$refs.trigger as HTMLElement).click();
  }

  handleCommand(command: string) {
    for (const c of this.options as MenuCommand[]) {
      if (c.command === command) {
        c.handle();
        break;
      }
    }
  }

  render() {
    return (
      <div style={{ left: this.x + "px", top: this.y + "px", position: "fixed" }}>
        <el-dropdown trigger="click" onCommand={this.handleCommand}>
          <span ref="trigger" class="trigger" style={{ position: "fixed", zIndex: 1000 }}></span>
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
