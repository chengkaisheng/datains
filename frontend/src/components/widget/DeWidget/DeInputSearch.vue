<template>

  <el-input
    v-if="element.options!== null && element.options.attrs!==null"
    v-model="value"
    class="input-search"
    resize="vertical"
    :placeholder="$t(element.options.attrs.placeholder)"
    :size="size"
    :style="inputStyle"
    @input="valueChange"
    @keypress.enter.native="search"
    @dblclick="setEdit"
  >

    <el-button slot="append" icon="el-icon-search" @click="search" />
  </el-input>

</template>

<script>
import bus from '@/utils/bus'
import { hexColorToRGBA } from '@/views/chart/chart/util'
export default {

  props: {
    element: {
      type: Object,
      default: null
    },
    inDraw: {
      type: Boolean,
      default: true
    },
    size: String
  },
  data() {
    return {
      operator: 'like',
      value: null,
      canEdit: false
    }
  },
  computed: {
    defaultValueStr() {
      if (!this.element || !this.element.options || !this.element.options.value) return ''
      return this.element.options.value.toString()
    },
    viewIds() {
      if (!this.element || !this.element.options || !this.element.options.attrs.viewIds) return ''
      return this.element.options.attrs.viewIds.toString()
    },
    manualModify() {
      return !!this.element.options.manualModify
    },
    inputStyle() {
      const style = {}
      if (this.element.commonSelectFrame && this.element.commonSelectFrame.enable) {
        if (this.element.commonSelectFrame.backType === 'Image') {
          if (this.element.commonSelectFrame.backImg !== '') {
            style.backgroundImage = `url(${this.element.commonSelectFrame.backImg})`
          }
          style.backgroundRepeat = 'no-repeat'
          style.backgroundSize = '100% 100%'
        } else {
          style.backgroundColor = this.element.commonSelectFrame.color
          // style.backgroundColor = this.hexColorToRGBA(this.element.commonSelectFrame.color,this.element.commonSelectFrame.alpha)
        }
        style.color = this.element.commonSelectFrame.fontColor
        style.fontSize = this.element.commonSelectFrame.fontSize ? this.element.commonSelectFrame.fontSize + 'px' : '14px'
      }

      return style
    }
  },
  watch: {
    'viewIds': function(value, old) {
      if (typeof value === 'undefined' || value === old) return
      this.setCondition()
    },
    'defaultValueStr': function(value, old) {
      if (value === old) return
      this.value = this.fillValueDerfault()
      this.search()
    }
  },
  created() {
    if (this.element.options.value) {
      this.value = this.fillValueDerfault()
      this.search()
    }
  },
  mounted() {
    bus.$on('reset-default-value', id => {
      if (this.inDraw && this.manualModify && this.element.id === id) {
        this.value = this.fillValueDerfault()
        this.search()
      }
    })
  },
  methods: {
    search() {
      if (!this.inDraw) {
        this.element.options.value = this.value
      }
      this.setCondition()
    },
    setCondition() {
      const param = {
        component: this.element,
        value: !this.value ? [] : Array.isArray(this.value) ? this.value : [this.value],
        operator: this.operator
      }
      this.inDraw && this.$store.commit('addViewFilter', param)
    },
    setEdit() {
      this.canEdit = true
    },
    valueChange(val) {
      if (!this.inDraw) {
        this.element.options.value = val
        this.element.options.manualModify = false
      } else {
        this.element.options.manualModify = true
      }
    },
    fillValueDerfault() {
      const defaultV = this.element.options.value === null ? '' : this.element.options.value.toString()
      if (defaultV === null || typeof defaultV === 'undefined' || defaultV === '' || defaultV === '[object Object]') return null
      return defaultV.split(',')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.input-search ::v-deep .el-input__inner {
  background-color: transparent;
  color: inherit;
}
.input-search ::v-deep .el-input__inner::placeholder {
  color: inherit;
}
.input-search ::v-deep .el-input-group__append, .el-input-group__prepend {
  background-color: transparent;
  color: inherit;
}
//  .el-button .el-button--default .el-button--medium
</style>
