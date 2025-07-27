<template>
  <div class="data-fill-form">
    <van-nav-bar
      title="数据填报"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="form-content">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 填报类型选择 -->
          <van-field
            v-model="formData.type"
            is-link
            readonly
            name="填报类型"
            label="填报类型"
            placeholder="请选择填报类型"
            @click="showTypePopup = true"
          />

          <!-- 文件夹选择 -->
          <van-field
            v-model="formData.taskName"
            is-link
            readonly
            name="选择文件夹"
            label="选择文件夹"
            placeholder="请选择文件夹"
            @click="handleShowTaskPopup"
          />

          <!-- 表单选择 - 仅在表单填报时显示 -->
          <van-field
            v-show="formData.type === '表单填报'"
            v-model="formData.template"
            is-link
            readonly
            name="选择表单"
            label="选择表单"
            placeholder="请选择表单"
            @click="showTemplatePopup = true"
          />

          <!-- AI开关选项 -->
          <van-field
            v-show="formData.type !== '其他'"
            name="enableAI"
            label="开启AI"
          >
            <template #input>
              <van-switch v-model="formData.enableAI" size="20" />
            </template>
          </van-field>
        </van-cell-group>

        <!-- 按钮区域 -->
        <div style="margin: 16px">
          <van-button v-show="formData.type === '表单填报'" round block type="primary" native-type="button" @click="downloadTemplateFn">
            下载表单（模板）
          </van-button>
          <!-- 自主填报关闭了上传模板 -->
          <!-- <van-button v-show="formData.type === '自主填报'" round block type="primary" native-type="button" @click="downloadSelfTemplateFn">
            下载模板
          </van-button> -->
          <van-button round block type="primary" native-type="button" style="margin-top: 16px" @click="handleUploadClick">
            上传
          </van-button>
          <input
            ref="fileInput"
            type="file"
            :accept="acceptFileTypes"
            style="display: none"
            @change="handleFileChange"
          />
        </div>
      </van-form>
    </div>

    <!-- 填报类型选择弹窗 -->
    <van-popup v-model:show="showTypePopup" position="bottom">
      <van-cell-group>
        <van-cell
          v-for="type in fillTypes"
          :key="type"
          :title="type"
          @click="selectType(type)"
        />
      </van-cell-group>
    </van-popup>

    <!-- 文件夹选择弹窗 -->
    <van-popup v-model:show="showTaskPopup" @click-overlay="closeTaskPopup" position="bottom" :style="{ height: '60%' }">
      <div class="task-popup">
        <div class="task-popup-header">
          <van-nav-bar
            title="选择文件夹"
            left-text="取消"
            right-text="确认"
            @click-left="closeTaskPopup"
            @click-right="confirmTaskSelection"
          />
          <van-search
            v-model="taskSearchValue"
            placeholder="请输入搜索关键词"
            @update:model-value="handleTaskSearch"
          />
        </div>
        <div class="task-tree-container">
          <template v-for="node in taskTree" :key="node.id">
            <TreeNode
              :node="node"
              :expand="!!taskSearchValue"
              :selected-id="selectedTaskId"
              @select="onClickItem"
            />
          </template>
        </div>
      </div>
    </van-popup>

    <!-- 表单选择弹窗 -->
    <van-popup v-model:show="showTemplatePopup" @click-overlay="closeTemplatePopup" position="bottom" :style="{ height: '60%' }">
      <div class="template-popup">
        <div class="template-popup-header">
          <van-nav-bar
            title="选择表单"
            left-text="取消"
            right-text="确认"
            @click-left="closeTemplatePopup"
            @click-right="confirmTemplateSelection"
          />
          <van-search
            v-model="templateSearchValue"
            placeholder="请输入表单名称"
            @update:model-value="handleTemplateSearch"
          />
        </div>
        <div class="template-list">
          <van-cell-group>
            <van-cell
              v-for="template in templates"
              :key="template.id"
              :title="template.name"
              :class="{ 'selected-template': template.id === selectedTemplateId }"
              @click="selectTemplate(template)"
            />
          </van-cell-group>
        </div>
      </div>
    </van-popup>

    <!-- 其他 自主上传弹窗 -->
    <van-popup v-model:show="showUploadPopup" @click-overlay="closeUploadPopup" position="center" round :style="{ width: '90%' }">
      <div class="upload-popup">
        <div class="upload-popup-header">
          <div class="upload-title">上传文件</div>
          <van-icon name="cross" class="close-icon" @click="closeUploadPopup" />
        </div>
        <van-form>
          <van-field
            v-model="uploadForm.fileName"
            name="文件名称"
            label="文件名称"
            placeholder="请输入文件名称"
            :rules="[{ required: true, message: '请输入文件名称' }]"
          />
          <div class="upload-field">
            <van-button
              size="small"
              type="primary"
              @click="triggerFileSelect"
            >选择文件</van-button>
            <div class="upload-tip">{{ uploadTipText }}</div>
            <div v-if="uploadForm.file" class="upload-tip">{{ uploadForm.file.name }}</div>
          </div>
          <div class="upload-actions">
            <van-button round block type="primary" @click="handleUploadSubmit">
              确定
            </van-button>
            <van-button round block type="default" @click="closeUploadPopup" style="margin-top: 12px">
              取消
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>

    <!-- Excel编辑全屏弹窗 -->
    <van-popup
      v-model:show="drawerVisible"
      position="right"
      :overlay="false"
      style="width: 100%;height: 100%;opacity: 0;z-index: -10;"
    >
      <editExcel
        v-if="drawerVisible"
        :msg="msg"
        :formDataId="formDataId"
        :drawer-visible="drawerVisible"
        @update:drawerVisible="drawerVisible = $event"
        @saveSelfReport="saveSelfReportFn"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showLoadingToast, showToast } from 'vant'
