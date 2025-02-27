<template>
  <div class="fill_box">
    <div class="header">
      <el-button @click="handleCreateFolder">新建文件夹</el-button>
      <el-button @click="downloadTemplate">下载模板</el-button>
    </div>
    <div class="list">
      <el-table
        :data="tableData"
        row-key="id"
        :tree-props="{children: 'subfolders'}"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.children || []"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                width="200">
              </el-table-column>
              <!-- <el-table-column
                prop="creator"
                label="创建人"
                width="150">
              </el-table-column> -->
              <el-table-column
                prop="createTime"
                label="创建时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="version"
                label="版本号"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                width="400"
                >
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    type="success"
                    @click="handleFileEdit(scope.row)">编辑</el-button> -->
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleFileDownload(scope.row)">下载</el-button>
                  <!-- <el-button
                    size="mini"
                    type="info"
                    @click="handleFilePreview(scope.row)">预览</el-button> -->
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleExcelEdit(scope.row)">在线编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="文件夹"
          width="200">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板名称">
        </el-table-column>
        <el-table-column
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleUpload(scope.row)">上传</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 添加分页组件 -->
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="goPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-drawer
      v-if="drawer"
      title="编辑"
      :with-header="false"
      :visible.sync="drawer"
      :before-close="handleClose"
      size="100%"
      :wrapperClosable="false"
      direction="rtl">
      <EditExcel @addDataFill="addDataFill" :drawer.sync="drawer" :msg="msg" />
    </el-drawer>

    <!-- 添加新建文件夹弹窗 -->
    <el-dialog
      :title="dialogType === 'create' ? '新建文件夹' : '编辑文件夹'"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form
        :model="folderForm"
        :rules="rules"
        ref="folderForm"
        label-width="100px">
        <el-form-item label="文件夹名称" prop="name">
          <el-input v-model="folderForm.name" placeholder="请输入文件夹名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="folderForm.description"
            :rows="3"
            placeholder="请输入描述信息">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加上传文件对话框 -->
    <el-dialog
      title="上传文件"
      :visible.sync="uploadDialogVisible"
      width="500px">
      <el-form
        :model="uploadForm"
        :rules="uploadRules"
        ref="uploadForm"
        label-width="100px">
        <el-form-item label="文件名称" prop="name">
          <el-input v-model="uploadForm.name" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="uploadForm.description"
            :rows="3"
            placeholder="请输入描述信息">
          </el-input>
        </el-form-item>
        <el-form-item label="选择文件" prop="file">
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
            :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">目前只支持xlsx文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditExcel from './editExcel.vue'
import datafill from '@/api/datafill/datafill'
import {exportExcel} from './export'

