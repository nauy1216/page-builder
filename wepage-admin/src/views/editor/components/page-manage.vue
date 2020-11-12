<script lang="tsx">
import { getDialog } from "wepage-admin/components/dialog/index";
import { Component } from "vue-property-decorator";
import BaseVue from "wepage-admin/BaseVue";
import { PageStore } from "wepage-admin/store/modules";

@Component({})
export default class PageManage extends BaseVue {
  tableData: any[] = [];
  formData = {
    appId: "",
    pageName: ""
  };
  rules = {};

  currentPageId = "";

  async created() {
    await this.list();
    debugger;
    if (this.tableData && this.tableData.length > 0) {
      this.getPageConfig(this.tableData[0].id);
    } else {
      this.getPageConfig();
    }
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
    return this.$ajax("get", this.$api.pageList, {
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
      .then(action => {
        if (action === "confirm") {
          this.addOrUpdate();
        }
      });
  }

  // 获取页面配置
  getPageConfig(pageId?: string) {
    PageStore.initPageConfig();
    if (pageId) {
      this.currentPageId = pageId;
      this.$ajax("get", this.$api.getPageConfig, { pageId }).then(res => {
        PageStore.setPage(res.data);
        if (res.data.config) {
          try {
            const pageConfig: PageConfig = JSON.parse(res.data.config);
            if (pageConfig) {
              PageStore.setActiveLayout(pageConfig.layouts[0]);
              PageStore.setPageConfig(pageConfig);
            }
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  }

  render() {
    return (
      <div class="page-manage">
        <div class="btn">
          <el-button onClick={this.createPage}>
            <i class="el-icon-plus"></i>创建页面
          </el-button>
        </div>
        <ul class="page-list">
          {this.tableData.map(page => {
            return (
              <li
                staticClass="page-list-item"
                class={{ "page-list-item--active": this.currentPageId === page.id }}
                onClick={() => {
                  this.getPageConfig(page.id);
                }}>
                <div>{page.pageName}</div>
                <div>
                  <el-dropdown trigger="hover">
                    <i class="el-icon-more"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        nativeOnclick={() => {
                          this.editPage(page.id);
                        }}>
                        编辑页面
                      </el-dropdown-item>
                      <el-dropdown-item
                        nativeOnclick={() => {
                          this.preview(page.id);
                        }}>
                        预览
                      </el-dropdown-item>
                      <el-dropdown-item
                        nativeOnclick={() => {
                          this.remove(page.id);
                        }}>
                        删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
</script>
<style scoped lang="scss">
.page-manage {
  margin-bottom: 20px;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    .el-icon-plus {
      margin-right: 10px;
    }
  }
  .page-list-item {
    padding: 0 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--active {
      background-color: #f5f7fa;
    }
    &:hover {
      background-color: #f5f7fa;
    }
    border-bottom: 1px solid rgb(235, 238, 245);
    .el-icon-more {
      cursor: pointer;
    }
  }
}
</style>