import TreeNode from './TreeNode.vue'
import { downloadTemplate, getAIData, getTaskTree, getTemplates, saveSelfReport, uploadData, downloadSelfReportTemplate, saveFormData, deleteForm } from '@/api/datafill'
import editExcel from '@/components/excel/editExcel.vue'
import { hasPermission } from '@/utils/permission.js'
import LuckyExcel from 'luckyexcel'
import {exportExcel} from '../excel/export.js'

const router = useRouter()

// 表单数据
const formData = ref({
  type: '',
  taskId: '',
  taskName: '',
  template: '',
  enableAI: true
})

// 弹窗控制
const showTypePopup = ref(false)
const showTaskPopup = ref(false)
const showTemplatePopup = ref(false)
const showUploadPopup = ref(false)

// 填报类型列表
const fillTypes = ['表单填报', '自主填报', '其他']

// 文件夹选择相关
const selectedTask = ref({})
const selectedTaskId = ref('')
const activeTaskIndex = ref(0)
const taskSearchValue = ref('')
const taskTree = ref([])

// 表单选择相关
const templateSearchValue = ref('')
const selectedTemplateId = ref('')

// 表单列表
const templates = ref([])

const fileInput = ref(null)

// 上传相关
const uploadForm = ref({
  fileName: '',
  file: null
})

// Excel编辑相关
const drawerVisible = ref(false)
const msg = ref({
  id: '',
  name: '',
  data: []
})

// 计算允许的文件类型
const acceptFileTypes = computed(() => {
  if (formData.value.enableAI || formData.value.type === '其他') {
    return '.xlsx,.xls,.pdf,.doc,.docx,.jpg,.jpeg,.png'
  }
  return '.xlsx'
})

// 计算上传提示文字
const uploadTipText = computed(() => {
  if (formData.value.enableAI || formData.value.type === '其他') {
    return '支持 Excel、PDF、Word、图片(jpg/png) 格式'
  }
  return '目前只支持 xlsx 文件'
})

// 处理树形数据 - 添加展开状态
const processTreeData = (items) => {
  return items.map(item => ({
    ...item,
    children: item.children ? processTreeData(item.children) : []
  }))
}

// 获取文件夹树数据
const loadTaskTree = async () => {
  const loading = showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  try {
    const params = {
      name: taskSearchValue.value,
      nodeType: 'folder'
    }
    const { data } = await getTaskTree(params)
    const processedData = processTreeData(data || [])
    taskTree.value = processedData
  } catch (error) {
    console.error('获取文件夹树失败：', error)
    showToast('获取文件夹列表失败')
  } finally {
    loading.close()
  }
}

// 获取表单列表
const loadTemplates = async () => {
  const loading = showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  try {
    const params = {
      pid: formData.value.taskId,
      name: templateSearchValue.value,
      nodeType: 'form',
      status: 1
    }
    const { data } = await getTemplates(params)
    console.log('表单数据:', data)
    templates.value = data.listObject || []
  } catch (error) {
    console.error('获取表单列表失败：', error)
    showToast('获取表单列表失败')
  } finally {
    loading.close()
  }
}

// 显示文件夹选择弹窗
const handleShowTaskPopup = () => {
  showTaskPopup.value = true
  loadTaskTree()
}

