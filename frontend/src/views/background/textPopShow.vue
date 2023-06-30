<template>
  <div>
    <div style="padding: 20px;" :style="backStyle">
      <el-carousel trigger="click" :interval="3000" :height="popHeight">
        <el-carousel-item v-for="(item,ind) in fileList" :key="ind">
          <div style="width: 100%: 100%;">
            <img :src="item.url" alt="" style="width: 100%;" :style="imgStyle">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TextPopShow',
  props: {
    element: {
      type: Object,
      require: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    fileList() {
      if (this.element && this.element.options) {
        return this.element.options.popImgList
      } else {
        return []
      }
    },
    ...mapState([
      'curComponent',
      'componentData'
    ]),
    backStyle() {
      const style = {}
      if (this.element && this.element.options && this.element.options.popPanelColor) {
        style.backgroundColor = this.element.options.popPanelColor
      }
      return style
    },
    popHeight() {
      if (this.element && this.element.options && this.element.options.popHeight) {
        return this.element.options.popHeight + 'px'
      } else {
        return '340px'
      }
    },
    imgStyle() {
      const style = {}
      if (this.element.options.popHeight) {
        style.height = (this.element.options.popHeight) + 'px'
      }
      return style
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang="scss">
.root-class {
  margin: 10px 0px 5px;
  text-align: center;
}
</style>
