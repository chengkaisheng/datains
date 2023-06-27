<template>
  <div ref="textPopup" :style="bg_class" style="padding: 0;width: 100%;height: 100%;overflow: hidden;">
    <el-row>
      <p v-show="title_show" ref="title" :style="title_class">{{ chart.title }}</p>
      <div>
        <el-popover
          v-model="visible"
          width="400"
          trigger="manual"
          :append-to-body="inScreen"
          popper-class="pop_box"
        >
          <div>
            <!-- <p style="margin: 0px;position: relative;">
              <span>详情</span>
              <i class="el-icon-close" style="position: absolute;right: 0px;font-size: 20px;" @click="closePop" />
            </p> -->
            <div>
              <el-row :style="{backgroundColor: box_style.popupBackColor,padding: '10px'}">
                <el-col
                  v-for="(item,index) in infoData"
                  :key="index"
                  :style="{
                    backgroundColor: box_style.backgroundColor,
                    marginBottom: index<(infoData.length-1)? '10px': ''
                  }"
                >
                  <el-col v-for="(obj,ind) in item" :key="ind">
                    <el-col :span="6" class="box_auto" :style="{color: box_style.nameColor,textAlign: 'center'}">{{ obj.name }}:</el-col>
                    <el-col :span="18" class="box_auto" :style="{color: box_style.valColor}">{{ obj.value }}</el-col>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </div>
          <div slot="reference">
            <div :style="popStyle" @click.stop="clickPop" />
          </div>
        </el-popover>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { hexColorToRGBA } from '@/views/chart/chart/util'

export default {
  name: 'TextPopup',
  props: {
    element: {
      type: Object,
      required: true
    },
    chart: {
      type: Object,
      required: true
    },
    filter: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    showSummary: {
      type: Boolean,
      required: false,
      default: true
    },
    inScreen: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      associateFiled: '',
      title_show: true,
      title_class: {
        margin: '0 0',
        width: '100%',
        fontSize: '18px',
        color: '#303133',
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: 'normal'
      },
      box_style: {
        valColor: '#ffffff',
        nameColor: '#ffffff',
        backgroundColor: '#0c4f96',
        popupBackColor: '#1b2642'
      },
      borderRadius: '0px',
      infoData: [],
      fields: []
    }
  },
  computed: {
    ...mapState([
      'curComponent',
      'componentData',
      'canvasStyleData',
      'previewCanvasScale',
      'scrollViews',
      'scrollVisible',
      'scrollFilters'
    ]),
    bg_class() {
      return {
        background: hexColorToRGBA('#ffffff', 0),
        borderRadius: this.borderRadius
      }
    },
    popStyle() {
      const style = {}
      if (this.element.style) {
        style.width = this.element.style.width + 'px'
        style.height = this.element.style.height + 'px'
      }
      return style
    }
  },
  watch: {
    chart: function() {
      if (this.chart.data) {
        this.initData()
      } else {
        this.fields = []
        this.infoData = []
      }
    },
    scrollVisible: { // 展示弹窗用
      handler(val1, val2) {
        console.log('val11111111111', val1)

        if (this.chart.data && this.chart.data.sourceFields) {
          this.chart.data.sourceFields.forEach(item => {
            const sourceInfo = this.chart.id + '#' + item.id
            this.scrollViews.forEach(el => {
              if (sourceInfo === el) {
                this.visible = this.scrollVisible
                this.associateFiled = item.datainsName
                if (this.visible) {
                  this.setData()
                }
              }
            })
          })
        }
      }
    }
  },
  mounted() {
    console.log('element,chart', this.chart, this.element)
    if (this.chart.data) {
      this.initData()
    }
  },
  methods: {
    initData() {
      const fields = this.chart.data.fields
      const data = JSON.parse(JSON.stringify(this.chart.data.tableRow))
      const d = []
      for (let i = 0; i < data.length; i++) {
        const obj = data[i]
        const arr = []
        for (const k in obj) {
          const a = k
          fields.map(item => {
            if (a === item.datainsName) {
              arr.push({
                name: item.name,
                value: obj[a]
              })
            }
          })
        }
        d.push(arr)
      }
      console.log('数据，，，', d)
      this.infoData = d

      this.initStyle()
    },
    initStyle() {
      if (this.chart.customAttr) {
        const customAttr = JSON.parse(this.chart.customAttr)

        if (customAttr.color) {
          this.box_style.valColor = customAttr.color.quotaColor
          this.box_style.nameColor = customAttr.color.dimensionColor
          this.box_style.backgroundColor = customAttr.color.textPopBackColor
          this.box_style.popupBackColor = customAttr.color.popupBackColor
        }
      }

      if (this.chart.customStyle) {
        const customStyle = JSON.parse(this.chart.customStyle)

        if (customStyle.text) {
          this.title_show = customStyle.text.show

          this.title_class.fontSize = (customStyle.text.fontSize * this.previewCanvasScale.scalePointWidth) + 'px'
          this.title_class.color = customStyle.text.color
          this.title_class.textAlign = customStyle.text.hPosition
          this.title_class.fontStyle = customStyle.text.isItalic ? 'italic' : 'normal'
          this.title_class.fontWeight = customStyle.text.isBolder ? 'bold' : 'normal'
        }

        if (customStyle.background) {
          this.bg_class.background = hexColorToRGBA(customStyle.background.color, customStyle.background.alpha)
        }
      }
    },
    setData() { // 点击滚动表格，获取到联动点击的值过滤
      const fields = this.chart.data.fields
      const data = JSON.parse(JSON.stringify(this.chart.data.tableRow))
      // console.log(fields,data,this.associateFiled,this.scrollFilters)
      const d = []
      for (let i = 0; i < data.length; i++) {
        const obj = data[i]
        const arr = []
        for (const k in obj) {
          const a = k
          fields.map(item => {
            if (a === item.datainsName) {
              arr.push({
                name: item.name,
                value: obj[a]
              })
            }
          })
        }
        if (obj[this.associateFiled] === this.scrollFilters[0]) {
          d.push(arr)
        }
      }
      // console.log('ddddddddddd',d)
      this.infoData = d
    },
    chartResize() {
      // 指定图表的配置项和数据
      // this.calcHeightDelay()
      // this.visible = true
    },
    resetHeight() {
      this.height = 100
    },
    clickPop() {
      console.log('点击，，，', this.chart)
      // this.visible = true
    },
    closePop() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
.box_auto {
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-popover {  // 这里可能会有样式冲突，popover
  padding: 0px;
}
</style>
