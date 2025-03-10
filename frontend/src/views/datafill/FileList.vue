<template>
  <div class="fill_box">
    <div class="header" style="display: flex; justify-content: space-between;">
      <div>
        <el-button type="primary" @click="handleFill">填报</el-button>
        <el-input v-model="searchName" placeholder="请输入内容" clearable style="width: 200px;margin-left: 10px;" @keyup.enter.native="getDataFill()">
          <el-button slot="append" icon="el-icon-search" @click="getDataFill()" />
        </el-input>
      </div>
      <div>
        <el-button type="primary" @click="refresh">刷新</el-button>
      </div>
    </div>
    <div v-loading="tableLoading" class="list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" width="200" />
        <el-table-column prop="nodeType" label="类型" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.nodeType === 'form'">模板填报</span>
            <span v-else-if="scope.row.nodeType === 'selfReport'">自主填报</span>
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="200" />
        <el-table-column prop="createTime" label="创建时间" :formatter="formatDate" />
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              v-if="hasDataPermission('export', scope.row.privileges)"
              size="mini"
              type="success"
              @click="handleFileDownload(scope.row)"
            >下载</el-button>
            <el-button
              v-if="scope.row.nodeType === 'selfReport' && hasDataPermission('use', scope.row.privileges) && !hasDataPermission('write', scope.row.privileges)"
              size="mini"
              type="warning"
              @click="handleFilePreview(scope.row)"
            >在线查看</el-button>
            <el-button
              v-if="scope.row.nodeType === 'selfReport' && hasDataPermission('write', scope.row.privileges)"
              size="mini"
              type="warning"
              @click="handleExcelEdit(scope.row)"
            >在线编辑</el-button>
            <el-button
              v-if="scope.row.nodeType === 'form'"
              size="mini"
              type="primary"
              @click="handleDetail(scope.row)"
            >详情</el-button>
            <el-button
              v-if="hasDataPermission('manage', scope.row.privileges)"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加分页组件 -->
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="goPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <el-drawer
      v-if="drawer"
      title="编辑"
      :with-header="false"
      :visible.sync="drawer"
      :before-close="handleClose"
      size="100%"
      :wrapper-closable="false"
      direction="rtl"
    >
      <EditExcel :current-form-id="currentFormId" :drawer.sync="drawer" :msg="msg" :is-read-only="isReadOnly" @addDataFill="addDataFill" />
    </el-drawer>

    <!-- 添加上传文件对话框 -->
    <el-dialog
      title="上传文件"
      :visible.sync="uploadDialogVisible"
      width="500px"
    >
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        :rules="uploadRules"
        label-width="100px"
      >
        <el-form-item label="文件名称" prop="name">
          <el-input v-model="uploadForm.name" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="选择文件" prop="file">
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              {{ fillForm.isAI ? '支持 Excel、PDF、Word、图片(jpg/png) 格式' : '目前只支持xlsx文件' }}
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="selfUploadLoading" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加填报对话框 -->
    <el-dialog
      title="填报"
      :visible.sync="fillDialogVisible"
      width="500px"
    >
      <el-form
        ref="fillForm"
        :model="fillForm"
        :rules="fillRules"
        label-width="100px"
      >
        <el-form-item label="填报类型" prop="type">
          <el-select v-model="fillForm.type" placeholder="请选择填报类型">
            <el-option label="模板填报" value="form" />
            <el-option label="自主填报" value="selfReport" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="fillForm.type === 'form'" label="选择模板" prop="templateId">
          <el-select
            v-model="fillForm.templateId"
            placeholder="请选择模板"
            filterable
            remote
            :remote-method="remoteSearch"
            :loading="loading"
            @focus="handleFocus"
          >
            <el-option
              v-for="item in templateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否开启AI" prop="isAI">
          <el-switch v-model="fillForm.isAI" />
        </el-form-item>
        <div v-show="fillForm.type === 'form' && fillForm.templateId" style="display: flex; justify-content: center;">
          <el-button style="margin-right: 10px;" type="primary" @click="downloadTemplate(fillForm.templateId)">下载模板</el-button>
          <el-upload
            :action="`${baseUrl}dataFilling/form/${fillForm.templateId}/excel/upload`"
            :multiple="false"
            :show-file-list="false"
            :file-list="templateFileList"
            :data="{}"
            accept="*"
            name="file"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadFail"
            :headers="headers"
          >
            <el-button
              style="margin-left: 10px"
              icon="el-icon-upload2"
              :loading="templateUploadLoading"
            >上传
            </el-button>
          </el-upload>
        </div>
        <div v-show="fillForm.type === 'selfReport'" style="display: flex; justify-content: center;">
          <el-button style="margin-right: 10px;" icon="el-icon-upload2" @click="handleUpload">上传</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 添加详情抽屉 -->
    <el-drawer
      v-if="detailDrawer"
      title="详情"
      :visible.sync="detailDrawer"
      :before-close="handleDetailClose"
      size="100%"
      :wrapper-closable="false"
      direction="rtl"
    >
      <no-select v-if="!displayFormData" />
      <view-table
        v-else
        :param="displayFormData"
        @editForm="editForm"
      />
    </el-drawer>
  </div>
