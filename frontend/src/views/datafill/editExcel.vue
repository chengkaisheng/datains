<template>
  <div class="edit-excel-container">
    <div class="header">
      <div class="header-left">
        <el-button type="primary" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
      <div v-if="msg.name" class="title">{{ msg.name }}</div>
      <div class="header-right">
        <span style="display: flex; align-items: center;">版本：</span>
        <el-select style="margin-right: 10px;" v-model="versionId" @change="selectVersion" popper-class="versionSelect" placeholder="请选择">
          <el-option
            v-for="item in versionList"
            :key="item.id"
            :label="item.version"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="success" icon="el-icon-check" @click="handleSave">保存</el-button>
      </div>
    </div>
    <div
      id="luckysheet"
      class="luckysheet-container"
    />

    <div v-show="isMaskShow" class="download-mask">
      <div class="download-content">
        <i class="el-icon-loading" />
        <div class="download-text">正在加载数据...</div>
      </div>
    </div>
  </div>
</template>

<script>
// import datafill from '@/api/datafill/datafill'
import { getFormData, saveFormData, getFormDataData, deleteForm } from '@/views/dataFilling/form/dataFilling'
import { exportExcel } from './export'
export default {
  name: 'EditExcel',
  props: {
    msg: {
      type: Object,
      default: () => {}
    },
    drawer: {
      type: Boolean,
      default: false
    },
    currentFormId: {
      type: String,
      default: ''
    },
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: '',
      isMaskShow: false,
      currentFormDataId: '',
      versionList: [],
      versionId: undefined,
    }
  },
  watch: {
    currentFormId(newVal) {
      this.currentFormDataId = newVal
    }
  },
  mounted() {
    if (this.msg.data) {
      this.init(this.msg.data, 'save')
    } else {
      this.currentFormDataId = this.msg.id
      this.getFormData()
    }
  },
  methods: {
    init(data, type) {
      this.isMaskShow = true
      this.$nextTick(() => {
        this.isMaskShow = false
        luckysheet.destroy()
        luckysheet.create({
          container: 'luckysheet', // 设定DOM容器的id
          title: this.msg.name, // 设定表格名称
          lang: 'zh', // 设定表格语言
          plugins: ['chart'],
          data: data || [],
          // 添加只读模式配置
          showtoolbar: !this.isReadOnly, // 是否显示工具栏
          showinfobar: !this.isReadOnly, // 是否显示信息栏
          allowEdit: !this.isReadOnly, // 是否允许编辑
          enableAddRow: !this.isReadOnly, // 是否允许添加行
          enableAddCol: !this.isReadOnly // 是否允许添加列
        })
        if (type === 'save') {
          this.$emit('addDataFill')
        }
      })
    },
    getFormData(isInit) {
      getFormData(this.currentFormDataId).then(res => {
        this.versionList = res.data
        this.versionId = res.data[0].id
        isInit ? null : this.getDataVersion()
      })
    },
    // 获取不同版本的数据
    getDataVersion() {
      let formId = this.versionList.find(item => item.id === this.versionId).formId
      getFormDataData(formId, this.versionId).then(res => {
        // 返回文件流
        this.fileToData(new Blob([res], {
          type: 'application/vnd.ms-excel;charset=utf-8'
        }))
      })
    },
    fileToData(file) {
      file.name = this.msg.name + '.xlsx'
      let _this = this
      try {
        LuckyExcel.transformExcelToLucky(
          file,
          function(exportJson, luckysheetfile) {
            try {
              if (
                !exportJson ||
                !exportJson.sheets ||
                exportJson.sheets.length === 0
              ) {
                _this.$message.error(
                  '无法读取Excel文件的内容，目前不支持xls文件！'
                )
                return
              }
              _this.init(exportJson.sheets)
            } catch (err) {
              console.error('处理Excel数据错误:', err)
              _this.$message.error('无法读取文件内容，请检查文件是否损坏')
            }
          },
          function(err) {
            console.error('Excel解析错误:', err)
            _this.$message.error('无法读取文件内容，请检查文件是否损坏')
          }
        )
      } catch (err) {
        console.error('Excel转换错误:', err)
        _this.$message.error('无法读取文件内容，请检查文件是否损坏')
      }
    },
    selectVersion(value) {
      this.versionId = value
      this.getDataVersion()
    },
    handleBack() {
      luckysheet.destroy()
      this.$emit('update:drawer', false)
    },
    handleSave(type) {
      this.$confirm('保存会创建一个新版本', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveFile()
      }).catch(() => {
      })
    },
    async saveFile(id) {
      // 无id表示需要从页面获取文件进行保存
      let blob = null;
      if(!id) {
        blob = await exportExcel(luckysheet.getAllSheets(), this.msg.name, true)
      }
      this.currentFormDataId = id ? id : this.currentFormDataId
      const formData = new FormData();
      formData.append('file', id ? this.msg.file : blob)
      saveFormData(this.currentFormDataId, formData).then(res => {
        if (res.success) {
          // true 表示初始化保存只需要获取版本  false 需要获取版本并重新渲染
          this.getFormData(id ? true : false);
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-excel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e6e6e6;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.header .title {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 50%;
}

.header .header-left, .header .header-right {
  flex: 1;
}

.header .header-left {
  display: flex;
  justify-content: flex-start;
}

.header .header-right {
  display: flex;
  justify-content: flex-end;
}

.luckysheet-container {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  left: 0;
  top: 50px;
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
  color: #409EFF;
  margin-bottom: 20px;
}

.download-text {
  font-size: 20px;
  color: #303133;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.versionSelect {
  li {
    display: block;
  }
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
