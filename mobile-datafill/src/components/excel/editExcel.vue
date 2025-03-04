<template>
  <div class="edit-excel-container">
    <div class="header">
      <div class="header-left">
        <button class="uni-btn" type="primary" @click="handleBack">返回</button>
      </div>
      <div class="title" v-if="props.msg.name">{{ props.msg.name }}</div>
      <div class="header-right">
        <button class="uni-btn" type="primary" @click="handleSave">保存</button>
      </div>
    </div>
    <div
      id="luckysheet"
      class="luckysheet-container"
    ></div>

    <div v-show="isMaskShow" class="download-mask">
      <div class="download-content">
        <div class="loading-icon"></div>
        <div class="download-text">正在加载数据...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { saveFormData, getFormData } from '@/api/datafill'

const props = defineProps({
  msg: {
    type: Object,
    default: () => ({})
  },
  drawerVisible: {
    type: Boolean,
    default: false
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
  saveFormData({
    id: props.msg.id,
    formData: JSON.stringify(luckysheet.getAllSheets())
  }).then(res => {
    if(type !== 'init') {
      uni.showToast({
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
  height: 100vh;
  width: 100%;
  position: relative;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 32rpx;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e6e6e6;
  height: 100rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.08);
}

.uni-btn {
  margin: 0;
  padding: 0 20rpx;
  height: 64rpx;
  line-height: 64rpx;
}

.header .title {
  font-size: 36rpx;
  font-weight: 500;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 50%;
}

.header .header-left,
.header .header-right {
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
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  width: 84rpx;
  height: 84rpx;
  margin-bottom: 40rpx;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.download-text {
  font-size: 40rpx;
  color: #303133;
}

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
