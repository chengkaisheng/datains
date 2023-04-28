<template>
  <div style="width: 100%">
    <el-col>
      <el-form ref="widthForm" :model="widthForm" label-width="100px" size="mini">
        <el-form-item :label="$t('chart.adaptWidth')" class="form-item">
          <el-checkbox v-model="widthForm.adaptWidth" @change="changeBarSizeCase"></el-checkbox>
        </el-form-item>
        <el-col v-if="!widthForm.adaptWidth">
          <el-form-item v-for="(item,index) in widthForm.widthData" :label="$t('chart.firstWidthName')+(index+1)+$t('chart.lastWidthName')" :key="index" class="form-item">
            <el-input-number v-model="item.value" size="mini" :min="1" :step="1" :step-strictly="true" @change="changeBarSizeCase"></el-input-number>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { COLOR_PANEL, DEFAULT_SIZE } from '../../chart/chart'
import { mapState } from 'vuex'

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
      widthForm: JSON.parse(JSON.stringify(DEFAULT_SIZE))
    }
  },
  watch: {
    'chart': {
      handler: function() {
        this.initData()
      }
    }
  },
  computed: {
    ...mapState([
      'curComponent'
    ])
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // console.log('widthStyle,,,',this.chart,this.curComponent)
      const chart = JSON.parse(JSON.stringify(this.chart))
      if (chart.customAttr) {
        let customAttr = null
        if (Object.prototype.toString.call(chart.customAttr) === '[object Object]') {
          customAttr = JSON.parse(JSON.stringify(chart.customAttr))
        } else {
          customAttr = JSON.parse(chart.customAttr)
        }
        // console.log('customAttr',customAttr)
        if(customAttr.size) {
          this.widthForm = customAttr.size

          let xaxis = null
          let yaxis = null
          let arr = []
          if (typeof chart.xaxis === 'object') {
            xaxis = JSON.parse(JSON.stringify(chart.xaxis))
          } else {
            xaxis = JSON.parse(chart.xaxis)
          }
          if (typeof chart.yaxis === 'object') {
            yaxis = JSON.parse(JSON.stringify(chart.yaxis))
          } else {
            yaxis = JSON.parse(chart.yaxis)
          }
          if(xaxis) {
            xaxis.map(item => {
              arr.push({value: 100})
            })
          }
          if(yaxis) {
            yaxis.map(item => {
              arr.push({value: 100})
            })
          }

          let avg = 100;
          if(this.curComponent && this.curComponent.style &&this.curComponent.style.width) {
            avg = parseFloat(this.curComponent.style.width / arr.length).toFixed(2)
            // console.log('avgggggggggggg',avg)
          }
          arr.map(item => {
            item.value = avg
          })

          // console.log('arrrrrrrrr',arr)

          if(this.widthForm.widthData === undefined || this.widthForm.widthData.length === 0) {
            this.widthForm.widthData = arr
          } else {
            if (arr.length !== this.widthForm.widthData.length) {
              let arr1 = []
              let w = JSON.parse(JSON.stringify(this.widthForm.widthData))
              arr.map((item,index) => {
                if(index < w.length) {
                  arr1.push(w[index])
                } else {
                  arr1.push({value: avg})
                }
              })
              // console.log('arr11111111111111',arr1)
              this.widthForm.widthData = arr1

              this.changeBarSizeCase()
            }
          }
        }
      }
    },
    changeBarSizeCase() {
      // console.log('wwwwww-----', this.widthForm)
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