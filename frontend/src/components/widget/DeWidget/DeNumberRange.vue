<template>

  <el-form v-if="element.options !== null && element.options.attrs !== null" ref="form" :model="form" :rules="rules">
    <div class="de-number-range-container">
      <el-form-item prop="min">
        <el-input
          v-model="form.min"
          class="input-search"
          :placeholder="$t(element.options.attrs.placeholder_min)"
          :size="size"
          :style="Style"
          @change="handleMinChange"
        />
        <!-- @input="inputChange" -->
      </el-form-item>
      <span :style="{ color: Style.color }">{{ $t('denumberrange.split_placeholder') }}</span>
      <el-form-item prop="max">
        <el-input
          v-model="form.max"
          class="input-search"
          :placeholder="$t(element.options.attrs.placeholder_max)"
          :size="size"
          :style="Style"
          @change="handleMaxChange"
        />
        <!-- @input="inputChange" -->
      </el-form-item>
      <el-button
        class="search-button"
        :size="size"
        style="margin-left: 2px;"
        :style="Style"
        @click="inputChange"
      >
        <i class="el-icon-search" :style="{'color': Style.color}" />
      </el-button>
    </div>
  </el-form>

</template>

<script>
const MIN_NUMBER = -2147483648
const MAX_NUMBER = 2147483647
import bus from '@/utils/bus'
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
      operator: 'between',
      values: null,
      canEdit: false,

      form: { min: '', max: '' },
      rules: {
        min: [
          //   { required: true, message: this.$t('denumberrange.please_key_min'), trigger: 'blur' },
          { validator: this.validateCom, trigger: 'blur' },
          { validator: this.validateMin, trigger: 'blur' }
        ],
        max: [
          //   { required: true, message: this.$t('denumberrange.please_key_max'), trigger: 'blur' },
          { validator: this.validateCom, trigger: 'blur' },
          { validator: this.validateMax, trigger: 'blur' }
        ]
      },
      changeIndex: 0,
      timeMachine: null
    }
  },
  computed: {
    defaultvalues() {
      if (!this.element.options.value) {
        return JSON.stringify([])
      }
      return JSON.stringify(this.element.options.value)
    },
    viewIds() {
      if (!this.element || !this.element.options || !this.element.options.attrs.viewIds) return ''
      return this.element.options.attrs.viewIds.toString()
    },
    manualModify() {
      return !!this.element.options.manualModify
    },
    Style() {
      if(this.inDraw === false) return {}
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
      }
      return style
    }
  },
  watch: {
    'viewIds': function(value, old) {
      if (typeof value === 'undefined' || value === old) return
      this.setCondition()
    },
    'defaultvalues': function(value, old) {
      if (value === old) return
      const values = this.element.options.value
      this.form.min = values[0]
      if (values.length > 1) {
        this.form.max = values[1]
      }
    },
    form: {
      handler(value) {
        this.inputChange('save_only')
      },
      deep: true
    }
  },
  created() {
    if (this.element.options.value && this.element.options.value.length > 0) {
      const values = this.element.options.value
      this.form.min = values[0]
      if (values.length > 1) {
        this.form.max = values[1]
      }
      this.search()
    }
  },
  mounted() {
    bus.$on('reset-default-value', id => {
      if (this.inDraw && this.manualModify && this.element.id === id) {
        const values = this.element.options.value
        this.form.min = values[0]
        if (values.length > 1) {
          this.form.max = values[1]
        }
        this.search()
      }
    })
  },
  methods: {
    // searchWithKey(index) {
    //   this.timeMachine = setTimeout(() => {
    //     if (index === this.changeIndex) {
    //       this.search()
    //     }
    //     this.destryTimeMachine()
    //   }, 1000)
    // },
    // destryTimeMachine() {
    //   this.timeMachine && clearTimeout(this.timeMachine)
    //   this.timeMachine = null
    // },
    getFormData() {
      const ret = {}
      this.$refs.form.validate((valid) => {
        ret.valid = valid
        ret.form = this.form
      })
      return ret
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    handleMinChange() {
      this.$refs.form.validateField('max')
    },
    handleMaxChange() {
      this.$refs.form.validateField('min')
    },
    validateCom(rule, value, callback) {
      if (!value) return callback()
      const one = Number(value)
      if (Number.isInteger(one)) {
        if (one < MIN_NUMBER) {
          return callback(new Error(this.$t('denumberrange.out_of_min')))
        } else if (one > MAX_NUMBER) {
          return callback(new Error(this.$t('denumberrange.out_of_max')))
        }
        return callback()
      }
      return callback(new Error(this.$t('denumberrange.must_int')))
    },
    validateMin(rule, value, callback) {
      if (!value) return callback()
      const one = Number(value)
      const max = Number(this.form.max)
      if (!max || one < max) {
        return callback()
      }
      return callback(new Error(this.$t('denumberrange.min_out_max')))
    },
    validateMax(rule, value, callback) {
      if (!value) return callback()
      const one = Number(value)
      const min = Number(this.form.min)
      if (!min || one > min) {
        return callback()
      }
      return callback(new Error(this.$t('denumberrange.max_out_min')))
    },

    search() {
      this.$nextTick(() => {
        this.$refs.form.validate(valid => {
          if (!valid) {
            return false
          }
          this.setCondition()
        })
      })
    },
    setCondition(val) {
      const param = {
        component: this.element,
        // value: !this.values ? [] : Array.isArray(this.values) ? this.values : [this.values],
        value: [this.form.min, this.form.max],
        operator: this.operator
      }

      if (this.form.min && this.form.max) {
        if (val === 'save_only') {
          this.inDraw && this.$store.commit('saveViewFilter', param)
        } else {
          this.inDraw && this.$store.commit('addViewFilter', param)
        }
        return
      }
      if (!this.form.min && !this.form.max) {
        param.value = []
        if (val === 'save_only') {
          this.inDraw && this.$store.commit('saveViewFilter', param)
        } else {
          this.inDraw && this.$store.commit('addViewFilter', param)
        }
        return
      }
      if (this.form.min) {
        param.value = [this.form.min]
        param.operator = 'ge'
        if (val === 'save_only') {
          this.inDraw && this.$store.commit('saveViewFilter', param)
        } else {
          this.inDraw && this.$store.commit('addViewFilter', param)
        }
        return
      }
      if (this.form.max) {
        param.value = [this.form.max]
        param.operator = 'le'
        if (val === 'save_only') {
          this.inDraw && this.$store.commit('saveViewFilter', param)
        } else {
          this.inDraw && this.$store.commit('addViewFilter', param)
        }
        return
      }
    },

    inputChange(val) {
      if (!this.inDraw) {
        const values = [this.form.min, this.form.max]
        this.element.options.value = values
        this.element.options.manualModify = false
      } else {
        this.element.options.manualModify = true
      }
      if (val !== 'save_only') {
        this.search()
      } else {
        this.setCondition(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.de-number-range-container {
  // display: inline;
  display: flex;
  align-items: center;
  max-height: 40px;

  span {
    height: 38px;
    line-height: 38px;
    padding: 0 5px;
    font-size: 14px;
    color: inherit;
    margin-bottom: 22px;
  }

  .search-button {
    margin-bottom: 22px;
  }

  .search-button {
    background: transparent;
  }
  .search-button:hover {
    background: transparent;
  }

  >>>div.el-form-item {
    width: calc(50% - 10px) !important;
    display: inline-block;
    padding: 0 5px;
  }
}

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
</style>
