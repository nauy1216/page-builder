<script lang="tsx">
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-components/BaseVue";
import { VePie } from "v-charts";
@Component({
  name: "ChartPie",
  config: {
    alias: "饼图",
    icon: "el-icon-star-on",
    width: 400,
    height: 200
  },
  components: {
    VePie
  }
})
export default class ChartPie extends BaseVue {
  chartData = {
    columns: ["日期", "访问用户"],
    rows: [
      { 日期: "1/1", 访问用户: 1393 },
      { 日期: "1/2", 访问用户: 3530 },
      { 日期: "1/3", 访问用户: 2923 },
      { 日期: "1/4", 访问用户: 1723 },
      { 日期: "1/5", 访问用户: 3792 },
      { 日期: "1/6", 访问用户: 4593 }
    ]
  };

  render() {
    return <ve-pie data={this.chartData}></ve-pie>;
  }
}
</script>
