<script lang="tsx">
import { getDialog } from "wepage-admin/components/dialog/index";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { directives } from "shared/utils";

@Component({})
export default class AppManage extends BaseVue {
  tableData = [];
  formData = {
    id: "",
    appName: "",
    appType: "1",
    width: 1920,
    height: 1080,
    desc: ""
  };
  rules = {};
  loading = false;

  created() {
    this.list();
  }

  list() {
    this.loading = true;
    this.$ajax("get", this.$api.appList).then(res => {
      this.loading = false;
      this.tableData = res.data;
    });
  }

  remove(id) {
    this.$ajax("get", this.$api.appDelete, { id }).then(() => {
      this.$message.success("删除成功");
      this.list();
    });
  }

  addOrUpdate() {
    this.$ajax("postJson", this.$api.appAddOrUpdate, {
      id: this.formData.id,
      appName: this.formData.appName,
      appType: this.formData.appType,
      designWidth: this.formData.width,
      designHeight: this.formData.height,
      desc: this.formData.desc
    }).then(() => {
      this.$message.success("添加成功");
      this.list();
    });
  }

  pageManage(appId) {
    this.$router.push("/pageManage?appId=" + appId);
  }

  setFormData(data) {
    if (data) {
      this.formData = {
        id: data.id,
        appName: data.appName,
        appType: data.appType,
        width: data.designWidth,
        height: data.designHeight,
        desc: data.desc
      };
    } else {
      this.formData = {
        id: "",
        appName: "",
        appType: "1",
        width: 1920,
        height: 1080,
        desc: ""
      };
    }
  }

  createApp(data) {
    this.setFormData(data);
    getDialog()
      .show({
        dialogProps: {
          width: "400px",
          title: "创建应用"
        },
        renderContent: () => {
          return (
            <el-form ref="form" {...{ props: { model: this.formData } }} rules={this.rules} label-width="80px">
              <el-form-item label="应用名称" prop="name">
                <el-input style="width:193px" vModel={this.formData.appName}></el-input>
              </el-form-item>
              <el-form-item label="屏幕尺寸" prop="name">
                <el-input vModel={this.formData.width} placeholder="宽" style="width: 80px;text-align:center"></el-input>
                <span style="margin: 0 10px;">x</span>
                <el-input vModel={this.formData.height} placeholder="高" style="width: 80px;text-align:center"></el-input>
              </el-form-item>
              <el-form-item label="应用类型" prop="name">
                <el-select vModel={this.formData.appType} placeholder="请选择">
                  <el-option label="大屏可视化" value="1"></el-option>
                  <el-option label="h5" value="2" disabled></el-option>
                  <el-option label="小程序" value="3" disabled></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述" prop="name">
                <el-input style="width:193px" vModel={this.formData.desc}></el-input>
              </el-form-item>
            </el-form>
          );
        }
      })
      .then(action => {
        if (action === "confirm") {
          this.addOrUpdate();
        }
      });
  }

  render() {
    return (
      <div class="rp-app-manage" {...directives({ loading: this.loading })}>
        <div class="opera">
          <el-button onClick={this.createApp}>创建应用</el-button>
        </div>
        <el-table data={this.tableData} style="width: 100%">
          <el-table-column prop="id" label="ID" width="300"></el-table-column>
          <el-table-column prop="appName" label="名称" width="180"></el-table-column>
          <el-table-column prop="appType" label="类型" width="180"></el-table-column>
          <el-table-column
            label="尺寸"
            width="180"
            scopedSlots={{
              default: scope => {
                return (
                  <div>
                    {scope.row.designWidth} * {scope.row.designHeight}
                  </div>
                );
              }
            }}
          ></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="desc" label="描述" width="180"></el-table-column>
          <el-table-column label="操作">
            {scope => (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.createApp(scope.row);
                  }}
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  onClick={() => {
                    this.remove(scope.row.id);
                  }}
                >
                  删除
                </el-button>
                <el-button
                  type="text"
                  onClick={() => {
                    this.pageManage(scope.row.id);
                  }}
                >
                  页面管理
                </el-button>
              </div>
            )}
          </el-table-column>
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
