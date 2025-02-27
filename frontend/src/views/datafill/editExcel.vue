<template>
  <div class="edit-excel-container">
    <div class="header">
      <div class="header-left">
        <el-button type="primary" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
      <div class="title" v-if="msg.name">{{ msg.name }}</div>
      <div class="header-right">
        <el-button type="success" icon="el-icon-check" @click="handleSave">保存</el-button>
      </div>
    </div>
    <div
      id="luckysheet"
      class="luckysheet-container"
    ></div>

    <div v-show="isMaskShow" class="download-mask">
      <div class="download-content">
        <i class="el-icon-loading"></i>
        <div class="download-text">正在加载数据...</div>
      </div>
    </div>
  </div>
</template>

<script>
import datafill from '@/api/datafill/datafill'

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
    }
  },
  data() {
    return {
      selected: '',
      isMaskShow: false,
    }
  },
  watch: {
    msg: {
      handler: async (newVal) => {
        console.log(2);
        // if(newVal.data) {
        //   this.init(newVal.data, 'save')
        // } else {
        //   this.getFormData()
        // }
      },
      deep: true,
    }
  },
  mounted() {
    console.log(1);
    
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
          this.$emit('addDataFill')
        }
      })
    },
    getFormData() {
      datafill.getFormData(this.msg.id).then(res => {
        this.init(JSON.parse(res.data.formData))
      })
    },
    handleBack() {
      luckysheet.destroy()
      this.$emit('update:drawer', false)
    },
    handleSave(type) {
      datafill.saveFormData({
        formId: this.msg.id,
        formData: JSON.stringify(luckysheet.getAllSheets())
      }).then(res => {
        if(type !== 'init') {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      })
    }
  },
}
</script>

<style scoped>
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
</style>

<style>
.luckysheet_info_detail {
  display: none !important;
}
.luckysheet-input-box {
  z-index: 1000000 !important;
}
</style>
