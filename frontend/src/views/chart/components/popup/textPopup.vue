<template>
  <div ref="textPopup" :style="bg_class" style="padding: 0;width: 100%;height: 100%;overflow: hidden;">
    <el-row>
      <p v-show="title_show" ref="title" :style="title_class">{{ chart.title }}</p>
      <div>
        <el-popover
          width="400"
          trigger="manual"
          v-model="visible"
        >
          <div>
            <p style="margin: 0px;position: relative;">
              <span>详情</span>
              <i class="el-icon-close" style="position: absolute;right: 0px;font-size: 20px;" @click="closePop" />
            </p>
            <div>

            </div>
          </div>
          <div slot="reference">
            <div :style="popStyle" @click.stop="clickPop"></div>
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
  name: 'textPopup',
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
    }
  },
  data() {
    return {
      visible: false,
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
      borderRadius: '0px',
      infoData: [],
      
    }
  },
  computed: {
    ...mapState([
      'curComponent',
      'componentData',
      'canvasStyleData',
      'previewCanvasScale'
    ]),
    bg_class() {
      return {
        background: hexColorToRGBA('#ffffff', 0),
        borderRadius: this.borderRadius
      }
    },
    popStyle() {
      const style = {}
      if(this.element.style) {
        style.width = this.element.style.width + 'px'
        style.height = this.element.style.height  + 'px'
      }
      return style
    }
  },
  mounted() {
    console.log('弹窗显示数据，，',this.chart,this.element)
    if (this.chart.data) {
      this.initData()
    }
  },
  watch: {
    chart: function() {
      if (this.chart.data) {
        this.initData()
      }
    }
  },
  methods: {
    initData() {
      this.initStyle()
    },
    initStyle() {
      if(this.chart.customAttr) {
        const customAttr = JSON.parse(this.chart.customAttr)

      }

      if(this.chart.customStyle) {
        const customStyle = JSON.parse(this.chart.customStyle)
        
        if(customStyle.text) {
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
    chartResize() {
      // 指定图表的配置项和数据
      // this.calcHeightDelay()
      // this.visible = true
    },
    resetHeight() {
      this.height = 100
    },
    clickPop() {
      console.log('点击，，，',this.chart)
      this.visible = true
    },
    closePop() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">

</style>