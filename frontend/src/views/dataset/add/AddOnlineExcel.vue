<template>
  <el-col style="height: 100%">
    <el-row style="height: 100%">
      <el-row style="height: 26px" class="title-text">
        <span style="line-height: 26px">
          添加在线数据集
          <!-- {{ param.tableId?$t('dataset.edit_excel_table'):$t('dataset.add_excel_table') }} -->
        </span>
        <!-- <span style="line-height: 26px;">
          <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="bottom">
            <div slot="content">
              {{ $t('dataset.excel_info_1') }}<br>
              {{ $t('dataset.excel_info_2') }}<br>
              {{ $t('dataset.excel_info_3') }}
            </div>
            <i class="el-icon-info" style="cursor: pointer;" />
          </el-tooltip>
        </span> -->
        <el-row style="float: right">
          <el-button size="mini" @click="cancel">
            {{ $t("dataset.cancel") }}
          </el-button>
          <el-button size="mini" type="primary" @click="save">
            {{ $t("dataset.confirm") }}
          </el-button>
        </el-row>
      </el-row>
      <el-divider />

      <div style="margin-top: 10px; height: 100%">
        <div class="btn" style="display: flex;align-items: center;">
          <el-button
            style="margin-right: 20px;"
            size="mini"
            type="primary"
            @click="uploadFile"
          >
            上传文件
          </el-button>
          <el-button size="mini" type="primary" @click="openDialog">
            选择数据集
          </el-button>
          <div style="width: 95px;margin-left: 30px;font-size: 12px;">数据集名称：</div>
          <el-input style="width: 200px" size="mini" v-model="name"></el-input>
        </div>

        <div class="excel" >
          <div v-if="showLuckysheet" id="luckysheet" class="luckysheet-container" />

          <!-- <div v-show="isMaskShow" class="download-mask">
            <div class="download-content">
              <i class="el-icon-loading" />
              <div class="download-text">正在加载数据...</div>
            </div>
          </div> -->
        </div>
      </div>
    </el-row>

    <el-dialog
      v-dialogDrag
      :visible="visible"
      title="数据集"
      width="50%"
    >
      <el-col>
        <el-row style="margin-bottom: 10px">
          <el-col :span="8">
            <el-input
              v-model="filterText"
              size="mini"
              :placeholder="$t('commons.search')"
              prefix-icon="el-icon-search"
              clearable
              class="main-area-input"
            />
          </el-col>
          <el-col :span="8">
            <el-dropdown style="margin-left: 20px;">
              <el-button size="mini" type="primary">
                {{ searchMap[searchType] }}<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="searchTypeClick('all')">{{ $t('commons.all') }}</el-dropdown-item>
                <el-dropdown-item @click.native="searchTypeClick('folder')">{{ this.$t('commons.folder') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
      <el-col>
        <div style="height: 400px;overflow: scroll;">
          <el-tree
            ref="datasetTreeRef"
            :default-expanded-keys="expandedArray"
            :data="tData"
            node-key="id"
            highlight-current
            :expand-on-click-node="true"
            :filter-node-method="filterNode"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
            @node-click="nodeClick"
          >
            <span
              v-if="data.modelInnerType === 'group'"
              slot-scope="{ node, data }"
              class="custom-tree-node father"
            >
              <span style="display: flex; flex: 1; width: 0">
                <span>
                  <i class="el-icon-folder" />
                </span>
                <span
                  style="
                    margin-left: 6px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                  :title="data.name"
                  >{{ data.name }}</span
                >
              </span>
            </span>
            <span
              v-else
              slot-scope="{ node, data }"
              class="custom-tree-node-list father"
            >
              <span style="display: flex; flex: 1; width: 0">
                <span>
                  <svg-icon v-if="data.modelInnerType === 'db'" icon-class="ds-db" class="ds-icon-db" />
                  <svg-icon v-if="data.modelInnerType === 'sql'" icon-class="ds-sql" class="ds-icon-sql" />
                  <svg-icon v-if="data.modelInnerType === 'excel'" icon-class="ds-excel" class="ds-icon-excel" />
                  <!-- <svg-icon v-if="data.modelInnerType === 'onLineExcel'" icon-class="ds-excel" class="ds-icon-excel" /> -->
                  <i v-if="data.modelInnerType === 'onLineExcel'"  class="el-icon-edit-outline ds-icon-excel"></i>
                  <svg-icon v-if="data.modelInnerType === 'custom'" icon-class="ds-custom" class="ds-icon-custom" />
                  <svg-icon v-if="data.modelInnerType === 'union'" icon-class="ds-union" class="ds-icon-union" />
                  <svg-icon v-if="data.modelInnerType === 'api'" icon-class="ds-api" class="ds-icon-api" />
                </span>
                <span v-if="data.modelInnerType === 'db' || data.modelInnerType === 'sql'">
                  <span v-if="data.mode === 0" style="margin-left: 6px"><i class="el-icon-s-operation" /></span>
                  <span v-if="data.mode === 1" style="margin-left: 6px"><i class="el-icon-alarm-clock" /></span>
                </span>
                <span style="margin-left: 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" :title="data.name">{{ data.name }}</span>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close()">{{
          $t("dataset.cancel")
        }}</el-button>
        <el-button type="primary" size="mini" @click="confirm"
          >{{ $t("dataset.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { post, getOnlineExcelFile } from "@/api/dataset/dataset";
import { getToken } from "@/utils/auth";
import i18n from "@/lang";
import { $alert } from "@/utils/message";
import store from "@/store";
import { queryAuthModel } from '@/api/authModel/authModel'
// import { exportExcel } from "../data/export";
import { dataToExcelBlob } from '@/utils/dataToExcelBlob'
import LuckyExcel from "luckyexcel";

const token = getToken();

export default {
  name: "AddExcel",
  props: {
    param: {
      type: Object,
      default: null,
    },
    tableId: {
      type: String,
      default: "",
    },
    editType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // sheetObj: { datasetName: ' ', fields: [] },
      // sheets: [],
      // data: [],
      mode: "1",
      // height: 600,
      filterText: '',
      searchPids: [], // 查询命中的pid
      searchType: 'all',
      searchMap: {
        all: this.$t('commons.all'),
        folder: this.$t('commons.folder')
      },
      uploading: false,
      isMaskShow: false,
      showLuckysheet: false,
      name: "",
      file: null,
      visible: false,
      tData: [],
      expandedArray: [],
      selectedData: null,
      table: {
        name: ''
      },
      page: {
        page: 1,
        pageSize: 65535,
        show: 65535
      },
      tableViewRowForm: {
        row: 65535
      },
      _unhandledRejectionHandler: null
    };
  },
  watch: {
    filterText(val) {
      this.searchPids = []
      this.$refs.datasetTreeRef.filter(val)
    },
    searchType(val) {
      this.searchPids = []
      this.$refs.datasetTreeRef.filter(this.filterText)
    }
  },
  mounted() {
  },
  created() {
    if (!this.param.tableId) {
      this.param.tableId = "";
    }
    if (!this.param.editType) {
      this.param.editType = 0;
    }
    let _this = this
    this._unhandledRejectionHandler = function (event) {
      if(event.reason.stack.includes('luckysheet.umd.js')) {
        _this.$message.error('导入失败，此表格可能引用其他表格数据，请断开表格链接后再尝试导入。')
        _this.refresh()
      }
    }
    window.addEventListener("unhandledrejection", this._unhandledRejectionHandler);
  },
  beforeDestroy() {
    window.removeEventListener("unhandledrejection", this._unhandledRejectionHandler)
  },
  methods: {
    refresh() {
      this.showLuckysheet = false
    },
    init(data) {
      this.showLuckysheet = true
      this.isMaskShow = true;
      this.$nextTick(() => {
        this.isMaskShow = false;
        luckysheet.destroy();
        luckysheet.create({
          container: "luckysheet", // 设定DOM容器的id
          title: this.name, // 设定表格名称
          lang: "zh", // 设定表格语言
          plugins: ["chart"],
          data: data || [],
          // 添加只读模式配置
          showtoolbar: !this.isReadOnly, // 是否显示工具栏
          showinfobar: !this.isReadOnly, // 是否显示信息栏
          allowEdit: !this.isReadOnly, // 是否允许编辑
          enableAddRow: !this.isReadOnly, // 是否允许添加行
          enableAddCol: !this.isReadOnly, // 是否允许添加列
          allowCopy: false
        });
      });
    },
    uploadFile() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx"; // 可指定类型，如 ',.csv,.txt'

      input.onchange = () => {
        const file = input.files[0];
        if (file) {
          console.log("用户选择的文件:", file);
          // 可上传或读取内容
          this.file = file;
          this.uploadExcel(file);
        }
      };

      input.click(); // 打开文件选择对话框
    },
    uploadExcel(file) {
      const name = file.name;
      const suffixArr = name.split(".");
      this.name = suffixArr[0];
      const suffix = suffixArr[suffixArr.length - 1];
      if (suffix != "xlsx") {
        this.$message.error("目前只支持xlsx文件");
        return;
      }
      const _this = this;

      try {
        LuckyExcel.transformExcelToLucky(
          file,
          function (exportJson, luckysheetfile) {
            try {
              if (
                !exportJson ||
                !exportJson.sheets ||
                exportJson.sheets.length === 0
              ) {
                _this.$message.error(
                  "无法读取Excel文件的内容，目前不支持xls文件！"
                );
                return;
              }
              _this.init(exportJson.sheets);
              // _this.excelJson = exportJson
            } catch (err) {
              // console.error('处理Excel数据错误:', err)
              _this.$message.error("无法读取文件内容，请检查文件是否损坏1");
            }
          },
          function (err) {
            console.error("Excel解析错误:", err);
            _this.$message.error("无法读取文件内容，请检查文件是否损坏2");
          }
        );
      } catch (err) {
        // console.error('Excel转换错误:', err)
        _this.$message.error("无法读取文件内容，请检查文件是否损坏3");
      }
    },

    async save() {
      // let blob = await exportExcel(luckysheet.getAllSheets(), this.name, true)
      // console.log('blob', blob)
      const formData = new FormData();
      // formData.append('file', blob)
      formData.append('file', new Blob([JSON.stringify(luckysheet.getAllSheets())], { type: "text/plain" }))
      // formData.append(
      //   "info",
      //   this.toBase64(JSON.stringify(luckysheet.getAllSheets()))
      // );
      formData.append("id", this.param.tableId || "");
      formData.append("name", this.name || "");
      formData.append("sceneId", this.param.id || "");
      formData.append("type", "onLineExcel");
      post("/dataset/table/save/onLineExcel", formData).then((response) => {
        this.$emit("saveSuccess", {});
        this.cancel();
      });
    },
    toBase64(str) {
      const bytes = new TextEncoder().encode(str); // UTF-8 编码
      const binary = Array.from(bytes)
        .map((b) => String.fromCharCode(b))
        .join("");
      return btoa(binary);
    },
    cancel() {
      this.dataReset();
      if (this.param.tableId) {
        this.$emit("switchComponent", {
          name: "ViewTable",
          param: this.param.table,
        });
      } else {
        this.$emit("switchComponent", { name: "" });
      }
    },
    dataReset() {
      this.name = "";
    },
    close() {
      this.visible = false
      this.tData = []
      this.selectedData = null
    },
    confirm() {
      if(!this.selectedData) {
        this.$message.warning('请选择数据集！')
        return
      }

      this.visible = false
      // 获取 数据集 数据
      this.initTable(this.selectedData.id)
      
    },
    initTable(id) {
      this.tableViewRowForm.row = 65535
      if (id !== null) {
        post('/dataset/table/getWithPermission/' + id, null).then(response => {
          if(this.selectedData.modelInnerType === 'onLineExcel') {
            getOnlineExcelFile(response.data.info).then((res) => {
              res.text().then(text => {
                this.name = response.data.name
                this.init(JSON.parse(text));
              });
            });
          } else {
            this.table = response.data
            this.initPreviewData(this.page)
          }
        })
      }
    },

    initPreviewData(page) {
      if (this.table.id) {
        this.table.row = this.tableViewRowForm.row
        post('/dataset/table/getPreviewData/' + page.page + '/' + page.pageSize, this.table, true, 30000).then(response => {
          if(response.success) {
            // this.page = response.data.page
            // 需要将 fields 与 data 结合
            const data = this.formatterData(response.data.fields, response.data.data)
            const blob = dataToExcelBlob(data)
            blob.name = this.selectedData.name + '.xlsx'
            this.uploadExcel(blob)
          }
          if (response.data.status === 'warnning') {
            this.$warning(response.data.msg, 3000)
          }
          if (response.data.status === 'error') {
            this.$error(response.data.msg, 3000)
          }
        }).catch(response => {
          this.page = {
            page: 1,
            pageSize: 65535,
            show: 0
          }
        })
      }
    },
    // 构造出excel可用的数据结构
    formatterData(fields, data) {
      // 提取字段标题和字段映射顺序（按 columnIndex 排序）
      const visibleFields = fields
        .filter(f => f.checked)
        .sort((a, b) => a.columnIndex - b.columnIndex);
      const headerRow = visibleFields.map(f => f.name); // 表头
      const keys = visibleFields.map(f => f.datainsName);     // 用于读取 data 的 key
      const tableData = data.map(item => keys.map(k => item[k]));
      return [headerRow, ...tableData];
    },
    openDialog() {
      this.visible = true
      this.treeNode()
    },
    treeNode(cache) {
      const modelInfo = localStorage.getItem('dataset-tree')
      const userCache = (modelInfo && cache)
      if (userCache) {
        // this.tData = this.filterData(JSON.parse(modelInfo))
        this.tData = JSON.parse(modelInfo)
      }
      queryAuthModel({ modelType: 'dataset' }, !userCache).then(res => {
        localStorage.setItem('dataset-tree', JSON.stringify(res.data))
        if (!userCache) {
          this.tData = res.data
        }
      })
    },
    // 过滤出 文件夹 以及 数据库数据集
    // filterData(data) {
    //   let arr = []
    //   data.map(item => {
    //     if(item.children && item.children.length > 0) {
    //       item.children = this.filterData(item.children)
    //     }
    //     if(item.modelInnerType === 'group' || item.modelInnerType === 'db') {
    //       arr.push(item)
    //     }
    //   })
    //   return arr
    // },
    filterNode(value, data) {
      if (!value) return true
      if (this.searchType === 'folder') {
        if (data.modelInnerType === 'group' && data.label.indexOf(value) !== -1) {
          this.searchPids.push(data.id)
          return true
        }
        if (this.searchPids.indexOf(data.pid) !== -1) {
          if (data.modelInnerType === 'group') {
            this.searchPids.push(data.id)
          }
          return true
        }
      } else {
        return data.label.indexOf(value) !== -1
      }
      return false
    },
    nodeExpand(data) {
      if (data.id) {
        this.expandedArray.push(data.id)
      }
    },
    nodeCollapse(data) {
      if (data.id) {
        this.expandedArray.splice(this.expandedArray.indexOf(data.id), 1)
      }
    },
    nodeClick(data, node) {
      if (data.modelInnerType !== 'group') {
        this.selectedData = data
      }
    },
    searchTypeClick(searchTypeInfo) {
      this.searchType = searchTypeInfo
    },
  },
};
</script>

<style scoped>
.el-divider--horizontal {
  margin: 12px 0;
}

.form-item {
  margin-bottom: 6px !important;
}

.el-checkbox {
  margin-bottom: 14px;
  margin-left: 0;
  margin-right: 14px;
}

.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}

