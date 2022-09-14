<template>
  <div style="width: 100%">
    <el-col>
      <el-form ref="legendForm" :model="legendForm" label-width="80px" size="mini">
        <!-- <el-form-item :label="$t('chart.show')" class="form-item">
          <el-checkbox v-model="legendForm.show" @change="changeLegendStyle">{{ $t('chart.show') }}</el-checkbox>
        </el-form-item> -->
        <div>
          <!-- {{ chart.render }} -->
          <el-form-item :label="'线点样式'" class="form-item">
            <el-select v-model="legendForm.lineIcon" :placeholder="$t('chart.icon')" @change="changeLegendStyle">
              <el-option
                v-for="item in iconSymbolOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="'线图标大小'" class="form-item">
            <el-select v-model="legendForm.symbolSize" :placeholder="'线图标大小'" size="mini" @change="changeLegendStyle">
              <el-option v-for="option in fontSize" :key="option.value" :label="option.name" :value="option.value" />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { COLOR_PANEL, DEFAULT_LEGEND_STYLE } from '../../chart/chart'

export default {
  name: 'LegendSelector',
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
      legendForm: {
        lineIcon: 'circle',
        symbolSize: 16
      },
      fontSize: [],
      iconSymbolOptions: [
        { name: 'circle', value: 'circle' },
        { name: 'rect', value: 'rect' },
        { name: 'roundRect', value: 'roundRect' },
        { name: 'triangle', value: 'triangle' },
        { name: 'pin', value: 'pin' },
        { name: 'diamond', value: 'diamond' },
        { name: 'arrow', value: 'arrow' }
      ],
      isSetting: false,
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
    this.init()
    this.initData()
  },
  methods: {
    initData() {
      const chart = JSON.parse(JSON.stringify(this.chart))
      if (chart.customStyle) {
        let customStyle = null
        if (Object.prototype.toString.call(chart.customStyle) === '[object Object]') {
          customStyle = JSON.parse(JSON.stringify(chart.customStyle))
        } else {
          customStyle = JSON.parse(chart.customStyle)
        }
        if (customStyle.lineStyle) {
          this.legendForm = customStyle.lineStyle
        }
      }
    },
    init() {
      const arr = []
      for (let i = 10; i <= 60; i = i + 2) {
        arr.push({
          name: i + '',
          value: i + ''
        })
      }
      this.fontSize = arr
    },
    changeLegendStyle() {
      // if (!this.legendForm.show) {
      //   this.isSetting = false
      // }
      this.$emit('onLineChange', this.legendForm)
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
  span{
    font-size: 12px
  }
  .el-form-item{
    margin-bottom: 6px;
  }

.switch-style{
  position: absolute;
  right: 10px;
  margin-top: -4px;
}
.color-picker-style{
  cursor: pointer;
  z-index: 1003;
}
</style>
