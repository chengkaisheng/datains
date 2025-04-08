<template>
  <div class="fill_box">
    <div class="header" style="display: flex; justify-content: space-between;">
      <div>
        <el-button v-if="!isTemplate" type="primary" @click="handleFill">填报</el-button>
        <el-input v-model="searchName" placeholder="请输入内容" clearable style="width: 300px;margin-left: 10px;" @keyup.enter.native="getDataFill()">
          <el-button slot="append" icon="el-icon-search" @click="getDataFill()" />
        </el-input>
      </div>
      <div>
        <el-button type="primary" @click="refresh">刷新</el-button>
      </div>
    </div>
    <div v-loading="tableLoading" class="list">
      <el-table ref="logTable" :height="tableHeight" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column v-if="!isTemplate" prop="nodeType" label="类型" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.nodeType === 'form'">表单填报</span>
            <span v-else-if="scope.row.nodeType === 'selfReport'">自主填报</span>
            <span v-else-if="scope.row.nodeType === 'selfReport_template'">自主填报模板</span>
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="150" />
        <el-table-column prop="createTime" label="创建时间" :formatter="formatDate" width="180" />
        <el-table-column v-if="!isTemplate" prop="status" width="100" >
          <template slot="header">
            <div>
              <span style="margin-right: 5px;">填报状态</span>
              <el-tooltip class="item" effect="dark" content="当前表单是否可在移动端进行填报" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <el-switch :disabled="!hasPermission(scope.row.privileges, 'form_update')" v-if="scope.row.nodeType === 'form'" @change="handleStatusChange(scope.row)" v-model="scope.row.status" :active-value="1" :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="hasPermission(scope.row.privileges, 'export')"
              size="mini"
              type="success"
              @click="handleFileDownload(scope.row)"
            >下载</el-button>
            <el-button
              v-if="scope.row.nodeType.includes('selfReport') && hasPermission(scope.row.privileges, 'self_report_read') && !hasPermission(scope.row.privileges, 'self_report_update')"
              size="mini"
              type="warning"
              @click="handleFilePreview(scope.row)"
            >在线查看</el-button>
            <el-button
              v-if="scope.row.nodeType.includes('selfReport') && hasPermission(scope.row.privileges, 'self_report_update')"
              size="mini"
              type="warning"
              @click="handleExcelEdit(scope.row)"
            >在线编辑</el-button>
            <el-button
              v-if="!isTemplate && hasPermission(scope.row.privileges, 'read')"
              size="mini"
              type="warning"
              @click="handlePerviewLog(scope.row)"
            >查看日志</el-button>
            <el-button
              v-if="!isTemplate && scope.row.nodeType === 'form' && hasPermission(scope.row.privileges, 'form_read_data')"
              size="mini"
              type="primary"
              @click="handleDetail(scope.row)"
            >详情</el-button>
            <el-button
              v-if="isTemplate && scope.row.nodeType === 'form' && hasPermission(scope.row.privileges, 'template_read')"
              size="mini"
              type="primary"
              @click="handleDetail(scope.row)"
            >预览</el-button>
            <el-button
              v-if="isTemplate && scope.row.nodeType === 'form' && hasPermission(scope.row.privileges, 'template_update')"
              size="mini"
              type="primary"
              @click="handleEditTemplate(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="hasPermission(scope.row.privileges, 'delete')"
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
            <el-option label="表单填报" value="form" />
            <el-option v-if="hasPermission(nodeData.privileges, 'self_report')" label="自主填报" value="selfReport" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="fillForm.type === 'form'" label="选择表单" prop="templateId">
          <el-select
            v-model="fillForm.templateId"
            placeholder="请选择表单"
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
          <el-button style="margin-right: 10px;" type="primary" @click="downloadTemplate(fillForm.templateId)">下载表单（模板）</el-button>
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

    <!-- 选择版本对话框 进行下载 -->
    <el-dialog
      title="下载"
      :visible.sync="selectedVersionVisible"
      width="30%">
      <div>
        <span>版本：</span>
        <el-select v-model="versionId" placeholder="请选择">
          <el-option
            v-for="item in versionList"
            :key="item.id"
            :label="item.version"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeVersionDialog">取 消</el-button>
        <el-button type="primary" @click="downloadVersionData">下载</el-button>
      </span>
    </el-dialog>

    <!-- 详情抽屉 -->
    <el-drawer
      v-if="detailDrawer"
      :title="isTemplate ? '预览' : '详情'"
      :visible.sync="detailDrawer"
      size="100%"
      :wrapper-closable="false"
      direction="rtl"
    >
      <no-select v-if="!displayFormData" />
      <view-table
        v-else
        :param="displayFormData"
        :isTemplate="isTemplate"
        @editForm="editForm"
      />
    </el-drawer>

    <!-- 查看日志 -->
    <el-drawer
      v-if="logDrawer"
      title="查看日志"
      :visible.sync="logDrawer"
      size="100%"
      :wrapper-closable="false"
      direction="rtl"
    >
      <LogList :formId="selectedRow.id"></LogList>
    </el-drawer>
  </div>