span {
  font-size: 14px;
}

.row-style >>> .el-form-item__label {
  font-size: 12px;
}

.dataPreview >>> .el-card__header {
  padding: 6px 8px;
}

.dataPreview >>> .el-card__body {
  padding: 10px;
}

.el-header {
  background-color: var(--ContentBG, rgb(241, 243, 248));
  color: var(--TextActive, #333);
  line-height: 30px;
}

.el-main {
  padding: 0px;
}

.limit-length-data {
  font-size: 12px;
  color: var(--TableColor, #3d4d66);
}

.excel {
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
}

.luckysheet-container {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  left: 0;
  top: 12px;
  bottom: 0;
}

.download-mask {
  position: absolute;
  z-index: 1000000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.download-content i {
  font-size: 42px;
  color: #409eff;
  margin-bottom: 20px;
}

.download-text {
  font-size: 20px;
  color: #303133;
}
</style>

<style scoped>
  .el-divider--horizontal {
    margin: 12px 0
  }

  .search-input {
    padding: 12px 0;
  }

  .custom-tree-container{
    margin-top: 10px;
  }

  .tree-list>>>.el-tree-node__expand-icon.is-leaf{
    display: none;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right:8px;
  }

  .custom-tree-node-list {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding:0 8px;
  }

  .custom-position {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    flex-flow: row nowrap;
  }

  .form-item {
    margin-bottom: 0;
  }

  .title-css {
    height: 26px;
  }

  .title-text {
    line-height: 26px;
  }

  .scene-title{
    width: 100%;
    display: flex;
  }
  .scene-title-name{
    width: 100%;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .father .child {
    visibility: hidden;
  }
  .father:hover .child {
    visibility: visible;
  }

  .dialog-css >>> .el-dialog__body {
    padding: 10px 20px 20px;
  }

  .inner-dropdown-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%
  }
  .tree-style {
    padding: 10px 15px;
    height: 100%;
    overflow-y: auto;
  }
</style>

<style>
.luckysheet_info_detail {
  display: none !important;
}
.luckysheet-input-box {
  z-index: 1000000 !important;
}
.luckysheet-cols-menu {
  z-index: 1000000 !important;
}
.luckysheet-rows-menu {
  z-index: 1000000 !important;
}
</style>
