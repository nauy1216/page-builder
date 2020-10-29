import { uuid } from "./index";

export default class FrameMessage {
  private otherWin!: Window;
  private thisHost!: string;
  private handles: { [key: string]: Function } = {};

  constructor(thisHost: string, otherWin: Window) {
    this.thisHost = thisHost;
    this.otherWin = otherWin;
    window.addEventListener(
      "message",
      ev => {
        if (this.handles[ev.data.type]) {
          let res: any;
          try {
            res = this.handles[ev.data.type]();
          } catch (err) {
            console.log(err);
          }
          // 如果有返回值，则将返回值传过去
          if (res) {
            this.postData(ev.data.type, res, ev.data.key);
          }
        }
      },
      false
    );
  }

  getData(messageType: string, data?: Record<string, any>) {
    const key = uuid();
    return new Promise(resolve => {
      this.otherWin.postMessage(
        {
          from: this.thisHost,
          type: messageType,
          key,
          data
        },
        "*"
      );
      const handler = e => {
        if (e.data.type === messageType && e.data.key === key) {
          console.log(`消息【${messageType}】返回结果 ===> `, e.data);
          resolve(e.data);
        }
        window.removeEventListener("message", handler, false);
      };
      window.addEventListener("message", handler, false);
    });
  }

  postData(messageType: string, data: any, messageKey?: string) {
    this.otherWin.postMessage(
      {
        from: this.thisHost,
        type: messageType,
        key: messageKey,
        data
      },
      "*"
    );
  }

  onMessage(messageType: string, handler: Function) {
    this.handles[messageType] = handler;
  }
}
