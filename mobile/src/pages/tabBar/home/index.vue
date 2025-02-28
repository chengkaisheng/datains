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
                <view class="operation-btn" @click="handleUploadData(item.formId)">
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
            <picker 
              mode="multiSelector" 
              :range="pickerRange"
              :range-key="'name'"
              :value="pickerIndexes"
              @columnchange="handleColumnChange"
              @change="handleFormSelect"
            >
              <view class="picker-box">
                <text class="picker-text">{{ selectedFormText || '请选择表单' }}</text>
                <uni-icons type="bottom" size="14" color="#999"></uni-icons>
              </view>
            </picker>
          </view>
        </view>

        <view class="upload-section">
          <view style="margin-right: 100rpx;" class="operation-btn upload-btn" @click="handleDownloadTemplate(childForm.id, childForm.name)">
            <text>下载模板</text>
          </view>
          <view class="operation-btn upload-btn" @click="handleUploadData(childForm.id)">
            <text>上传数据</text>
          </view>
        </view>
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
  </view>
</template>

<script>
import { getList, getForm, submitForm, downloadTemplate, getFormTree } from '@/api/auth'
import DynamicForm from './components/DynamicForm.vue'
// 手动引入需要的组件
import { uniPopup, uniIcons } from '@dcloudio/uni-ui'

export default {
  components: {
    DynamicForm,
    uniPopup,
    uniIcons
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
        { name: '自由填报' }
      ],
      formList: [],
      pickerRange: [[], []],
      pickerIndexes: [0, 0],
      selectedFormText: '',
      parentForm: {},
      childForm: {}
    }
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
    async handleUploadData(id) {
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
              const response = await fetch(`${window.location.origin}/dataFilling/form/${id}/excel/upload`, {
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
        const res = await getFormTree()
        if (res.success) {
          this.formList = res.data
          // 初始化第一列数据
          this.$set(this.pickerRange, 0, this.formList)
          // 初始化第二列数据
          this.$set(this.pickerRange, 1, this.formList[0]?.children || [])
        }
      } catch (error) {
        console.error('获取表单列表失败:', error)
      }
    },

    // 处理列变化
    handleColumnChange(e) {
      const { column, value } = e.detail
      
      if (column === 0) { // 第一列变化
        this.pickerIndexes[0] = value
        // 更新第二列数据
        this.pickerRange[1] = this.formList[value]?.children || []
        // 重置第二列索引
        this.pickerIndexes[1] = 0
        // 手动更新 range
        this.$set(this.pickerRange, 1, this.formList[value]?.children || [])
      } else { // 第二列变化
        this.pickerIndexes[1] = value
      }
    },

    // 处理表单选择
    async handleFormSelect(e) {
      const indexes = e.detail.value
      this.parentForm = this.formList[indexes[0]]
      this.childForm = this.parentForm?.children?.[indexes[1]]
      console.log(this.parentForm,this.childForm)
      
      if (!this.childForm) return
      
      this.selectedFormText = `${this.parentForm.name} / ${this.childForm.name}`
    },

    // 处理自由填报表单提交
    async handleFreeFormSubmit(formData) {
      try {
        const res = await submitForm(null, [formData], this.selectedForm.id)
        if (res.success) {
          uni.showToast({
            title: '提交成功',
            icon: 'success'
          })
          this.selectedForm = {}
          this.formItems = []
        }
      } catch (error) {
        console.error('提交失败:', error)
        uni.showToast({
          title: '提交失败',
          icon: 'none'
        })
      }
    },

    // 处理 tab 切换
    handleTabChange(index) {
      this.currentTab = index
      if (index === 1 && !this.formList.length) {
        this.getFormList()
      }
    },
  },
  
  mounted() {
    this.getTableData()
  }
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
  margin-bottom: 20rpx;
}

.form-label {
  font-size: 28rpx;
  color: #606266;
  margin-bottom: 10rpx;
}

.form-content {
  width: 100%;
}

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
</style>
