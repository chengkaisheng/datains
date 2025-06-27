<template>
  <el-col style="height: 100%">
    <el-row style="height: 100%">
      <el-row style="height: 26px" class="title-text">
        <span style="line-height: 26px">
          在线数据集
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
          <!-- <el-button size="mini" @click="cancel">
            {{ $t("dataset.cancel") }}
          </el-button> -->
          <el-button size="mini" type="primary" @click="save">
            <!-- {{ $t("dataset.confirm") }} -->保存
          </el-button>
        </el-row>
      </el-row>
      <el-divider />

      <div style="margin-top: 10px; height: 100%">
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
  </el-col>
</template>

<script>
import { getOnlineExcelFile, post } from "@/api/dataset/dataset";
// import { getToken } from "@/utils/auth";
// import i18n from "@/lang";
// import { $alert } from "@/utils/message";
import store from "@/store";
import { exportExcel } from "./export";
import LuckyExcel from "luckyexcel";

// const token = getToken();

export default {
  name: "ViewOnlineExcel",
  props: {
    param: {
      type: Object,
      default: null,
    },
    // tableId: {
    //   type: String,
    //   default: "",
    // },
    // editType: {
    //   type: Number,
    //   default: 0,
    // },
  },
  data() {
    return {
      isReadOnly: false,
      isMaskShow: false,
      name: "",
      file: null,
      showLuckysheet: false
    };
  },
  watch: {
    param: function () {
      // this.tabActive = 'dataPreview'
      // this.initTable(this.param.id)
      this.getFileId();
    },
  },
  created() {
    // console.log('this.param', this.param);

    this.getFileId();
  },
  beforeDestroy() {
    document.getElementById('luckysheet-icon-morebtn-div').style.display = 'none'
    this.showLuckysheet = false
  },
  methods: {
    getFileId() {
      if (this.param.id !== null) {
        post("/dataset/table/getWithPermission/" + this.param.id, null)
          .then((response) => {
            this.getFile(response.data.info)
            // this.init(JSON.parse(this.fromBase64(response.data.info)));
          })
          .catch((res) => {
            this.$emit("switchComponent", { name: "" });
          });
      }
    },
    toBase64(str) {
      const bytes = new TextEncoder().encode(str); // UTF-8 编码
      const binary = Array.from(bytes)
        .map((b) => String.fromCharCode(b))
        .join("");
      return btoa(binary);
    },
    fromBase64(base64) {
      const binary = atob(base64);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    },
    getFile(id) {
      getOnlineExcelFile(id).then((response) => {
        response.text().then(text => {
          this.init(JSON.parse(text));
        });
        // const file = new File([response], `${this.param.name}.xlsx`, {
        //   type: response.type,
        //   lastModified: Date.now(),
        // });
        // this.uploadExcel(file);
      });
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
          plugins: [{name: 'chart'},{name: 'print'}],
          data: data || [],
          // 添加只读模式配置
          showtoolbar: !this.isReadOnly, // 是否显示工具栏
          showinfobar: !this.isReadOnly, // 是否显示信息栏
          allowEdit: !this.isReadOnly, // 是否允许编辑
          enableAddRow: !this.isReadOnly, // 是否允许添加行
          enableAddCol: !this.isReadOnly, // 是否允许添加列
          allowCopy: 0
        });
        this.exportXlsx()
      });
    },
    exportXlsx() {
      setTimeout(() => {
        // 管理员角色可以导出
        let index = store.getters.roles.findIndex(item => item.id == 1)
        let exportXlsxDom = document.getElementById('luckysheet-exportXlsx-btn-title')
        let printDom = document.getElementById('luckysheet-icon-print')
        if(index !== -1) {
          let _this = this
          exportXlsxDom.addEventListener('click', async function() {
            await exportExcel(luckysheet.getAllSheets(), _this.param.name, false)
          })
          printDom.addEventListener('click', async function() {
            var selectHtml = luckysheet.getRangeHtml();

            // 创建一个临时窗口或 iframe
            var printWindow = window.open('', '_blank'); // 使用空 URL 打开新窗口

            // 将 HTML 内容插入临时窗口或 iframe
            printWindow.document.write(selectHtml);
            printWindow.document.close();

            // 调用打印功能
            printWindow.print();
          })
        } else {
          exportXlsxDom.style.display = 'none'
          printDom.style.display = 'none'
        }
      }, 1500)
    },
    uploadExcel(file) {
      this.name = file.name;
      const suffixArr = this.name.split(".");
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
              _this.$message.error("无法读取文件内容，请检查文件是否损坏");
            }
          },
          function (err) {
            console.error("Excel解析错误:", err);
            _this.$message.error("无法读取文件内容，请检查文件是否损坏");
          }
        );
      } catch (err) {
        // console.error('Excel转换错误:', err)
        _this.$message.error("无法读取文件内容，请检查文件是否损坏");
      }
    },

    async save() {
      const formData = new FormData();
      // let blob = await exportExcel(luckysheet.getAllSheets(), this.param.name, true)
      // formData.append('file', blob)
      formData.append('file', new Blob([JSON.stringify(luckysheet.getAllSheets())], { type: "text/plain" }))
      // formData.append(
      //   "info",
      //   this.toBase64(JSON.stringify(luckysheet.getAllSheets()))
      // );
      formData.append("id", this.param.id || "");
      formData.append("name", this.param.name || "");
      formData.append("sceneId", this.param.pid || "");
      formData.append("type", "onLineExcel");
      post("/dataset/table/save/onLineExcel", formData).then((response) => {
        this.$emit("saveSuccess", {});
        // this.cancel()
      });
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
  height: calc(100% - 55px);
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
.luckysheet-scrollbars::-webkit-scrollbar {
    width: 12px !important;
    height: 12px !important;
    background-color: #fff;
}
.luckysheet-icon-img-container.iconfont, .luckysheet-submenu-arrow .iconfont {
    font-size: 24px !important;
}
.luckysheet-print {
  p {
    margin: 12px 0;
  }
  .luckysheet-modal-dialog-title-close {
    width: 45px;
    height: 45px;
  }
}
</style>
