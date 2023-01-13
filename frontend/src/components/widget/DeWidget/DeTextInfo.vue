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
      style.color = this.element.commonSelectFrame.fontColor
      return style
    }
  },
  mounted() {
    console.log('detextInfo')
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
      },500)
    }
  }
}
</script>
<style scoped>

</style>