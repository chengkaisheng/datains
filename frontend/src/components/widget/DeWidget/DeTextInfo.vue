<template>
  <div>
    <el-row style="padding:10px" :style="textStyle">
      <el-col v-for="(item,index) in setInfo" :key="index" style="margin-bottom: 10px;">
        <el-col :span="6">
          {{item.name}}:
        </el-col>
        <el-col :span="18">
          {{item.value}}
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { save2Cache } from '@/api/chart/chart'
import { viewData } from '@/api/panel/panel'
import { viewInfo } from '@/api/link'
import { getToken, getLinkToken } from '@/utils/auth'

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
      if(this.element.commonSelectFrame) {
        style.color = this.element.commonSelectFrame.fontColor
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
          }
        })
        this.setInfo = arr
        // console.log('详情信息，，',arr)
        this.setViews()
      },100)
    },
    setViews() {
      
    }
  }
}
</script>
<style scoped>

</style>