// 文件夹搜索处理
const handleTaskSearch = () => {
  loadTaskTree()
}

// 获取选中文件夹的完整路径名称
const getSelectedTaskFullName = () => {
  const findTask = (items, id, parentPath = '') => {
    for (const item of items) {
      const currentPath = parentPath ? `${parentPath} / ${item.name}` : item.name

      if (item.id === id) {
        return currentPath
      }

      if (item.children) {
        const found = findTask(item.children, id, currentPath)
        if (found) return found
      }
    }
    return ''
  }

  return findTask(taskTree.value, selectedTaskId.value)
}

// 关闭文件夹选择弹窗
const closeTaskPopup = () => {
  taskSearchValue.value = ''
  showTaskPopup.value = false
  selectedTaskId.value = formData.value.taskId
}

// 确认文件夹选择
const confirmTaskSelection = () => {
  if (!selectedTaskId.value) {
    showToast('请选择文件夹')
    return
  }
  formData.value.taskId = selectedTaskId.value
  formData.value.taskName = getSelectedTaskFullName()
  showTaskPopup.value = false
}

// 选择处理函数
const selectType = (type) => {
  formData.value.type = type
  // 切换类型时清空表单相关数据
  if (type === '表单填报') {
    formData.value.template = ''
    selectedTemplateId.value = ''
  }
  showTypePopup.value = false
}

// 表单搜索处理
const handleTemplateSearch = () => {
  loadTemplates()
}

// 关闭表单选择弹窗
const closeTemplatePopup = () => {
  showTemplatePopup.value = false
  templateSearchValue.value = ''
  selectedTemplateId.value = ''
}

// 确认表单选择
const confirmTemplateSelection = () => {
  const selectedTemplate = templates.value.find(t => t.id === selectedTemplateId.value)
  if (!selectedTemplate) {
    showToast('请选择表单')
    return
  }
  formData.value.template = selectedTemplate.name
  showTemplatePopup.value = false
}

// 选择表单
const selectTemplate = (template) => {
  selectedTemplateId.value = template.id
  // formData.value.template = template.name
  // 保存表单的权限信息
  selectedTemplate.value = template
}

// 下载自主填报模板
const downloadSelfTemplateFn = async () => {
  // 请先选择文件夹
  if (!formData.value.taskName) {
    showToast('请先选择文件夹')
    return
  }
  
  // 先获取模板id 
  const params = {
    pid: formData.value.taskId,
    name: '',
    nodeType: 'selfReport_template',
  }
  const { data } = await getTemplates(params)
  // 获取到模板id后获取模板json数据
  if(data.listObject.length > 0) {
    let res = await downloadSelfReportTemplate(data.listObject[0].id)
    const blob = new Blob([res])
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.download = formData.value.taskName + '.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    showToast('当前文件夹下暂无模板')
  }
}

// 下载表单（模板）
const downloadTemplateFn = () => {
  if (formData.value.type !== '表单填报') {
    showToast('请先选择表单填报类型')
    return
  }
  if (!formData.value.template || !selectedTemplateId.value) {
    showToast('请先选择表单')
    return
  }
  const loading = showLoadingToast({
    message: '下载中...',
    forbidClick: true,
    duration: 0
  })
  downloadTemplate(selectedTemplateId.value).then(res => {
    const blob = new Blob([res])
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.download = formData.value.template + '.xlsx' // 下载的文件名
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast({
      message: '下载成功',
      type: 'success',
      duration: 2
    })
  }).finally(() => {
    setTimeout(() => {
      loading.close()
    }, 2000)
  })
}

// 表单提交
const onSubmit = () => {
  if (!formData.value.taskId) {
    showToast('请选择文件夹')
    return
  }
  // TODO: 实现表单提交逻辑
  showToast('提交成功')
}

// 返回处理
const onClickLeft = () => {
  router.back()
}

// 点击节点处理
const onClickItem = (item) => {
  console.log('选中项:', item)
  selectedTask.value = item
  selectedTaskId.value = item.id
}

// 监听表单弹窗显示状态
watch(showTemplatePopup, (newVal) => {
  if (newVal && formData.value.taskId) {
    loadTemplates()
  }
})

