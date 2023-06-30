<template>
  <div style="width: 100%">
    <el-col>
      <el-form v-show="chart.type && chart.type === '3dfunnel'" ref="sizeFormFunnel" :model="sizeForm" label-width="100px" size="mini">
        <el-form-item :label="$t('chart.hc_3d_width')" class="form-item">
          <el-slider v-model="sizeForm.hc3dWidth" show-input :show-input-controls="false" input-size="mini" :min="0" :max="100" @change="changeFocusCase" />
        </el-form-item>
        <el-form-item :label="$t('chart.hc_3d_height')" class="form-item">
          <el-slider v-model="sizeForm.hc3dHeight" show-input :show-input-controls="false" input-size="mini" :min="0" :max="100" @change="changeFocusCase" />
        </el-form-item>
        <el-form-item :label="$t('chart.hc_3d_neck_width')" class="form-item">
          <el-slider v-model="sizeForm.hc3dNeckWidth" show-input :show-input-controls="false" input-size="mini" :min="0" :max="100" @change="changeFocusCase" />
        </el-form-item>
        <el-form-item :label="$t('chart.hc_3d_neck_height')" class="form-item">
          <el-slider v-model="sizeForm.hc3dNeckHeight" show-input :show-input-controls="false" input-size="mini" :min="0" :max="100" @change="changeFocusCase" />
        </el-form-item>
        <el-form-item :label="$t('chart.hc_3d_funnel_opacity')" class="form-item">
          <el-slider v-model="sizeForm.hc3dFunnelOpacity" show-input :show-input-controls="false" input-size="mini" :step="0.1" :min="0" :max="1" @change="changeFocusCase" />
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import { COLOR_PANEL, DEFAULT_SIZE } from '../../chart/chart'
export default {
  name: 'SizeSelectorHc',
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
      sizeForm: JSON.parse(JSON.stringify(DEFAULT_SIZE)),
      predefineColors: COLOR_PANEL
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
    this.initData()
  },
  methods: {
    initData() {
      const chart = JSON.parse(JSON.stringify(this.chart))
      if (chart.customAttr) {
        let customAttr = null
        if (Object.prototype.toString.call(chart.customAttr) === '[object Object]') {
          customAttr = JSON.parse(JSON.stringify(chart.customAttr))
        } else {
          customAttr = JSON.parse(chart.customAttr)
        }
        if (customAttr.size) {
          this.sizeForm = customAttr.size
        }
      }
    },

    changeFocusCase() {
      this.$emit('onSizeChange', this.sizeForm)
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
