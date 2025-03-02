<template>
  <view class="edit-excel-container">
    <view class="header">
      <view class="header-left">
        <button class="uni-btn" type="primary" @click="handleBack">返回</button>
      </view>
      <view class="title" v-if="msg.name">{{ msg.name }}</view>
      <view class="header-right">
        <button class="uni-btn" type="primary" @click="handleSave">保存</button>
      </view>
    </view>
    <view
      id="luckysheet"
      class="luckysheet-container"
    ></view>

    <view v-show="isMaskShow" class="download-mask">
      <view class="download-content">
        <text class="loading-icon"></text>
        <text class="download-text">正在加载数据...</text>
      </view>
    </view>
  </view>
</template>

<script>
import { saveFormData, getFormData } from '@/api/auth'

export default {
  name: 'EditExcel',
  props: {
    msg: {
      type: Object,
      default: () => ({})
    },
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: '',
      isMaskShow: false,
    }
  },
  // watch: {
  //   msg: {
  //     handler: async function(newVal) {
  //       if(newVal.data) {
  //         this.init(newVal.data, 'save')
  //       } else {
  //         this.getFormData()
  //       }
  //     },
  //     deep: true,
  //   }
  // },
  mounted() {
    if(this.msg.data) {
      this.init(this.msg.data, 'save')
    } else {
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
          data: data || []
        })
        if(type === 'save') {
          // console.log('123')
          this.$emit('addDataFill')
        }
      })
    },
    getFormData() {
      getFormData(this.msg.id).then(res => {
        this.init(JSON.parse(res.data.formData))
      })
    },
    handleBack() {
      luckysheet.destroy()
      this.$emit('update:drawerVisible', false)
    },
    handleSave(type) {
      saveFormData({
        formId: this.msg.id,
        nodeType: 'form',
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
  },
}
</script>

<style lang="scss">
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
  // 添加loading动画
  @keyframes loading {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  animation: loading 1s linear infinite;
}

.download-text {
  font-size: 40rpx;
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