// 关闭上传弹窗
const closeUploadPopup = () => {
  showUploadPopup.value = false
  uploadForm.value.fileName = ''
  uploadForm.value.file = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 触发文件选择
const triggerFileSelect = () => {
  fileInput.value.click()
}

// 处理文件选择
const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploadForm.value.file = file
  uploadForm.value.fileName = file.name
  const fileExt = file.name
    .substring(file.name.lastIndexOf('.') + 1)
    .toLowerCase()

  if(formData.value.type === '自主填报' || formData.value.type === '其他') {
    if(formData.value.type === '其他' || (formData.value.type === '自主填报' && formData.value.enableAI)) {
      // 限制文件格式为  .xlsx,.xls,.doc,.docx,.pdf,.jpg,.jpeg,.png
      if (!['xlsx', 'xls', 'doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png'].includes(fileExt)) {
        showToast({
           type: 'error',
           message: '请上传正确的文件格式！'
         })
        uploadForm.value.file = null
        uploadForm.value.fileName = ''
        return
      }
    } else {
      if (fileExt !== 'xlsx') {
        showToast({
           type: 'error',
           message: '请上传正确的文件格式！'
         })
        uploadForm.value.file = null
        uploadForm.value.fileName = ''
        return
      }
    }
     uploadForm.value.file = file
     uploadForm.value.fileName = file.name.replace(/\.[^/.]+$/, "") // 去除文件扩展名
     return
  }

  try {
     const loading = showLoadingToast({
       message: '正在上传...',
       forbidClick: true,
       duration: 0
     })
     closeUploadPopup()
     const formData1 = new FormData()
     formData1.append('file', file)
     if(formData.value.enableAI) {
       const res = await getAIData(formData1)
       if(!(res instanceof Blob)) {
        showToast({
          message: 'AI识别失败',
          // overlay: true,
          // forbidClick: false,
          // closeOnClick: true,
          // closeOnClickOverlay: true,
          type: 'fail',
          // duration: 0,
        })
        return
       }
       const formData2 = new FormData()
       formData2.append('file', res)
       const res2 = await uploadData(selectedTemplateId.value, formData2)
       loading.close()
       if (res2.success) {
         showToast({
           type: 'success',
           message: '上传成功，请登录pc端查看具体详情'
         })
         // 清空文件选择
         event.target.value = ''
       } else {
         showToast({
           type: 'fail',
           message: res2.message || '上传失败'
         })
       }
     } else {
       const res = await uploadData(selectedTemplateId.value, formData1)
       loading.close()
       if (res.success) {
         showToast({
           type: 'success',
           message: '上传成功，请登录pc端查看具体详情'
         })
         // 清空文件选择
         event.target.value = ''
       } else {
         showToast({
           type: 'fail',
           message: res.message || '上传失败'
         })
       }
       closeUploadPopup()
   } 
  } catch (error) {
    console.error('上传失败：', error)
    
  }

}

// 处理上传提交
const handleUploadSubmit = async () => {
  if (!uploadForm.value.fileName || !uploadForm.value.file) {
    showToast('请填写完整信息')
    return
  }

  const loading = showLoadingToast({
    message: '正在上传...',
    forbidClick: true,
    duration: 0
  })

  try {
    // 其他类型文件上传 先走save获取id，再上传文件
    if(formData.value.type === '其他') {
      let data = {
        level: selectedTask.value.level,
        name: uploadForm.value.fileName,
        nodeType: 'selfReport_file',
        pid: selectedTask.value.id
      }
      let res = await saveSelfReport(data)
      if(res.success && res.data) {
        const formData = new FormData()
        formData.append('file', uploadForm.value.file)
        saveFormData(res.data, formData).then(res1 => {
          if (res1.success) {
            closeUploadPopup()
            showToast({
              message: '上传成功，请登录pc端查看具体详情',
              type: 'success'
            })
          } else {
            showToast({
              message: res1.message || '上传失败',
              type: 'fail'
            })
          }
        }).finally(() => {
          loading.close()
        })
      } 
    } else {
      if (formData.value.enableAI) {
        const formData1 = new FormData()
        formData1.append('file', uploadForm.value.file)
        const res = await getAIData(formData1)
        
        // 将 AI 处理后的数据转换为 Excel 文件
        let file = new File([res], '表单.xlsx', {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          lastModified: Date.now()
        })
        uploadExcel(file, loading)
      } else {
        uploadExcel(uploadForm.value.file, loading)
      }
    }
    
  } catch (error) {
    console.error('上传失败：', error)
    showToast({
      message: 'AI识别失败',
      // overlay: true,
      // forbidClick: false,
      // closeOnClick: true,
      // closeOnClickOverlay: true,
      type: 'fail',
      // duration: 0,
    })
  } finally {
    // loading.close()
  }
}

