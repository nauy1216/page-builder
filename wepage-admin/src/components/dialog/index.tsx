import { VNode } from "vue";
import BaseVue from "wepage-admin/BaseVue";
import { Component } from "vue-property-decorator";

const defaultProps = {
  title: "标题",
  "append-to-body": true,
  "close-on-click-modal": false,
  width: "30%"
};

type CallBack = (close: () => void) => void;
@Component
export default class Dialog extends BaseVue {
  private dialogVisible = false;
  private renderContent?: () => VNode;
  private cancel?: CallBack;
  private confirm?: CallBack;
  private dialogProps?: Record<string, any>;
  private resolve!: (action: "confirm" | "cancel") => void;

  show(props: { renderContent?: () => VNode; cancel?: CallBack; confirm?: CallBack; dialogProps?: Record<string, any> }): Promise<"confirm" | "cancel"> {
    this.dialogVisible = true;
    this.renderContent = props.renderContent;
    this.cancel = props.cancel;
    this.confirm = props.confirm;
    this.dialogProps = props.dialogProps;
    return new Promise<"confirm" | "cancel">(resolve => {
      this.resolve = resolve;
    });
  }

  private close() {
    this.dialogVisible = false;
  }

  private handleCancel() {
    if (this.cancel != null) {
      this.cancel(this.close);
    } else {
      this.close();
    }
    this.$emit("cancel");
    this.resolve("cancel");
  }

  private handleconfirm() {
    if (this.confirm != null) {
      this.confirm(this.close);
    } else {
      this.close();
    }
    this.$emit("confirm");
    this.resolve("confirm");
  }

  render() {
    const events = {
      "update:visible": (value: boolean) => {
        this.dialogVisible = value;
      }
    };
    const props = Object.assign({}, defaultProps, this.dialogProps);
    const vnode = (
      <el-dialog props={props} on={events} visible={this.dialogVisible}>
        {this.renderContent && this.renderContent()}
        <span slot="footer" class="dialog-footer">
          <el-button onClick={this.handleCancel}>取 消</el-button>
          <el-button type="primary" onClick={this.handleconfirm}>
            确 定
          </el-button>
        </span>
      </el-dialog>
    );
    return vnode;
  }
}

let dialog: Dialog;
export function getDialog(): Dialog {
  if (!dialog) {
    dialog = new Dialog().$mount();
    document.body.append(dialog.$el);
  }
  return dialog;
}
