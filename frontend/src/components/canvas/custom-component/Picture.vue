<template>
  <div style="overflow: hidden;width: 100%;height: 100%;">
    <img v-if="!showLink" :src="element.propValue" :style="backStyle">
    <a v-if="showLink" :title="element.hyperlinks.content " :target="element.hyperlinks.openMode " :href="element.hyperlinks.content ">
      <img :src="element.propValue" :style="backStyle">
    </a>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      require: true
    },
    editMode: {
      type: String,
      require: false,
      default: 'preview'
    }
  },
  computed: {
    showLink() {
      return this.editMode === 'preview' && this.element && this.element.hyperlinks && this.element.hyperlinks.enable
    },
    backStyle() {
      const style = {}
      console.log('图片里',this.element)
      style.opacity = parseInt(this.element.commonSelectFrame.alpha)/100
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    height: 100%;
}
</style>
