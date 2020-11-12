<script lang="tsx">
import { getDialog } from "wepage-admin/components/dialog/index";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";

@Component({})
export default class PageManage extends BaseVue {
  tableData = [];
  formData = {
    appId: "",
    pageName: ""
  };
  rules = {};

  created() {
    this.list();
  }

  addOrUpdate() {
    this.formData.appId = this.$route.query.appId as any;
    this.$ajax("postJson", this.$api.pageAdd, {
      id: "",
      appId: this.formData.appId,
      pageName: this.formData.pageName,
      designWidth: 1920,
      designHeight: 1080,
      desc: "",
      config: ""
    }).then(() => {
      this.$message.success("操作成功");
      this.list();
    });
  }

  list() {
    this.$ajax("get", this.$api.pageList, {
      appId: this.$route.query.appId
    }).then(res => {
      this.tableData = res.data;
    });
  }

  remove(id) {
    this.$ajax("get", this.$api.pageDelete, { id }).then(() => {
      this.$message.success("删除成功");
      this.list();
    });
  }

  editPage(pageId) {
    this.$router.push(`/editor?appId=${this.$route.query.appId}&pageId=` + pageId);
  }

  preview(pageId) {
    const host = process.env.VUE_APP_PAGE_SHOW_HOST || location.origin;
    window.open(`${host}/${this.$route.query.appId}#/page/${pageId}`);
  }

  createPage() {
    getDialog()
      .show({
        dialogProps: {
          title: "创建页面"
        },
        renderContent: () => {
          return (
            <el-form ref="form" {...{ props: { model: this.formData } }} rules={this.rules} label-width="80px">
              <el-form-item label="页面名称" prop="pageName">
                <el-input vModel={this.formData.pageName}></el-input>
              </el-form-item>
            </el-form>
          );
        }
      })
      .then(() => {
        this.addOrUpdate();
      });
  }

  render() {
    return (
      <div class="app-manage">
        <div class="opera">
          <el-button onClick={this.createPage}>创建页面</el-button>
        </div>
        <el-table data={this.tableData} style="width: 100%">
          <el-table-column prop="id" label="ID" width="300"></el-table-column>
          <el-table-column prop="pageName" label="名称" width="180"></el-table-column>
          <el-table-column
            label="操作"
            scopedSlots={{
              default: scope => {
                return (
                  <div>
                    <el-button
                      type="text"
                      onClick={() => {
                        this.editPage(scope.row.id);
                      }}>
                      编辑页面
                    </el-button>
                    <el-button
                      type="text"
                      onClick={() => {
                        this.preview(scope.row.id);
                      }}>
                      预览
                    </el-button>
                    <el-button
                      type="text"
                      onClick={() => {
                        this.remove(scope.row.id);
                      }}>
                      删除
                    </el-button>
                  </div>
                );
              }
            }}></el-table-column>
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