</template>

<script>
import EditExcel from './editExcel.vue'
import ViewTable from '@/views/dataFilling/form/ViewTable.vue'
import NoSelect from '@/views/dataFilling/form/NoSelect.vue'
import LogList from '@/views/dataFilling/form/LogList.vue'
import datafill from '@/api/datafill/datafill'
import { exportExcel } from './export'
import { hasPermission } from '@/views/dataFilling/permission.js'
import {
  deleteForm,
  downloadTemplate,
  excelUploadAiHandle,
  getWithPrivileges,
  saveForm,
  getFormData,
  getFormDataData
} from '@/views/dataFilling/form/dataFilling'
import {
  deleteForm as deleteTemplate,
  // downloadTemplate as downloadTemplateTemplate,
  excelUploadAiHandle as excelUploadAiHandleTemplate,
  getWithPrivileges as getWithPrivilegesTemplate,
  saveForm as saveFormTemplate
} from '@/views/dataFilling/template/template'
import { getToken } from '@/utils/auth'
import i18n from '@/lang'

const token = getToken()

export default {
  name: 'FileList',
  components: {
    EditExcel,
    ViewTable,
    NoSelect,
    LogList
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {}
    },
    // 是否是模板库
    isTemplate: {
      type: Boolean,
      default: false
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
          { required: true, message: '请选择表单', trigger: 'change' }
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
      tableLoading: false,
      selectedVersionVisible: false,
      versionId: undefined,
      versionName: '',
      versionList: [],
      selectedRow: {},
      tableHeight: 0,
      logDrawer: false,
      selectedRow: null,
      selfReportTemplate: false,
    }
  },
  watch: {
    drawer: {
      handler(newVal) {
        if (newVal === false) {
          this.getDataFill()
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateTableHeight()
    })
    window.addEventListener('resize', this.calculateTableHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateTableHeight)
  },
  methods: {
    hasPermission(privileges, type) {
      return hasPermission(privileges, type)
    },
    calculateTableHeight() {
      // 获取视窗高度
      const windowHeight = window.innerHeight
      // 获取表格元素
      const table = this.$refs.logTable.$el
      // 获取表格顶部到视窗顶部的距离
      const tableTop = table.getBoundingClientRect().top
      // 分页器高度 + 分页器上下margin
      const paginationHeight = 52
      // 预留一些底部空间
      const bottomSpace = 20
      // 计算表格可用高度
      this.tableHeight = windowHeight - tableTop - paginationHeight - bottomSpace
    },
    clearAll() {
      this.tableData = []
      this.goPage = 1
      this.pageSize = 10
      this.total = 0
    },
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
    // submitFill() {
    //   this.$refs.fillForm.validate((valid) => {
    //     if (valid) {
    //       if (this.fillForm.type === 'form' && !this.fillForm.templateId) {
    //         this.$message.error('请选择模板')
    //         return
    //       }
    //       // TODO: 调用填报提交接口
    //       console.log('提交填报', this.fillForm)
    //       this.fillDialogVisible = false
    //     }
    //   })
    // },
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
      let method = datafill.getAllFill
      if (this.isTemplate) {
        method = datafill.getAllFillTemplate
      }
      method(params).then((res) => {
        if (nodeType === 'form') {
          this.templateList = res.data.listObject || []
        } else {
          this.tableData = res.data.listObject || []
          this.total = res.data.itemCount || 0
        }
        this.calculateTableHeight()
        this.tableLoading = false
      }).catch(() => {
        this.calculateTableHeight()
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
      } else {
        // 自主填报模板 自主填报 需要去选择版本然后下载
        this.selectedRow = row
        this.selectedVersionVisible = true
        this.getVersionList(row.id)
      }
    },
    getVersionList(id) {
      getFormData(id).then(res => {
        this.versionList = res.data
        this.versionId = res.data[0].id
      })
    },
    closeVersionDialog() {
      this.selectedVersionVisible = false;
      this.versionId = undefined
      this.versionName = ''
    },
    downloadVersionData() {
      this.versionName = this.versionList.find(item => item.id == this.versionId).version
      getFormDataData(this.versionId).then((res) => {
        exportExcel(
          JSON.parse(res.data.formData),
          `${this.selectedRow.name}-${this.versionName}`
        )
        this.closeVersionDialog()
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
    handleExcelEdit(row) {
      console.log('编辑文件', row)
      this.drawer = true
      this.msg = {
        id: row.id,
        name: row.name,
        data: null
      }
      this.isReadOnly = false
    },
    handlePerviewLog(row) {
      console.log('row', row);
      
      this.selectedRow = row
      this.logDrawer = true
    },
    handleDetail(row) {
      this.detailDrawer = true
      let method = this.isTemplate ? getWithPrivilegesTemplate : getWithPrivileges
      method(row.id).then((res) => {
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
          let method = this.isTemplate ? deleteTemplate : deleteForm
          method(row.id).then((res) => {
            if(res.success) {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.getDataFill()
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败！'
            })
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
                name: _this.uploadForm.name,
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
        nodeType: this.selfReportTemplate ? 'selfReport_template' : 'selfReport',
        // nodeType: 'selfReport',
        formData: JSON.stringify(luckysheet.getAllSheets())
      }
      let method = this.isTemplate ? saveFormTemplate : saveForm
      method(data).then(res => {
        if (res.success) {
          if(this.selfReportTemplate) {
            this.selfReportTemplate = false
            this.$emit('refreshFolderTree')
          }
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
      if (!this.hasPermission(this.nodeData.privileges, 'self_report')) {
        this.$message.error('暂无该文件夹自主填报权限！')
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
      // let method = this.isTemplate ? downloadTemplateTemplate : downloadTemplate
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
        this.$message.error('请选择表单')
        return
      }
      const template = this.templateList.find(item => item.id === this.fillForm.templateId)
      if (!this.hasPermission(template.privileges, 'form_filling')) {
        this.$message.error('暂无该表单填报权限！')
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
      this.fillDialogVisible = false
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
    handleEditTemplate(row) {
      this.$router.push({ name: 'data-filling-form-create', query: { id: row.id, isTemplate: this.isTemplate }})
    },
    editForm(data) {
      this.$router.push({ name: 'data-filling-form-create', query: { id: data.id, isTemplate: this.isTemplate }})
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
        let method = datafill.getAllFill
        if (this.isTemplate) {
          method = datafill.getAllFillTemplate
        }
        method(params).then((res) => {
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
      let method = this.isTemplate ? excelUploadAiHandleTemplate : excelUploadAiHandle
      return method(formData).then(res => {
        const file = new File([res], `${this.uploadForm.name}.xlsx`, {
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
    },
    handleStatusChange(row) {
      datafill.updateFormStatus(row.id, row.status).then(res => {
        this.$message.success('更新状态成功')
        this.getDataFill()
      }).catch(() => {
        this.$message.error('更新状态失败')
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
