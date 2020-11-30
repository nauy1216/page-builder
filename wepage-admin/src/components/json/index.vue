<script lang="tsx">
import BaseVue from "wepage-admin/BaseVue";
import { Component } from "vue-property-decorator";
import data from "./data";

@Component({
  name: "RpJson"
})
export default class RpJson extends BaseVue {
  dataInterface: any = "{}";

  created() {
    this.dataInterface = JSON.stringify(JSON.parse(this.getInterface(data)), null, 2);
  }

  getInterface(data, interfaceStr = "") {
    if (Object.prototype.toString.call(data) === "[object Object]") {
      interfaceStr = `{`;
      Object.keys(data).forEach(key => {
        const type = typeof data[key];
        if (["number", "string", "boolean", "undefined", "null"].indexOf(type) > -1) {
          interfaceStr += `"${key}":"${typeof data[key]}",`;
        } else if (type === "object") {
          interfaceStr += `"${key}":${this.getInterface(data[key])},`;
        } else if (Array.isArray(data[key])) {
          interfaceStr += `"${key}":${this.getInterface(data[key])},`;
        }
      });
      interfaceStr = interfaceStr.replace(/,$/, "");
      interfaceStr += `}`;
    } else if (Array.isArray(data)) {
      interfaceStr = `[`;
      const ele = data[0];
      if (ele) {
        const type = typeof ele;
        if (["number", "string", "boolean", "undefined", "null"].indexOf(type) > -1) {
          interfaceStr += `"${type}"`;
        } else if (type === "object") {
          interfaceStr += `${this.getInterface(ele)}`;
        } else if (Array.isArray(ele)) {
          interfaceStr += `"${this.getInterface(ele)}`;
        }
      }
      interfaceStr += `]`;
    }
    console.log(interfaceStr);
    return interfaceStr;
  }

  renderObj(interfaceObj) {
    return (
      <div>
        <div domPropsInnerHTML={"{"}></div>
        {Object.keys(interfaceObj).map(key => {
          return [
            <div class="rp-json-transform__row">
              <div>{key}:</div>
              <div>
                {Object.prototype.toString.call(interfaceObj[key]) === "[object Object]"
                  ? this.renderObj(interfaceObj[key])
                  : Array.isArray(interfaceObj[key])
                  ? this.renderArray(interfaceObj[key])
                  : interfaceObj[key]}
              </div>
            </div>
          ];
        })}
        <div domPropsInnerHTML={"}"}></div>
      </div>
    );
  }

  renderArray(interfaceObj) {
    return (
      <div>
        <div domPropsInnerHTML={"["}></div>
        {Object.keys(interfaceObj).map(key => {
          return [
            <div class="rp-json-transform__row" onMouseover={ev => ev.stopPropagation()}>
              <div>
                {Object.prototype.toString.call(interfaceObj[key]) === "[object Object]"
                  ? this.renderObj(interfaceObj[key])
                  : Array.isArray(interfaceObj[key])
                  ? this.renderArray(interfaceObj[key])
                  : interfaceObj[key]}
              </div>
            </div>
          ];
        })}
        <div domPropsInnerHTML={"]"}></div>
      </div>
    );
  }

  render() {
    const interfaceObj = JSON.parse(this.dataInterface);
    return (
      <div class="rp-json-transform">
        <el-input type="textarea" autosize={{ minRows: 4 }} vModel={this.dataInterface}></el-input>
        {this.renderObj(interfaceObj)}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(json-transform) {
  height: 400px;
  @include e(row) {
    width: 200px;
    display: flex;
    justify-content: flex-start;
    line-height: 20px;
    div {
      margin: 0 5px;
    }
    &:hover {
      background: #e0e0e0;
    }
  }
}
</style>
