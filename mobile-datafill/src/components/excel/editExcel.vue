<template>
  <div class="edit-excel-container">
    <div class="header">
      <div class="header-left">
        <van-button
          class="action-button"
          plain
          @click="handleBack"
        >
          <template #icon>
            <van-icon name="arrow-left" />
          </template>
          返回
        </van-button>
      </div>
      <div class="title" v-if="props.msg.name">{{ props.msg.name }}</div>
      <div class="header-right">
        <van-button
          class="action-button"
          type="primary"
          @click="handleSave"
        >
          <template #icon>
            <van-icon name="save" />
          </template>
          保存
        </van-button>
      </div>
    </div>

    <div
      id="luckysheet"
      class="luckysheet-container"
    ></div>

    <!-- 加载遮罩 -->
    <Transition name="fade">
      <div v-show="isMaskShow" class="download-mask">
        <div class="loading-content">
          <van-loading
            type="spinner"
            color="var(--primary-color)"
            size="36"
          />
          <div class="loading-text">正在加载数据...</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { showToast } from 'vant'
import { getFormData, saveFormData } from '@/api/datafill'

const props = defineProps({
  msg: {
    type: Object,
    default: () => ({})
  },
  drawerVisible: {
    type: Boolean,
    default: false
  },
  formDataId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:drawerVisible', 'saveSelfReport'])

const selected = ref('')
const isMaskShow = ref(false)

const init = (data, type) => {
  isMaskShow.value = true
  nextTick(() => {
    isMaskShow.value = false
    luckysheet.destroy()
    luckysheet.create({
      container: 'luckysheet',
      title: props.msg.name,
      lang: 'zh',
      plugins: ['chart'],
      data: data || []
    })
    if(type === 'save') {
      emit('saveSelfReport')
    }
  })
}

const getFormDataFunc = () => {
  getFormData(props.msg.id).then(res => {
    init(JSON.parse(res.data.formData))
  })
}

const handleBack = () => {
  luckysheet.destroy()
  emit('update:drawerVisible', false)
}

const handleSave = (type) => {
  if(!props.formDataId) {
    return
  }
  saveFormData({
    id: props.formDataId,
    formData: JSON.stringify(luckysheet.getAllSheets())
  }).then(res => {
    if(type !== 'init') {
      showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
    }
  })
}

onMounted(() => {
  if(props.msg.data) {
    init(props.msg.data, 'save')
  } else {
    getFormDataFunc()
  }
})
</script>

<style>
.edit-excel-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100%;
  position: relative;
  background: var(--bg-primary);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  height: 56px;
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: 10;
}

.header .title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 50%;
}

.header .header-left,
.header .header-right {
  flex: 1;
  display: flex;
  align-items: center;
}

.header .header-left {
  justify-content: flex-start;
}

.header .header-right {
  justify-content: flex-end;
}

.action-button {
  height: 32px;
  font-size: 14px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
}

.action-button :deep(.van-button__icon) {
  font-size: 16px;
}

.luckysheet-container {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  left: 0;
  top: 56px;
  bottom: 0;
  background: var(--bg-secondary);
}

.download-mask {
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-text {
  font-size: 14px;
  color: var(--text-primary);
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Luckysheet 相关样式覆盖 */
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

/* 美化 Luckysheet 工具栏 */
#luckysheet-wa-editor {
  background: var(--bg-primary) !important;
  border-bottom: 1px solid var(--border-color) !important;
  box-shadow: var(--shadow-sm) !important;
}

.luckysheet-toolbar-button {
  border-radius: var(--radius-sm) !important;
  transition: background-color 0.2s !important;
}

.luckysheet-toolbar-button:hover {
  background-color: var(--bg-tertiary) !important;
}

.luckysheet-toolbar-separator {
  border-color: var(--border-light) !important;
}

/* 美化单元格选中状态 */
.luckysheet-selection-corner {
  border-color: var(--primary-color) !important;
}

.luckysheet-selection-copy {
  border: 1px dashed var(--primary-color) !important;
}

/* 美化滚动条 */
.luckysheet-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.luckysheet-scrollbar::-webkit-scrollbar-thumb {
  background: var(--text-disabled);
  border-radius: 3px;
}

.luckysheet-scrollbar::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}
</style>