</template>

<script>
import EditExcel from './editExcel.vue'
import ViewTable from '@/views/dataFilling/form/ViewTable.vue'
import NoSelect from '@/views/dataFilling/form/NoSelect.vue'
import datafill from '@/api/datafill/datafill'
import { exportExcel } from './export'
import {
  deleteForm,
  downloadTemplate,
  excelUploadAiHandle,
  getWithPrivileges,
  saveForm
} from '@/views/dataFilling/form/dataFilling'
import { getToken } from '@/utils/auth'
import i18n from '@/lang'

const token = getToken()

export default {
  name: 'FileList',
  components: {
    EditExcel,
    ViewTable,
    NoSelect
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      headers: {
        Authorization: token,
        'Accept-Language': i18n.locale.replace('_', '-')
      },
      templateFileList: [],
      tableData: [],
      goPage: 1,
      pageSize: 10,
      total: 0,
      drawer: false,
      uploadDialogVisible: false,
      uploadForm: {
        name: '',
        file: null
      },
      uploadRules: {
        name: [{ required: true, message: '请输入文件名称', trigger: 'blur' }],
        file: [
          { required: true, message: '请选择要上传的文件', trigger: 'change' }
        ]
      },
      msg: {},
      fileList: [],
      fillDialogVisible: false,
      fillForm: {
        type: '',
        templateId: '',
        isAI: true
      },
      fillRules: {
        type: [
          { required: true, message: '请选择填报类型', trigger: 'change' }
        ],
        templateId: [
          { required: true, message: '请选择模板', trigger: 'change' }
        ]
      },
      templateList: [],
      searchName: '',
      detailDrawer: false,
      displayFormData: undefined,
      loading: false,
      currentFormId: '',
      templateUploadLoading: false,
      selfUploadLoading: false,
      isReadOnly: false,
      tableLoading: false
    }
  },
  watch: {
    nodeData: {
      handler(newVal) {
        if (newVal.id) {
          this.getDataFill()
        }
      },
      deep: true
    },
    drawer: {
      handler(newVal) {
        if (newVal === false) {
          this.getDataFill()
        }
      }
    }
  },
  methods: {
    handleFill() {
      this.fillDialogVisible = true
      this.fillForm = {
        type: '',
        templateId: '',
        isAI: true
      }
      // 如果需要获取模板列表，可以在这里调用接口
      this.getTemplateList()
    },
    getTemplateList() {
      // TODO: 调用获取模板列表接口
      this.getDataFill('form')
    },
    submitFill() {
      this.$refs.fillForm.validate((valid) => {
        if (valid) {
          if (this.fillForm.type === 'form' && !this.fillForm.templateId) {
            this.$message.error('请选择模板')
            return
          }
          // TODO: 调用填报提交接口
          console.log('提交填报', this.fillForm)
          this.fillDialogVisible = false
        }
      })
    },
    refresh() {
      this.goPage = 1
      this.searchName = ''
      this.getDataFill()
    },
    getDataFill(nodeType) {
      this.tableLoading = true
      const params = {
        goPage: this.goPage,
        pageSize: nodeType === 'form' ? 100000 : this.pageSize,
        data: {
          pid: this.nodeData.id,
          name: this.searchName,
          nodeType: nodeType || ''
        }
      }
      datafill.getAllFill(params).then((res) => {
        console.log('res', res)
        if (nodeType === 'form') {
          this.templateList = res.data.listObject || []
        } else {
          this.tableData = res.data.listObject || []
          this.total = res.data.itemCount || 0
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.goPage = 1
      this.getDataFill()
    },
    handleCurrentChange(val) {
      this.goPage = val
      this.getDataFill()
    },
    handleFileEdit(file) {
      console.log('编辑文件', file)
    },
    handleFileDownload(row) {
      if (row.nodeType === 'form') {
        this.downloadTemplate(row.id, row.name)
      }
      datafill.getFormData(row.id).then((res) => {
        exportExcel(
          JSON.parse(res.data.formData),
          `${row.name}`
        )
      })
    },
    handleFilePreview(file) {
      console.log('查看文件', file)
      this.drawer = true
      this.msg = {
        id: file.id,
        name: file.name,
        data: null
      }
      this.isReadOnly = file.privileges.includes('use')
    },
    handleExcelEdit(file) {
      console.log('编辑文件', file)
      this.drawer = true
      this.msg = {
        id: file.id,
        name: file.name,
        data: null
      }
      this.isReadOnly = false
    },
    handleDetail(row) {
      this.detailDrawer = true
      getWithPrivileges(row.id).then((res) => {
        this.displayFormData = res.data
        console.log('this.displayFormData', this.displayFormData)
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteForm(row.id).then((response) => {
          this.getDataFill()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    uploadExcel(file, res) {
      const name = file.name
      const suffixArr = name.split('.')
      const suffix = suffixArr[suffixArr.length - 1]
      if (suffix != 'xlsx' && !this.fillForm.isAI) {
        this.$message.error('目前只支持xlsx文件')
        this.selfUploadLoading = false
        return
      }
      const _this = this

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
              _this.drawer = true
              _this.msg = {
                id: _this.nodeData.id,
                name: file.name,
                data: exportJson.sheets
              }
              _this.selfUploadLoading = false
              _this.uploadDialogVisible = false
              _this.fillDialogVisible = false
            } catch (err) {
              // console.error('处理Excel数据错误:', err)
              _this.$message.error('无法读取文件内容，请检查文件是否损坏')
              _this.selfUploadLoading = false
              _this.fillDialogVisible = false
            }
          },
          function(err) {
            console.error('Excel解析错误:', err)
            _this.$message.error('无法读取文件内容，请检查文件是否损坏')
            _this.selfUploadLoading = false
            _this.fillDialogVisible = false
          }
        )
      } catch (err) {
        // console.error('Excel转换错误:', err)
        _this.$message.error('无法读取文件内容，请检查文件是否损坏')
        _this.selfUploadLoading = false
        _this.fillDialogVisible = false
      }
    },
    addDataFill() {
      // 上传成功的处理逻辑
      const data = {
        name: this.uploadForm.name,
        pid: this.nodeData.id,
        level: this.nodeData.level,
        nodeType: 'selfReport',
        formData: JSON.stringify(luckysheet.getAllSheets())
      }
      saveForm(data).then(res => {
        if (res.success) {
          this.currentFormId = res.data
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
          this.getDataFill()
        }
      })
      // datafill
      //   .addDataFill({
      //     name: this.uploadForm.name,
      //     pid: this.nodeData.id,
      //     nodeType: 'selfReport',
      //     formData: JSON.stringify(luckysheet.getAllSheets()),
      //   })
      //   .then((res) => {
      //     this.$message({
      //       type: "success",
      //       message: "上传成功！",
      //     });
      //   });
    },
    handleFileChange(file, fileList) {
      if (fileList.length > 0) {
        const fileName = file.name
        const fileExt = fileName
          .substring(fileName.lastIndexOf('.') + 1)
          .toLowerCase()
        // 处理xlsx或其他文件
        this.fileList = [fileList[fileList.length - 1]]
        this.uploadForm.file = file.raw

        if (!this.uploadForm.name) {
          const dotIndex = fileName.lastIndexOf('.')
          if (dotIndex > 0) {
            this.uploadForm.name = fileName.substring(0, dotIndex)
          } else {
            this.uploadForm.name = fileName
          }
        }
        // if (fileExt === 'xls') {
        //   // 显示加载提示
        //   const loading = this.$loading({
        //     lock: true,
        //     text: '正在转换文件格式...',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        //   });

        //   // 设置 Worker 的消息处理函数
        //   this.worker.onmessage = (e) => {
        //     loading.close();

        //     if (e.data.success) {
        //       // 创建新的 Blob 和 File 对象
        //       const blob = new Blob([e.data.data], {
        //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        //       });
        //       const xlsxFile = new File([blob], fileName.replace('.xls', '.xlsx'), {
        //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        //       });

        //       this.fileList = [{
        //         name: xlsxFile.name,
        //         raw: xlsxFile
        //       }];
        //       this.uploadForm.file = xlsxFile;

        //       // 自动填充文件名（不包含扩展名）
        //       if (!this.uploadForm.name) {
        //         const dotIndex = xlsxFile.name.lastIndexOf('.');
        //         if (dotIndex > 0) {
        //           this.uploadForm.name = xlsxFile.name.substring(0, dotIndex);
        //         }
        //       }
        //     } else {
        //       this.$message.error('文件转换失败: ' + e.data.error);
        //       this.fileList = [];
        //       this.uploadForm.file = null;
        //     }
        //   };

        //   // 发送文件到 Worker 进行处理
        //   this.worker.postMessage({ file: file.raw });

        // } else {
        //   // 处理xlsx或其他文件
        //   this.fileList = [fileList[fileList.length - 1]];
        //   this.uploadForm.file = file.raw;

        //   if (!this.uploadForm.name) {
        //     const dotIndex = fileName.lastIndexOf('.');
        //     if (dotIndex > 0) {
        //       this.uploadForm.name = fileName.substring(0, dotIndex);
        //     } else {
        //       this.uploadForm.name = fileName;
        //     }
        //   }
        // }
      } else {
        this.fileList = []
        this.uploadForm.file = null
      }
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          this.selfUploadLoading = true
          if (!this.uploadForm.file) {
            this.$message.error('请选择要上传的文件')
            return
          }
          if (this.fillForm.isAI) {
            this.excelUploadAiHandle(this.uploadForm.file).then(file => {
              // console.log('file', file)
              // const blob = new Blob([file])
              // const link = document.createElement('a')
              // link.style.display = 'none'
              // link.href = URL.createObjectURL(blob)
              // link.download = '测试.xlsx' // 下载的文件名
              // document.body.appendChild(link)
              // link.click()
              // document.body.removeChild(link)
              this.uploadExcel(file)
            })
          } else {
            this.uploadExcel(this.uploadForm.file)
          }
        } else {
          return false
        }
      })
    },
    handleUpload() {
      console.log('this.nodeData', this.nodeData)
      if (!this.nodeData.id) {
        this.$message.error('请先选择文件夹')
        return
      }
      if (!this.nodeData.privileges.includes('write')) {
        this.$message.error('您没有权限上传文件')
        return
      }
      this.uploadDialogVisible = true
      this.uploadForm = {
        name: '',
        file: null
      }
      this.fileList = []
    },
    downloadTemplate(id, name) {
      downloadTemplate(id).then(res => {
        const blob = new Blob([res])
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.download = name ? name + '.xlsx' : this.templateList.find(item => item.id === id).name + '.xlsx' // 下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    beforeUpload(file) {
      if (!this.fillForm.templateId) {
        this.$message.error('请选择模板')
        return
      }
      const template = this.templateList.find(item => item.id === this.fillForm.templateId)
      if (!template.privileges.includes('write')) {
        this.$message.error('您没有权限上传文件')
        return
      }
      this.templateUploadLoading = true
      if (this.fillForm.isAI) {
        return new Promise((resolve, reject) => {
          this.excelUploadAiHandle(file).then(file => {
            if (file) {
              resolve(file)
            } else {
              reject(false)
            }
          }).catch(() => {
            reject(false)
          })
        })
      }
    },
    uploadFail(response, file, fileList) {
      this.templateUploadLoading = false
      this.$message({
        type: 'error',
        message: JSON.parse(response.message).message,
        showClose: true
      })
    },
    uploadSuccess(response, file, fileList) {
      this.templateUploadLoading = false
      this.$message({
        type: 'success',
        message: '上传成功！'
      })
    },
    formatDate(row, column, cellValue) {
      if (cellValue) {
        const date = new Date(cellValue)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      }
      return ''
    },
    handleDetailClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          this.displayFormData = null
          done()
        })
        .catch((_) => {})
    },
    editForm(data) {
      console.log('编辑表单', data)
    },
    remoteSearch(query) {
      if (query !== '') {
        this.loading = true
        const params = {
          goPage: 1,
          pageSize: 100000,
          data: {
            pid: this.nodeData.id,
            name: query,
            nodeType: 'form'
          }
        }
        datafill.getAllFill(params).then((res) => {
          this.templateList = res.data.listObject || []
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.templateList = []
      }
    },
    handleFocus() {
      this.getTemplateList()
    },
    excelUploadAiHandle(file) {
      const formData = new FormData()
      formData.append('file', file)

      return excelUploadAiHandle(formData).then(res => {
        const file = new File([res], `${this.uploadForm.file}.xlsx`, {
          type: res.type,
          lastModified: Date.now()
        })
        return file
      }).catch(() => {
        this.$message.error('上传失败')
        this.templateUploadLoading = false
        this.selfUploadLoading = false
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fill_box {
  padding: 20px;
  .header {
    margin-bottom: 20px;
  }
  .pagination-container {
    margin-top: 20px;
    text-align: right;
  }
  ::v-deep .el-table__expanded-cell {
    padding: 20px 0 20px 50px;
  }
  .upload-demo {
    width: 100%;
  }

  // 添加抽屉样式以确保全屏显示
  ::v-deep .el-drawer {
    width: 100% !important;
  }

  ::v-deep .el-drawer__header {
    margin-bottom: 0;
    padding: 16px 20px;
    border-bottom: 1px solid #e6e6e6;
  }

  ::v-deep .el-drawer__body {
    height: calc(100% - 55px);
    overflow: auto;
    padding: 0;
  }
}
</style>
