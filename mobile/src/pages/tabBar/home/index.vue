<template>
  <view class="container">
    <!-- Tab 切换 -->
    <view class="tab-container">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @click="handleTabChange(index)"
      >
        {{ tab.name }}
      </view>
    </view>

    <!-- 任务列表 -->
    <view v-show="currentTab === 0">
      <!-- 表格容器 -->
      <scroll-view class="table-container" scroll-x>
        <!-- 表格头部 -->
        <view class="table-header">
          <view class="th" style="min-width: 150rpx;">表单名称</view>
          <!-- <view class="th" style="min-width: 200rpx;">开始时间</view> -->
          <view class="th" style="min-width: 250rpx;">结束时间</view>
          <!-- <view class="th" style="min-width: 200rpx;">创建人</view> -->
          <view class="th" style="min-width: 150rpx;">操作</view>
        </view>

        <!-- 表格内容 -->
        <view class="table-body">
          <view v-if="tableData.length === 0" class="empty-data">
            暂无数据
          </view>
          <view 
            v-else
            v-for="(item) in tableData" 
            :key="item.id"
            class="table-row"
          >
            <view class="td" style="min-width: 150rpx;">{{ item.formName }}</view>
            <!-- <view class="td" style="min-width: 200rpx;">{{ formatTime(item.startTime) }}</view> -->
            <view class="td" style="min-width: 250rpx;">{{ formatTime(item.endTime) }}</view>
            <!-- <view class="td" style="min-width: 200rpx;">{{ item.creatorName }}</view> -->
            <view class="td" style="min-width: 150rpx;">
              <view class="operation-btns">
                <view class="operation-btn" @click="handleOperation(item)">
                  填报
                </view>
                <view class="operation-btn" @click="handleDownloadTemplate(item.formId, item.taskName)">
                  下载模板
                </view>
                <view class="operation-btn" @click="handleUploadFileData(item.formId)">
                  上传数据
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 自由填报 -->
    <view v-show="currentTab === 1" class="free-report">
      <view class="form-container">
        <view class="form-item">
          <view class="form-label">选择表单</view>
          <view class="form-content">
            <view class="select-tree" @click="toggleTreeSelect">
              <view class="selected-text">{{ selectedFormText || '请选择表单' }}</view>
              <uni-icons :type="showTreeSelect ? 'top' : 'bottom'" size="14" color="#999"></uni-icons>
            </view>
            
            <!-- 树形选择弹出层 -->
            <view class="tree-popup" v-if="showTreeSelect">
              <view class="tree-container">
                <tree-node 
                  v-for="item in formList" 
                  :key="item.id"
                  :node="item"
                  :selected-node="selectedChild"
                  @node-click="handleNodeClick"
                  @node-select="handleNodeSelect"
                ></tree-node>
              </view>
            </view>
          </view>
        </view>

        <view class="upload-section">
          <view style="margin-right: 100rpx;" class="operations-btn upload-btn" @click="handleDownloadTemplate(childForm.id, childForm.name)">
            <text>下载模板</text>
          </view>
          <view class="operations-btn upload-btn" @click="handleUploadFileData(childForm.id)">
            <text>上传数据</text>
          </view>
        </view>
      </view>
    </view>

    <view v-show="currentTab === 2">
      <view class="file-container">
        <tree-table 
          :data="fileList"
          @upload="handleUploadData"
          @view="handleViewFiles"
        />
      </view>
    </view>

    <!-- 添加表单对话框 -->
    <uni-popup ref="formDialog" type="center">
      <view class="dialog-content">
        <view class="dialog-header">
          <text class="title">{{ currentForm.name }}</text>
          <text class="close" @click="closeDialog">×</text>
        </view>
        <view class="dialog-body">
          <dynamic-form 
            v-if="formItems.length" 
            :form-items="formItems"
            @submit="handleFormSubmit"
          />
        </view>
      </view>
    </uni-popup>

    <!-- 上传文件对话框 -->
    <uni-popup ref="uploadDialog" type="center">
      <view class="dialog-content">
        <view class="dialog-header">
          <text class="title">上传文件</text>
          <text class="close" @click="closeUploadDialog">×</text>
        </view>
        <view class="dialog-body">
          <view class="upload-form">
            <view class="form-item">
              <view class="form-label">
                文件名称
                <text class="required">*</text>
              </view>
              <input 
                class="form-input" 
                v-model="uploadForm.fileName" 
                placeholder="请输入文件名称"
              />
            </view>
            
            <view class="form-item">
              <view class="form-label">描述信息</view>
              <textarea 
                class="form-textarea" 
                v-model="uploadForm.description" 
                placeholder="请输入描述信息"
              />
            </view>
            
            <view class="form-item">
              <view class="form-label">
                选择文件
                <text class="required">*</text>
              </view>
              <view class="file-select">
                <view class="select-btn" @click="selectFile">选择文件</view>
                <view class="file-name">{{ uploadForm.file ? uploadForm.file.name : '目前仅支持xlsx文件' }}</view>
              </view>
            </view>

            <view class="dialog-footer">
              <view class="btn cancel" @click="closeUploadDialog">取消</view>
              <view class="btn confirm" @click="confirmUpload">确定</view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- 添加全屏抽屉组件 -->
    <view class="drawer" v-if="drawerVisible" @click.self="closeDrawer">
      <view class="drawer-content">
        <view class="drawer-header">
          <text class="drawer-title">{{ msg.name }}</text>
          <text class="drawer-close" @click="closeDrawer">×</text>
        </view>
        <view class="drawer-body">
          <edit-excel :drawerVisible.sync="drawerVisible" @addDataFill="addDataFill" :msg="msg"></edit-excel>
        </view>
      </view>
    </view>

    <!-- 添加查看文件抽屉组件 -->
    <view class="drawer" v-if="fileDrawerVisible" @click.self="closeFileDrawer">
      <view class="drawer-content">
        <view class="drawer-header">
          <text class="drawer-title">文件列表</text>
          <text class="drawer-close" @click="closeFileDrawer">×</text>
        </view>
        <view class="drawer-body">
          <scroll-view class="file-table" scroll-x>
            <view class="file-table-inner">
              <view class="file-table-header">
                <view class="file-th" style="width: 200rpx;">名称</view>
                <view class="file-th" style="width: 200rpx;">描述</view>
                <view class="file-th" style="width: 220rpx;">创建时间</view>
                <view class="file-th" style="width: 300rpx;">操作</view>
              </view>
              <view class="file-table-body">
                <view v-if="fileTableData.length === 0" class="empty-data">
                  暂无数据
                </view>
                <view v-else v-for="(item, index) in fileTableData" :key="index" class="file-table-row">
                  <view class="file-td ellipsis" style="width: 200rpx;" :title="item.name">{{ item.name }}</view>
                  <view class="file-td ellipsis" style="width: 200rpx;" :title="item.description">{{ item.description }}</view>
                  <view class="file-td" style="width: 220rpx;">{{ formatTime(item.createTime) }}</view>
                  <view class="file-td" style="width: 300rpx;">
                    <view class="file-actions">
                      <view class="action-btn primary" @click="handleDownload(item)">下载</view>
                      <!-- <view class="action-btn success" @click="handleEdit(item)">编辑</view> -->
                      <view class="action-btn danger" @click="handleDeleteFile(item)">删除</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getList, getForm, submitForm, downloadTemplate, getFormTree, getDataFillTree, addFile, getDataFill, deleteDataFill, getFormData } from '@/api/auth'
