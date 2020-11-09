<script lang="tsx">
import { getDialog } from "wepage-admin/components/Dialog";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";

@Component({})
export default class AppManage extends BaseVue {
  tableData = [];
  formData = {
    appName: "",
    appType: 1,
    width: 1920,
    height: 1080
  };
  rules = {};

  created() {
    this.getAppList();
  }

  getAppList() {
    this.$ajax("get", this.$api.appList).then(res => {
      this.tableData = res.data;
    });
  }

  pageManage(appId) {
    this.$router.push("/pageManage?appId=" + appId);
  }

  createApp() {
    getDialog()
      .show({
        title: "创建应用",
        renderContent: () => {
          return (
            <el-form ref="form" {...{ props: { model: this.formData } }} rules={this.rules} label-width="80px">
              <el-form-item label="应用名称" prop="name">
                <el-input vModel={this.formData.appName}></el-input>
              </el-form-item>
              <el-form-item label="屏幕尺寸" prop="name">
                <el-input vModel={this.formData.width} placeholder="宽" style="width: 80px;text-align:center"></el-input>
                <span style="margin: 0 10px;">x</span>
                <el-input vModel={this.formData.height} placeholder="高" style="width: 80px;text-align:center"></el-input>
              </el-form-item>
              <el-form-item label="应用类型" prop="name">
                <el-select vModel={this.formData.appType} placeholder="请选择">
                  <el-option label="大屏可视化" value={1}></el-option>
                  <el-option label="h5" value={2} disabled></el-option>
                  <el-option label="小程序" value={3} disabled></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          );
        }
      })
      .then(() => {
        this.$ajax("postJson", this.$api.appAdd, this.formData).then(() => {
          this.$message.success("操作成功");
          this.getAppList();
        });
      });
  }

  render() {
    return (
      <div class="rp-app-manage">
        <div class="opera">
          <el-button onClick={this.createApp}>创建应用</el-button>
        </div>
        <el-table data={this.tableData} style="width: 100%">
          <el-table-column prop="id" label="ID" width="300"></el-table-column>
          <el-table-column prop="appName" label="名称" width="180"></el-table-column>
          <el-table-column prop="appType" label="类型" width="180"></el-table-column>
          <el-table-column
            label="操作"
            scopedSlots={{
              default: scope => {
                return (
                  <el-button
                    type="text"
                    onClick={() => {
                      this.pageManage(scope.row.id);
                    }}
                  >
                    页面管理
                  </el-button>
                );
              }
            }}
          ></el-table-column>
        </el-table>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
@import "shared/style/bem.scss";
@include b(app-manage) {
  .opera {
    margin: 20px 0;
  }
}
</style>
