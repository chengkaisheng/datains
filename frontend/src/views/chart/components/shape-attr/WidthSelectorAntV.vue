<template>
  <div style="width: 100%">
    <el-col>
      <el-form ref="widthForm" :model="widthForm" label-width="100px" size="mini">
        <el-form-item :label="$t('chart.adapt')" class="form-item">
          <el-checkbox v-model="widthForm.adaptWidth" @change="changeSizeCase"></el-checkbox>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import {COLOR_PANEL, DEFAULT_SIZE } from '../../chart/chart'

export default {
  name: 'WidthSelectorAntV',
  props: {
    param: {
      type: Object,
      required: true
    },
    chart: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      widthForm: JSON.parse(JSON.stringify(DEFAULT_SIZE)),
    }
  },
  watch: {
    'chart': {
      handler: function() {
        this.initData()
      }
    }
  },
  mounted() {
    console.log('宽度设置，，，，')
    this.initData()
  },
  methods: {
    initData() {
      const chart = JSON.parse(JSON.stringify(this.chart))
      if(chart.customAttr) {
        let customAttr = null
        if (Object.prototype.toString.call(chart.customAttr) === '[object Object]') {
          customAttr = JSON.parse(JSON.stringify(chart.customAttr))
        } else {
          customAttr = JSON.parse(chart.customAttr)
        }

        if(customAttr.size) {
          this.widthForm = customAttr.size
        }
      }
    },
    changeSizeCase() {
      console.log('widthForm', this.widthForm)
      this.$emit('onSizeChange', this.widthForm)
    }
  }
}
</script>
<style scoped>
.shape-item{
  padding: 6px;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-item-slider>>>.el-form-item__label{
  font-size: 12px;
  line-height: 38px;
}
.form-item>>>.el-form-item__label{
  font-size: 12px;
}
.el-select-dropdown__item{
  padding: 0 20px;
}
  span{font-size: 12px}

.el-form-item{
  margin-bottom: 6px;
}
.el-divider--horizontal {
  margin: 10px 0
}
.divider-style>>>.el-divider__text{
  color: #606266;
  font-size: 12px;
  font-weight: 400;
  padding: 0 10px;
}
</style>