const uploadExcel = (file, loading) => {
  let name = file.name;
  let suffixArr = name.split("."),
    suffix = suffixArr[suffixArr.length - 1];
  if (suffix != "xlsx") {
    showToast('目前只支持xlsx文件')
    return;
  }

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
            loading.close()
            showToast('无法读取文件内容，请检查文件是否损坏')
            return;
          }
          loading.close()
          drawerVisible.value = true;
          msg.value = {
            id: formData.value.taskId,
            name: uploadForm.value.fileName,
            data: exportJson.sheets,
            file: file,
          };
          closeUploadPopup()
        } catch (err) {
          loading.close()
          // console.error('处理Excel数据错误:', err)
          showToast('无法读取文件内容，请检查文件是否损坏')
          closeUploadPopup()
        }
      },
      function (err) {
        loading.close()
        console.error("Excel解析错误:", err);
        showToast('无法读取文件内容，请检查文件是否损坏')
        closeUploadPopup()
      }
    );
  } catch (err) {
    loading.close()
    console.error('Excel转换错误:', err)
    showToast('无法读取文件内容，请检查文件是否损坏')
    closeUploadPopup()
  }
}

// 点击上传按钮
const handleUploadClick = () => {
  if (!formData.value.taskId) {
    showToast('请选择文件夹')
    return
  }

  if (formData.value.type === '表单填报') {
    if (!formData.value.template || !selectedTemplateId.value) {
      showToast('请先选择表单')
      return
    }

    // 检查表单权限
    if (!selectedTemplate.value || !selectedTemplate.value.privileges.includes('write')) {
      showToast('暂无该表单填报权限！')
      return
    }

    fileInput.value.click()
  } else {
    // 其他 自主填报时检查文件夹权限
    if (!selectedTask.value || !selectedTask.value.privileges?.includes('write')) {
      showToast('暂无该文件夹自主填报权限！')
      return
    }

    // 自主填报，显示上传弹窗
    showUploadPopup.value = true
  }
}

// 添加 selectedTemplate ref
const selectedTemplate = ref(null)

const formDataId = ref('')
// 保存自报数据
const saveSelfReportFn = async () => {
  let data = {
    // formData: JSON.stringify(luckysheet.getAllSheets()),
    level: selectedTask.value.level,
    name: msg.value.name,
    nodeType: 'selfReport',
    pid: selectedTask.value.id
  }
  let res = await saveSelfReport(data)
  if(res.success) {
    formDataId.value = res.data
    saveFile(res.data)
  } 
}
// 保存  自主填报文件
const saveFile = async (formId) => {
  const formData = new FormData()
  let blob = await exportExcel(luckysheet.getAllSheets(), msg.value.name, true)
  formData.append('file', blob)
  saveFormData(formId, formData).then(res => {
    if (res.success) {
      showToast({
        message: '上传成功，请登录pc端查看具体详情',
        type: 'success'
      })
    } else {
      showToast({
        message: res.message || '保存失败',
        type: 'fail'
      })
    }
  }).finally(() => {
    luckysheet.destroy()
    drawerVisible.value = false
  })
}
</script>

<style scoped>
.data-fill-form {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.form-content {
  padding: 20px 0;
}

.task-popup {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.task-popup-header {
  flex-shrink: 0;
}

.task-tree-container {
  flex: 1;
  overflow: auto;
  padding: 0 16px;
}

:deep(.selected-node) {
  color: var(--van-primary-color);
  font-weight: bold;
}

:deep(.van-collapse-item__content) {
  padding-left: 16px;
}

:deep(.van-cell) {
  padding: 10px 16px;
}

:deep(.van-collapse-item__title) {
  font-size: 14px;
}

.template-popup {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.template-popup-header {
  flex-shrink: 0;
}

.template-list {
  flex: 1;
  overflow: auto;
}

:deep(.selected-template) {
  color: var(--van-primary-color);
  font-weight: bold;
}

.upload-popup {
  padding: 20px;
}

.upload-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.upload-title {
  font-size: 18px;
  font-weight: bold;
}

.close-icon {
  font-size: 20px;
  cursor: pointer;
}

.upload-field {
  padding: 16px;
  background-color: #f7f8fa;
  margin: 16px 0;
}

.upload-label {
  color: #646566;
  font-size: 14px;
  margin-bottom: 8px;
}

.upload-tip {
  color: #969799;
  font-size: 12px;
  margin-top: 8px;
}

.upload-actions {
  margin-top: 20px;
}
</style>
