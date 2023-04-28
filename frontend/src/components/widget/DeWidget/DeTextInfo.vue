<template>
  <div>
    <el-row class="row_box" style="padding:10px;overflow:auto;" :style="textStyle">
      <el-col ref="infobox">
        <el-col v-for="(item,index) in setInfo" :key="index" style="margin-bottom: 10px;">
          <el-row>
            <el-col :style="nameStyle">{{item.name}}:</el-col>
            <el-col :style="valueStyle" class="value_box">
              {{item.value}}
            </el-col>
          </el-row>
        </el-col>
      </el-col>
      <el-col v-if="carouseObj.show">
        <img :src="carouseObj.url"  style="width: 100%;" :style="{height: imgHeight}"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    element: {
      type: Object,
      default: null
    },
    
  },
  data() {
    return {
      loop: null,
      setInfo: [],
      carouseObj: {
        show: false,
        url: '',
        height: '100px',
      },
      scrollInfo: {}, // 滚动表格数据信息
      oldInfo: {}, // 
      handleScroll: {}, // 处理后的滚动表格信息

    }
  },
  computed: {
    ...mapState([
      'curComponent',
      'componentData',
      'canvasStyleData',
      'detailsViews',
    ]),
    textStyle() {
      let style = {}
      // if(this.element.commonSelectFrame) {
      //   style.color = this.element.commonSelectFrame.fontColor
      // }
      if(this.element.options) {
        style.color = this.element.options.fontColor? this.element.options.fontColor : '#000000'
        style.fontSize = this.element.options.fontSize? this.element.options.fontSize + 'px' : '14px'
        style.height = this.element.style.height + 'px'
      }
      return style
    },
    nameStyle() {
      let style = {}
      if(this.element.options) {
        style.width = this.element.options.nameWidth? this.element.options.nameWidth + '%': '30%'
      }
      return style
    },
    valueStyle() {
      let style = {}
      if(this.element.options) {
        style.width = this.element.options.valueWidth? this.element.options.valueWidth + '%': '70%'
      }
      return style
    },
    resultMode() {
      return this.canvasStyleData.panel.resultMode
    },
    resultCount() {
      return this.canvasStyleData.panel.resultCount
    },
    panelInfo() {
      return this.$store.state.panel.panelInfo
    },
    imgHeight() {
      let value = '100px'
      if(this.element.options.imgHeight) {
        value = this.element.options.imgHeight + 'px'
      }
      return value
    }
  },
  watch: {
    
  },
  mounted() {
    console.log('detextInfo')
    // console.log('所有组件：',this.componentData,this.canvasStyleData)
    this.init()
    console.log(this.detailsViews)
  },
  destroyed() {
    clearInterval(this.loop)
  },
  methods: {
    init() {
      this.loop = setInterval(() => {
        let arr = []
        this.detailsViews.map(item => {
          if(item.id === this.element.options.viewId) {
            arr = item.data
            this.carouseObj.show = item.show
            this.carouseObj.url = item.url
          }
        })
        this.setInfo = arr
        // console.log('详情信息，，',arr)
      },100)
      
    },
  }
}
</script>
<style scoped>
.value_box {
  padding-left: 5px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
}
</style>