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
      },100)
      // this.getScrollObj()
    },
    getScrollObj() {
      let obj = {}
      this.componentData.forEach(item => {
        if(item.component === 'user-view' && item.propValue.viewId === this.element.options.viewId) {
          obj = item
        }
      })
      this.getScrollInfo(obj.propValue.viewId)
    },
    getScrollInfo(id) {
      let method = viewData
      const token = this.$store.getters.token || getToken()
      const linkToken = this.$store.getters.linkToken || getLinkToken()
      if (!token && linkToken) {
        method = viewInfo
      }
      const requestInfo = {
        cache: false,
        drill: [],
        filter: [],
        linkageFilter: [],
        queryFrom: 'panel',
        resultCount: this.resultCount? this.resultCount : 1000,
        resultMode: this.resultMode? this.resultMode : 'all',
      }
      if (this.panelInfo.proxy) {
        // method = viewInfo
        requestInfo.proxy = { userId: this.panelInfo.proxy }
      }

      method(id,this.panelInfo.id,requestInfo).then(res => {
        this.scrollInfo = JSON.parse(JSON.stringify(res.data))
        this.oldInfo = res.data

        this.saveCache()
      })
    },
    saveCache() { // 缓存一下在查询到数据
      let drillList = []  // 滚动详情的字段
      if (typeof this.scrollInfo.drillFields === 'object') {
        drillList = JSON.parse(JSON.stringify(this.scrollInfo.drillFields))
      } else if (typeof this.scrollInfo.drillFields === 'string') {
        drillList = JSON.parse(this.scrollInfo.drillFields)
      }
      let xaxisList = [] // 滚动维度的字段
      if (typeof this.scrollInfo.xaxis === 'object') {
        xaxisList = JSON.parse(JSON.stringify(this.scrollInfo.xaxis))
      } else if (typeof this.scrollInfo.xaxis === 'string') {
        xaxisList = JSON.parse(this.scrollInfo.xaxis)
      }

      // 把详情的放入维度中
      drillList.map(item => {
        xaxisList.push(item)
      })
      this.scrollInfo.xaxis = JSON.stringify(xaxisList)
      this.scrollInfo.drillFields = "[]"
      this.scrollInfo.drillFilters = "[]"
      delete this.scrollInfo.data

      const requestInfo = {
        cache: false,
        drill: [],
        filter: [],
        linkageFilter: [],
        queryFrom: 'panel',
        resultCount: this.resultCount? this.resultCount : 1000,
        resultMode: this.resultMode? this.resultMode : 'all',
      }
      // 缓存对组件的数据维度进行处理的操作为了之后查询的数据
      save2Cache(this.scrollInfo.sceneId,this.scrollInfo).then(() => {
        let method = viewData
        const token = this.$store.getters.token || getToken()
        const linkToken = this.$store.getters.linkToken || getLinkToken()
        if (!token && linkToken) {
          method = viewInfo
        }
        method(this.scrollInfo.id,this.scrollInfo.sceneId,requestInfo).then( res => {
          console.log('这个滚动表格数据', res)
          this.handleScroll = res.data

          // 处理数据
          this.handleTable()
        })
      })
    },
    handleTable() {

    }
  }
}
</script>
<style scoped>

</style>