import DynamicForm from './components/DynamicForm.vue'
import EditExcel from './components/editExcel.vue'
import { exportExcel } from "./components/export";
// 手动引入需要的组件
import { uniPopup, uniIcons, uniTransition } from '@dcloudio/uni-ui'
import TreeNode from './components/TreeNode.vue'
import TreeTable from './components/TreeTable.vue'

export default {
  components: {
    DynamicForm,
    EditExcel,
    uniPopup,
    uniIcons,
    uniTransition,
    TreeNode,
    TreeTable,
  },

  data() {
    return {
      searchKeyword: '',
      tableData: [],
      currentPage: 1,
      pageSize: 1000,
      total: 0,
      totalPages: 1,
      currentForm: {},
      formItems: [],
      id: '',
      currentTab: 0,
      tabs: [
        { name: '任务列表' },
        { name: '自由填报' },
        { name: '文件管理' },
      ],
      formList: [],
      pickerRange: [[], []],
      pickerIndexes: [0, 0],
      selectedFormText: '',
      parentForm: {},
      childForm: {},
      fileList: [],
      uploadForm: {
        fileName: '',
        description: '',
        file: null,
        folderId: null
      },
      drawerVisible: false,
      msg: {
        id: '',
        name: '',
        data: []
      },
      fileDrawerVisible: false,
      fileTableData: [],
      currentFolder: null,
      showTreeSelect: false,
      selectedParent: null,
      selectedChild: null,
    }
  },
  mounted() {
    this.getTableData()
  },
  
  methods: {
    // 格式化时间
    formatTime(timeStr) {
      if (!timeStr) return '--'
      const date = new Date(timeStr)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    },

    // 获取表格数据
    async getTableData() {
      const res = await getList({
        page: this.currentPage,
        pageSize: this.pageSize,
      }, {
        "taskName": this.searchKeyword
      })
      this.tableData = res.data.listObject
      this.total = res.data.itemCount
      this.totalPages = Math.ceil(this.total / this.pageSize)
    },
    
    // 页码改变
    handlePageChange(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
      this.getTableData()
    },
    
    // 操作按钮点击
    async handleOperation(item) {
      this.id = item.id
      try {
        const res = await getForm(item.formId)
        if (res.success) {
          this.currentForm = res.data
          this.formItems = JSON.parse(res.data.forms)
          this.$refs.formDialog.open()
        }
      } catch (error) {
        console.error('获取表单失败:', error)
      }
    },

    // 关闭对话框
    closeDialog() {
      this.$refs.formDialog.close()
      this.currentForm = {}
      this.formItems = []
    },

    // 处理表单提交
    async handleFormSubmit(formData) {
      console.log('表单数据:', formData)
      const res = await submitForm(this.id, [formData])
      
      this.closeDialog()
    },

    // 处理下载模板
    async handleDownloadTemplate(id, name) {
      // 在自由填报页面时进行校验
      if (this.currentTab === 1 && !this.selectedFormText) {
        uni.showToast({
          title: '请先选择表单',
          icon: 'none'
        })
        return
      }

      try {
        const res = await downloadTemplate(id)
        if (res) {
          // 获取文件名
          const fileName = `template_${name}.xlsx`
          
          // 创建 Blob 对象，使用正确的 MIME 类型
          const blob = new Blob([res])
          
          if (window.navigator.msSaveOrOpenBlob) {
            // IE 浏览器支持
            window.navigator.msSaveOrOpenBlob(blob, fileName)
          } else {
            // 其他浏览器
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            
            // 某些浏览器需要链接在页面中
            document.body.appendChild(link)
            link.click()
            
            // 清理
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          }
        } else {
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('下载失败:', error)
        uni.showToast({
          title: '下载失败',
          icon: 'none'
        })
      }
    },
    
    // 处理上传数据
    handleUploadData(id) {
      this.uploadForm.folderId = id
      this.$refs.uploadDialog.open()
    },

    // 处理上传数据
    async handleUploadFileData(id) {
      // 在自由填报页面时进行校验
      if (this.currentTab === 1 && !this.selectedFormText) {
        uni.showToast({
          title: '请先选择表单',
          icon: 'none'
        })
        return
      }

      try {
        // 创建隐藏的文件选择器
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.xlsx,.xls'
        input.style.display = 'none'
        document.body.appendChild(input)

        // 监听文件选择
        input.onchange = async (e) => {
          const file = e.target.files[0]
          if (file) {
            // 显示上传中提示
            uni.showLoading({
              title: '上传中...'
            })

            try {
              // 创建 FormData
              const formData = new FormData()
              formData.append('file', file)

              // 使用 fetch 上传
              // const response = await fetch(`${window.location.origin}/dataFilling/form/${id}/excel/upload`, {
              const response = await fetch(`http://183.194.64.166:17304/dataFilling/form/${id}/excel/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDA1NjczNzYsInVzZXJJZCI6MzAsInVzZXJuYW1lIjoiMzcwMTE1MTk5NzEyMTI5NDczIn0.ZGioO2BJLK8b9zhVDs90opizkhKOMOEwzcreZah8u8Q'
                }
              })

              const result = await response.json()
              
              uni.hideLoading()
              
              if (result.success) {
                uni.showToast({
                  title: '上传成功',
                  icon: 'success'
                })
              } else {
                uni.showToast({
                  title: result.message || '上传失败',
                  icon: 'none'
                })
              }
            } catch (err) {
              uni.hideLoading()
              console.error('上传失败:', err)
              uni.showToast({
                title: '上传失败',
                icon: 'none'
              })
            }
          }
          // 清理
          document.body.removeChild(input)
        }

        // 触发文件选择
        input.click()
      } catch (error) {
        uni.hideLoading()
        console.error('文件处理失败:', error)
        uni.showToast({
          title: '文件处理失败',
          icon: 'none'
        })
      }
    },

    // 获取表单列表
    async getFormList() {
      try {
        const res = await getFormTree();
        if (res.success) {
          // 递归为所有层级添加 expanded 属性
          const addExpanded = (items) => {
            return items.map(item => ({
              ...item,
              expanded: false,
              children: item.children ? addExpanded(item.children) : []
            }));
          };
          this.formList = addExpanded(res.data);
        }
      } catch (error) {
        console.error('获取表单列表失败:', error);
      }
    },

    // 处理 tab 切换
    handleTabChange(index) {
      this.currentTab = index
      if (index === 0) {
        this.getTableData()
      } else if (index === 1) {
        this.getFormList()
      } else if (index === 2) {
        this.getFileList()
      }
    },

    getFileList() {
      getDataFillTree().then(res => {
        this.fileList = res.data || []
      })
    },

    // 切换展开状态
    toggleExpand(item, index) {
      this.$set(this.fileList[index], 'expanded', !this.fileList[index].expanded)
    },

    // 处理删除
    handleDelete(file) {
      uni.showModal({
        title: '确认删除',
        content: `确定要删除 ${file.name} 吗？`,
        success: (res) => {
          if (res.confirm) {
            console.log('删除文件:', file.name)
            // 实现删除逻辑
          }
        }
      })
    },

    // 处理查看文件
    handleViewFiles(file) {
      this.currentFolder = file;
      getDataFill({
        data: {
          pid: typeof file === 'string' ? file : file.id,
          name: ''
        }
      }).then(res => {
        this.fileTableData = res.data.listObject || [];
        this.fileDrawerVisible = true;
      })
    },

    // 关闭上传弹窗
    closeUploadDialog() {
      this.$refs.uploadDialog.close()
      this.uploadForm = {
        fileName: '',
        description: '',
        file: null,
        folderId: null
      }
    },

    // 选择文件
    selectFile() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.xlsx'
      input.style.display = 'none'
      document.body.appendChild(input)

      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          this.uploadForm.file = file
          if (!this.uploadForm.fileName) {
            this.uploadForm.fileName = file.name.split('.')[0]
          }
        }
        document.body.removeChild(input)
      }

      input.click()
    },

    // 文件管理 确认上传
    async confirmUpload() {
      if (!this.uploadForm.fileName || !this.uploadForm.file) {
        uni.showToast({
          title: '请填写必填项',
          icon: 'none'
        })
        return
      }

      try {
        this.uploadExcel(this.uploadForm.file);
      } catch (error) {
        console.log(error);
      }
    },
    uploadExcel(file) {
      let name = file.name;
      let suffixArr = name.split("."),
        suffix = suffixArr[suffixArr.length - 1];
      if (suffix != "xlsx") {
        uni.showToast({
          title: '目前只支持xlsx文件',
          icon: 'none'
        })
        return;
      }
      let _this = this;

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
                uni.showToast({
                  title: '无法读取Excel文件的内容，目前不支持xls文件！',
                  icon: 'none'
                })
                return;
              }
              _this.drawerVisible = true;
              _this.msg = {
                id: _this.uploadForm.folderId,
                name: file.name,
                data: exportJson.sheets,
              };
            } catch (err) {
              // console.error('处理Excel数据错误:', err)
              uni.showToast({
                title: '无法读取文件内容，请检查文件是否损坏',
                icon: 'none'
              })
            }
          },
          function (err) {
            console.error("Excel解析错误:", err);
            uni.showToast({
              title: '无法读取文件内容，请检查文件是否损坏',
              icon: 'none'
            })
          }
        );
      } catch (err) {
        console.error('Excel转换错误:', err)
        uni.showToast({
          title: '无法读取文件内容，请检查文件是否损坏',
          icon: 'none'
        })
      }
    },

    addDataFill() {
      let params = {
        name: this.uploadForm.fileName,
        description: this.uploadForm.description,
        pid: this.uploadForm.folderId,
        nodeType: 'form',
        formData: JSON.stringify(luckysheet.getAllSheets()),
      }
      addFile(params)
      .then((res) => {
        uni.showToast({
          title: "上传成功！",
          icon: "success",
        });
        this.closeUploadDialog()
      });
    },

    // 关闭抽屉
    closeDrawer() {
      this.drawerVisible = false
      this.msg = {
        id: '',
        name: '',
        data: []
      }
    },

    // 关闭文件抽屉
    closeFileDrawer() {
      this.fileDrawerVisible = false;
      this.fileTableData = [];
      this.currentFolder = null;
    },

    // 处理下载
    handleDownload(file) {
      // 实现下载逻辑
      console.log('下载文件:', file);
      getFormData(file.id).then((res) => {
        exportExcel(
          JSON.parse(res.data.formData),
          `${file.name}`
        );
      });
    },

    // 处理编辑
    handleEdit(file) {
      // 实现编辑逻辑
      console.log('编辑文件:', file);
    },

    // 处理删除
    handleDeleteFile(file) {
      uni.showModal({
        title: '确认删除',
        content: `确定要删除 ${file.name} 吗？`,
        success: (res) => {
          if (res.confirm) {
            deleteDataFill(file.id).then(res => {
              this.handleViewFiles(file.pid)
              uni.showToast({
                title: '删除成功!',
                icon: 'success'
              })
            })
          }
        }
      })
    },

    toggleTreeSelect() {
      this.showTreeSelect = !this.showTreeSelect;
      // 点击外部关闭
      if(this.showTreeSelect) {
        this.$nextTick(() => {
          document.addEventListener('click', this.handleClickOutside);
        });
      }
    },

    handleClickOutside(e) {
      const selectTree = document.querySelector('.select-tree');
      const treePopup = document.querySelector('.tree-popup');
      if ((!selectTree || !selectTree.contains(e.target)) && 
          (!treePopup || !treePopup.contains(e.target))) {
        this.showTreeSelect = false;
        document.removeEventListener('click', this.handleClickOutside);
      }
    },

    handleNodeClick(node) {
      this.$set(node, 'expanded', !node.expanded);
    },
    
    handleNodeSelect(node) {
      // 获取节点的完整路径
      const path = this.getNodePath(node);
      this.selectedChild = node;
      this.childForm = node;
      this.selectedFormText = path.map(n => n.name).join(' / ');
      this.showTreeSelect = false;
      document.removeEventListener('click', this.handleClickOutside);
    },
    
    // 获取节点路径
    getNodePath(targetNode) {
      const path = [];
      
      const findPath = (nodes, target, currentPath) => {
        for (const node of nodes) {
          const newPath = [...currentPath, node];
          
          if (node.id === target.id) {
            path.push(...newPath);
            return true;
          }
          
          if (node.children && node.children.length) {
            if (findPath(node.children, target, newPath)) {
              return true;
            }
          }
        }
        return false;
      };
      
      findPath(this.formList, targetNode, []);
      return path;
    },
  },
  
  
}
</script>

<style scoped>
.container {
  /* padding: 20rpx; */
  background: #fff;
  min-height: calc(100vh - 50rpx);
  display: flex;
  flex-direction: column;
}

.table-container {
  width: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  height: calc(100vh - 200rpx);  /* 减去其他元素的高度，包括padding和分页器的高度 */
  overflow-y: auto;
}

.search-box {
  margin-bottom: 20rpx;
}

.table-header {
  display: flex;
  background: #f5f7fa;
  padding: 20rpx 0;
  width: 100%;
  min-width: 100%;
}

.table-header .th {
  text-align: center;
  font-weight: bold;
  font-size: 28rpx;
  color: #606266;
}

/* 结束时间列标题靠左 */
.table-header .th:nth-child(2) {
  text-align: left;
  padding-left: 20rpx;
}

.table-body {
  width: 100%;
  min-width: 100%;
}

.table-body .table-row {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1px solid #ebeef5;
}

.table-body .table-row .td {
  text-align: center;
  font-size: 28rpx;
  color: #606266;
}

/* 结束时间列内容靠左 */
.table-body .table-row .td:nth-child(2) {
  text-align: left;
  padding-left: 20rpx;
}

.table-body .empty-data {
  text-align: center;
  padding: 40rpx 0;
  color: #909399;
  font-size: 28rpx;
}

.operation-btns {
  display: flex;
  flex-direction: row;
  gap: 10rpx;
  align-items: center;
  justify-content: center;
}

.operation-btn {
  display: inline-block;
  padding: 4rpx 10rpx;
  background: #409eff;
  color: #fff;
  border-radius: 4rpx;
  font-size: 24rpx;
  /* width: 80rpx; */
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #606266;
}

.pagination .total {
  margin-right: 20rpx;
}

.pagination .page-box {
  display: flex;
  align-items: center;
  margin-right: 20rpx;
}

.pagination .page-box .page-btn {
  padding: 0 20rpx;
  cursor: pointer;
}

.pagination .page-box .page-btn.disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.pagination .page-box .page-number {
  margin: 0 20rpx;
}

.pagination .page-size {
  display: flex;
  align-items: center;
  margin-right: 20rpx;
  cursor: pointer;
}

.pagination .page-size text {
  margin-right: 10rpx;
}

.pagination .goto {
  cursor: pointer;
}

.dialog-content {
  background: #fff;
  width: 80vw;
  padding: 10vw 8vw 0 10vw;
  border-radius: 0;
  max-height: 80vh;
  overflow: hidden;
}

.dialog-content .dialog-header {
  padding: 20rpx;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-content .dialog-header .title {
  font-size: 32rpx;
  font-weight: bold;
}

.dialog-content .dialog-header .close {
  font-size: 40rpx;
  color: #909399;
  cursor: pointer;
}

.dialog-content .dialog-body {
  padding: 20rpx;
  max-height: calc(80vh - 100rpx);
  overflow-y: auto;
}

.tab-container {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  padding: 0 20rpx;
}

.tab-item {
  padding: 20rpx 40rpx;
  font-size: 28rpx;
  color: #606266;
  cursor: pointer;
  position: relative;
}

.tab-item.active {
  color: #409eff;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #409eff;
}

.free-report {
  padding: 20rpx;
}

.form-container {
  background: #fff;
  border-radius: 8rpx;
  padding: 20rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-label {
  font-size: 28rpx;
  color: #606266;
  margin-bottom: 10rpx;
}

.form-content {
  position: relative;
}

.required {
  color: #f56c6c;
  margin-left: 4rpx;
}

.form-input {
  width: 100%;
  height: 70rpx;
  border: 1px solid #dcdfe6;
  border-radius: 4rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.form-textarea {
  width: 100%;
  height: 120rpx;
  border: 1px solid #dcdfe6;
  border-radius: 4rpx;
  padding: 20rpx;
  font-size: 28rpx;
}

.file-select {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.select-btn {
  padding: 10rpx 30rpx;
  background: #409eff;
  color: #fff;
  border-radius: 4rpx;
  font-size: 28rpx;
  cursor: pointer;
}

.file-name {
  font-size: 28rpx;
  color: #909399;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
  margin-top: 40rpx;
  padding-top: 20rpx;
  border-top: 1px solid #ebeef5;
}

.dialog-footer .btn {
  padding: 16rpx 40rpx;
  border-radius: 4rpx;
  font-size: 28rpx;
  cursor: pointer;
}

.dialog-footer .cancel {
  border: 1px solid #dcdfe6;
  color: #606266;
}

.dialog-footer .confirm {
  background: #409eff;
  color: #fff;
}

.dialog-footer .btn:active {
  opacity: 0.8;
}

.file-container {
  padding: 20rpx;
}

.file-header {
  display: flex;
  background: #f5f7fa;
  padding: 20rpx;
  font-weight: bold;
  font-size: 28rpx;
  color: #606266;
}

.file-body {
  font-size: 28rpx;
  color: #606266;
}

.file-row {
  display: flex;
  padding: 20rpx;
  border-bottom: 1px solid #ebeef5;
}

.file-name {
  display: flex;
  align-items: center;
  gap: 10rpx;
  cursor: pointer;
}

.indent {
  padding-left: 34rpx;
}

.file-actions {
  display: flex;
  justify-content: center;
  gap: 10rpx;
}

.action-btn {
  padding: 4rpx 20rpx;
  border-radius: 4rpx;
  font-size: 24rpx;
  cursor: pointer;
  color: #fff;
}

/* 不同按钮类型的颜色 */
.action-btn.primary {
  background: #409eff; /* 蓝色 - 下载 */
}

.action-btn.success {
  background: #67c23a; /* 绿色 - 编辑 */
}

.action-btn.danger {
  background: #f56c6c; /* 红色 - 删除 */
}

/* 按钮悬浮效果 */
.action-btn:hover {
  opacity: 0.8;
}

/* 按钮点击效果 */
.action-btn:active {
  opacity: 0.6;
}

.child-row {
  background: #f8f9fb;
}

.file-children {
  background: #f8f9fb;
}

/* 添加抽屉相关样式 */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drawer-content {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  padding: 20rpx 40rpx;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.drawer-close {
  font-size: 40rpx;
  color: #909399;
  cursor: pointer;
  padding: 10rpx;
}

.drawer-body {
  flex: 1;
  overflow: hidden;
}

.file-table {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  overflow-x: auto;
}

.file-table-inner {
  min-width: 1000rpx; /* 设置最小宽度，确保内容不会被压缩 */
  padding: 20rpx;
}

.file-table-header {
  display: flex;
  background: #f5f7fa;
  padding: 20rpx;
  font-weight: bold;
  width: 100%;
}

.file-table-row {
  display: flex;
  padding: 20rpx;
  border-bottom: 1px solid #ebeef5;
  width: 100%;
}

.file-th {
  text-align: center;
  font-size: 28rpx;
  color: #606266;
  flex-shrink: 0; /* 防止被压缩 */
}

.file-td {
  text-align: center;
  font-size: 28rpx;
  color: #606266;
  flex-shrink: 0; /* 防止被压缩 */
  padding: 0 10rpx; /* 添加左右内边距 */
}

.file-td.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}

/* 添加悬浮提示样式 */
.file-td.ellipsis:hover {
  position: relative;
}

.file-td.ellipsis:hover::after {
  content: attr(title);
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8rpx 16rpx;
  border-radius: 4rpx;
  font-size: 24rpx;
  white-space: normal;
  word-break: break-all;
  max-width: 300rpx;
  z-index: 999;
}

.empty-data {
  text-align: center;
  padding: 40rpx;
  color: #909399;
  font-size: 28rpx;
}

/* .picker-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
}
.picker-text {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.upload-section {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.upload-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 8px 15px;
  background: #409eff;
}
.operations-btn {
  display: inline-block;
  padding: 2px 5px;
  background: #409eff;
  color: #fff;
  border-radius: 2px;
  font-size: 12px;
} */
 .picker-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  border: 1px solid #dcdfe6;
  border-radius: 4rpx;
}

.picker-text {
  font-size: 28rpx;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.picker-text.placeholder {
  color: #999;
}

.upload-section {
  margin-top: 20rpx;
  display: flex;
  justify-content: center;
}
.operations-btn {
  display: inline-block;
  padding: 2px 5px;
  background: #409eff;
  color: #fff;
  border-radius: 2px;
  font-size: 12px;
}
.upload-btn {
  display: flex;
  align-items: center;
  gap: 6rpx;
  padding: 16rpx 30rpx;
  background: #409eff;
}

.upload-btn:active {
  opacity: 0.8;
}

.select-tree {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  border: 1px solid #dcdfe6;
  border-radius: 4rpx;
  cursor: pointer;
  position: relative;
  background: #fff;
}

.selected-text {
  font-size: 28rpx;
  color: #606266;
}

.tree-popup {
  position: absolute;
  top: 70rpx;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4rpx;
  margin-top: 4rpx;
  max-height: 400rpx;
  overflow-y: auto;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.tree-container {
  padding: 10rpx 0;
}

.tree-item {
  font-size: 28rpx;
}

.tree-node {
  display: flex;
  align-items: center;
  padding: 16rpx 20rpx;
  cursor: pointer;
}

.tree-node:hover {
  background-color: #f5f7fa;
}

.tree-node.active {
  color: #409eff;
}

.tree-node.is-folder {
  font-weight: 500;
}

.node-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.node-children {
  padding-left: 20rpx;
}

.node-children.level-1 {
  background: #f8f9fb;
}

.node-children.level-2 {
  background: #f0f2f5;
}

.node-children.level-3 {
  background: #e8eaed;
}

/* 更深层级可以继续添加不同的背景色 */
</style>
