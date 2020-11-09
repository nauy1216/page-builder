<script lang="tsx">
import { getDialog } from "wepage-admin/components/Dialog";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";

@Component({})
export default class PageManage extends BaseVue {
  tableData = [];
  formData = {
    appId: "",
    pageName: "",
    pageType: "web"
  };
  rules = {};

  created() {
    this.getPageList();
  }

  getPageList() {
    this.$ajax("get", this.$api.pageList, {
      appId: this.$route.query.appId
    }).then(res => {
      this.tableData = res.data;
    });
  }

  editPage(pageId) {
    this.$router.push(`/editor?appId=${this.$route.query.appId}&pageId=` + pageId);
  }

  createApp() {
    getDialog()
      .show({
        title: "创建页面",
        renderContent: () => {
          return (
            <el-form ref="form" {...{ props: { model: this.formData } }} rules={this.rules} label-width="80px">
              <el-form-item label="页面名称" prop="pageName">
                <el-input vModel={this.formData.pageName}></el-input>
              </el-form-item>
              <el-form-item label="页面类型" prop="pageType">
                <el-input vModel={this.formData.pageType}></el-input>
              </el-form-item>
            </el-form>
          );
        }
      })
      .then(() => {
        this.formData.appId = this.$route.query.appId as any;
        this.$ajax("postJson", this.$api.pageAdd, this.formData).then(() => {
          this.$message.success("操作成功");
          this.getPageList();
        });
      });
  }

  render() {
    return (
      <div class="app-manage">
        <div class="opera">
          <el-button onClick={this.createApp}>创建页面</el-button>
        </div>
        <el-table data={this.tableData} style="width: 100%">
          <el-table-column prop="id" label="ID" width="300"></el-table-column>
          <el-table-column prop="pageName" label="名称" width="180"></el-table-column>
          <el-table-column prop="pageType" label="类型" width="180"></el-table-column>
          <el-table-column
            label="操作"
            scopedSlots={{
              default: scope => {
                return (
                  <el-button
                    type="text"
                    onClick={() => {
                      this.editPage(scope.row.id);
                    }}
                  >
                    编辑页面
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
.opera {
  margin: 20px;
}
</style>