export default {
  name: 'DataFill',
  components: {
    EditExcel,
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      folderForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入文件夹名称', trigger: 'blur' }
        ]
      },
      dialogType: 'create',
      editingId: null,
      goPage: 1,
      pageSize: 10,
      total: 0,
      drawer: false,
      msg: {},
      uploadDialogVisible: false,
      uploadForm: {
        name: '',
        description: '',
        folderId: null,
        file: null
      },
      uploadRules: {
        name: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        file: [
          { required: true, message: '请选择要上传的文件', trigger: 'change' }
        ]
      },
      fileList: [],
      selectedRow: null,
      excelRes: null,
      worker: null
    }
  },
  created() {
    this.getDataFill()
    // 修改 Worker 的创建方式
    // if (typeof Worker !== 'undefined') {
    //   try {
    //     // 使用 URL.createObjectURL 创建 worker
    //     const workerPath = require('worker-loader!./excel-worker.js').default;
    //     this.worker = new workerPath();
    //   } catch (e) {
    //     console.error('Worker creation failed:', e)
    //     this.$message.error('Worker 创建失败')
    //   }
    // } else {
    //   this.$message.error('浏览器不支持 Web Worker')
    // }
  },
  beforeDestroy() {
    // 组件销毁时终止 Worker
    if (this.worker) {
      this.worker.terminate()
    }
  },
  watch: {
    drawer: {
      handler(newVal) {
        if(newVal === false) {
          this.getDataFill()
        }
      }
    },
  },
  methods: {
    downloadTemplate() {
      datafill.getFormTemplate('1').then(res => {
        exportExcel(JSON.parse(res.data.data),res.data.name)
      })
    },
    getDataFill() {
      datafill.getDataFill({goPage: this.goPage, pageSize: this.pageSize}).then(res => {
        this.tableData = res.data.listObject
        this.total = res.data.itemCount
      })
    },
    handleUpload(row) {
      this.uploadDialogVisible = true
      this.selectedRow = row
      this.uploadForm = {
        name: '',
        description: '',
        folderId: row.id,
        file: null
      }
      this.fileList = []
    },
    handleEdit(row) {
      this.dialogType = 'edit'
      this.editingId = row.id
      this.dialogVisible = true
      this.folderForm = {
        name: row.name,
        description: row.description,
      }
    },
    handleDelete(row) {
      this.$confirm('确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        datafill.deleteDataFill(row.id).then(res => {
          this.getDataFill()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCreateFolder() {
      this.dialogType = 'create'
      this.editingId = null
      this.dialogVisible = true
      this.folderForm = {
        name: '',
        description: '',
      }
    },
    submitForm() {
      this.$refs.folderForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'create') {
            datafill.addDataFill({
              templateId: '1',
              ...this.folderForm
            }).then(res => {
              this.handleCurrentChange(1)
              this.$message({
                type: 'success',
                message: '创建成功！'
              })
            })
          } else {
            datafill.updateDataFill({
              id: this.editingId,
              ...this.folderForm
            }).then(res => {
              this.getDataFill()
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
            })
          }
          this.dialogVisible = false
        } else {
          return false
        }
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
    handleFileDownload(file) {
      datafill.getFormData(file.id).then(res => {
        exportExcel(JSON.parse(res.data.formData),`${file.name}-${file.version}`)
      })
    },
    handleFilePreview(file) {
      console.log('预览文件', file)
    },
    handleExcelEdit(file) {
      console.log('编辑文件', file)
      this.drawer = true
      this.msg = {
        id: file.id,
        name: file.name,
        data: null
      }
    },
    handleFileDelete(file) {
      console.log('删除文件', file)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    uploadExcel(file, res) {
      let name = file.name
      let suffixArr = name.split('.'),
        suffix = suffixArr[suffixArr.length - 1]
      if (suffix != 'xlsx') {
        this.$message.error('目前只支持xlsx文件')
        return
      }
      let _this = this
      
      try {
        LuckyExcel.transformExcelToLucky(file, 
        function(exportJson, luckysheetfile) {
          try {
            if (!exportJson || !exportJson.sheets || exportJson.sheets.length === 0) {
              _this.$message.error('无法读取Excel文件的内容，目前不支持xls文件！')
              return
            }
            _this.drawer = true
            _this.msg = {
              id: file.id,
              name: file.name,
              data: exportJson.sheets
            }
            _this.uploadDialogVisible = false
          } catch(err) {
            // console.error('处理Excel数据错误:', err)
            _this.$message.error('无法读取文件内容，请检查文件是否损坏')
          }
        }, 
        function(err) {
          console.error('Excel解析错误:', err) 
          _this.$message.error('无法读取文件内容，请检查文件是否损坏')
        })
      } catch(err) {
        // console.error('Excel转换错误:', err)
        _this.$message.error('无法读取文件内容，请检查文件是否损坏')
      }
    },
    addDataFill() {
      // 上传成功的处理逻辑
      datafill.addDataFill({
        name: this.uploadForm.name,
        description: this.uploadForm.description,
        parentId: this.selectedRow.id,
        templateId: this.selectedRow.templateId,
        formData: JSON.stringify(luckysheet.getAllSheets())
      }).then(res => {
        this.$message({
          type: 'success',
          message: '上传成功！'
        })
      })
    },
    handleFileChange(file, fileList) {
      if (fileList.length > 0) {
        const fileName = file.name;
        const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        // 处理xlsx或其他文件
          this.fileList = [fileList[fileList.length - 1]];
          this.uploadForm.file = file.raw;
          
          if (!this.uploadForm.name) {
            const dotIndex = fileName.lastIndexOf('.');
            if (dotIndex > 0) {
              this.uploadForm.name = fileName.substring(0, dotIndex);
            } else {
              this.uploadForm.name = fileName;
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
        this.fileList = [];
        this.uploadForm.file = null;
      }
    },
    submitUpload() {
      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          if (!this.uploadForm.file) {
            this.$message.error('请选择要上传的文件')
            return
          }
          this.uploadExcel(this.uploadForm.file)
          
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .fill_box{
    padding:20px;
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
