<template>

  <div v-if="element.options!== null && element.options.attrs!==null && show" class="de-select-grid-class">
    <div class="de-select-grid-search">
      <el-input
        class="input-search"
        v-model="keyWord"
        :placeholder="$t('deinputsearch.placeholder')"
        :size="size"
        prefix-icon="el-icon-search"
        clearable
        :style="inputStyle"
      />
    </div>
    <div class="list" :style="panelStyle">

      <div v-if="element.options.attrs.multiple" class="checkbox-group-container">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange" >
          <span :style="panelCheck">{{ $t('commons.all') }}</span>
        </el-checkbox>

        <el-checkbox-group v-model="value" @change="handleCheckedChange">
          <el-checkbox v-for="item in datas" :key="item.id" :label="item.id" >
            <span :style="panelCheck">{{ item.id }}</span>
          </el-checkbox>
        </el-checkbox-group>
        <p v-if="fieldNumber !== fieldDatas.length && (fieldNumber !== fieldDatas.filter(node => !keyWord || (node.id && node.id.includes(keyWord))).length)" 
          class="loading_css" @click="loadDataMore">
          <span :style="panelCheck">点击加载更多</span>
        </p>
      </div>

      <div v-else class="radio-group-container">
        <el-radio-group v-model="value" @change="changeRadioBox">
          <el-radio v-for="(item, index) in datas" :key="index" :label="item.id" @click.native.prevent="testChange(item)">
            <span :style="panelCheck">{{ item.id }}</span>
          </el-radio>
        </el-radio-group>
        <p v-if="fieldNumber !== fieldDatas.length && (fieldNumber !== fieldDatas.filter(node => !keyWord || (node.id && node.id.includes(keyWord))).length)" 
          class="loading_css" @click="loadDataMore">
          <span :style="panelCheck">点击加载更多</span>
        </p>
      </div>

    </div>

  </div>

</template>

<script>
import { multFieldValues, linkMultFieldValues } from '@/api/dataset/dataset'
import { getLinkToken, getToken } from '@/utils/auth'
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
    inScreen: {
      type: Boolean,
      required: false,
      default: true
    },
    size: String
  },
  data() {
    return {
      value: null,
      checked: null,
      defaultProp: {
        id: 'id',
        label: 'text',
        children: 'children'
      },
      keyWord: '',
      allNode: {
        id: (-2 << 16) + '',
        text: this.$t('commons.all'),
        checked: false,
        indeterminate: false
      },
      show: true,
      datas: [],
      isIndeterminate: false,
      checkAll: false,
      fieldNumber: 100,
      fieldDatas: [], // 所有数据
    }
  },
  computed: {
    operator() {
      return this.element.options.attrs.multiple ? 'in' : 'eq'
    },
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
    panelInfo() {
      return this.$store.state.panel.panelInfo
    },
    inputStyle() {
      const style = {}
      // console.log('inputstyle11111',this.element)
      if(this.element.commonSelectFrame && this.element.commonSelectFrame.enable) {
        if(this.element.commonSelectFrame.backType === 'Image') {
          if(this.element.commonSelectFrame.backImg !== '') {
            style.backgroundImage = `url(${this.element.commonSelectFrame.backImg})`
          }
          style.backgroundRepeat = 'no-repeat'
          style.backgroundSize = '100% 100%'
        } else  {
          style.backgroundColor = this.element.commonSelectFrame.color
        }
        style.color = this.element.commonSelectFrame.fontColor
      }
      
      return style
    },
    panelStyle() {
      const style = {}
      if(this.element.commonSelectFrame && this.element.commonSelectFrame.enable) {
        // style.color = this.element.commonSelectFrame.panelColor
        style.backgroundColor = this.element.commonSelectFrame.panelBgColor
      }
      return style
    },
    panelCheck() {
      const style = {}
      if(this.element.commonSelectFrame && this.element.commonSelectFrame.enable) {
        style.color = this.element.commonSelectFrame.panelColor
      }
      return style
    }
  },
  watch: {
    keyWord: {
      handler(val1,val2) {
        this.fieldNumber = 100
        let data = this.fieldDatas.filter(node => !val1 || (node.id && node.id.includes(val1)))
        if(val1 !== '') {
          if(data.length) {
            if(this.fieldNumber > data.length) {
              this.fieldNumber = data.length
              this.datas = data
            } else {
              let arr = []
              for(let i=0;i<this.fieldNumber;i++) {
                arr.push(data[i])
              }
              this.datas = arr
            }
          }else {
            this.fieldNumber = 0
            this.datas = []
          }
          
        } else {
          let arr = []
          for(let i=0;i<this.fieldNumber;i++) {
            arr.push(this.fieldDatas[i])
          }
          this.datas = arr
        }
        
        // console.log('2222222',this.datas)
      }
    },
    'viewIds': function(value, old) {
      if (typeof value === 'undefined' || value === old) return
      this.setCondition()
    },
    'defaultValueStr': function(value, old) {
      if (value === old) return
      this.value = this.fillValueDerfault()
      this.changeValue(value)

      if (this.element.options.attrs.multiple) {
        this.checkAll = this.value.length === this.datas.length
        this.isIndeterminate = this.value.length > 0 && this.value.length < this.datas.length
      }
    },
    'element.options.attrs.fieldId': function(value, old) {
      if (typeof value === 'undefined' || value === old) return
      this.datas = []
      let method = multFieldValues
      const token = this.$store.getters.token || getToken()
      const linkToken = this.$store.getters.linkToken || getLinkToken()
      if (!token && linkToken) {
        method = linkMultFieldValues
      }
      const param = { fieldIds: this.element.options.attrs.fieldId.split(',') }
      if (this.panelInfo.proxy) {
        param.userId = this.panelInfo.proxy
      }
      this.element.options.attrs.fieldId &&
          this.element.options.attrs.fieldId.length > 0 &&
      method(param).then(res => {
        this.datas = this.optionDatas(res.data)
      }) || (this.element.options.value = '')
    },
    'element.options.attrs.multiple': function(value, old) {
      if (typeof old === 'undefined' || value === old) return
      if (!this.inDraw) {
        this.value = value ? [] : null
        this.element.options.value = ''
      } else {
        this.value = this.fillValueDerfault()
      }

      this.show = false
      this.$nextTick(() => {
        this.show = true
        if (value) {
          this.checkAll = this.value.length === this.datas.length
          this.isIndeterminate = this.value.length > 0 && this.value.length < this.datas.length
        }
      })
    }
  },
  created() {
    this.initLoad()
  },
  mounted() {
    bus.$on('reset-default-value', id => {
      if (this.inDraw && this.manualModify && this.element.id === id) {
        this.value = this.fillValueDerfault()
        this.changeValue(this.value)

        if (this.element.options.attrs.multiple) {
          this.checkAll = this.value.length === this.datas.length
          this.isIndeterminate = this.value.length > 0 && this.value.length < this.datas.length
        }
      }
    })
  },

  methods: {
    async initLoad() {
      this.value = this.element.options.attrs.multiple ? [] : null
      if (this.element.options.attrs.fieldId) {
        let method = multFieldValues
        const token = this.$store.getters.token || getToken()
        const linkToken = this.$store.getters.linkToken || getLinkToken()
        if (!token && linkToken) {
          method = linkMultFieldValues
        }
        method({ fieldIds: this.element.options.attrs.fieldId.split(',') }).then(res => {
          this.fieldDatas = this.optionDatas(res.data)
          if(this.fieldNumber > this.fieldDatas.length) {
            this.fieldNumber = this.fieldDatas.length
          }
          let arr = [] 
          for(let i=0;i<this.fieldNumber;i++) {
            arr.push(this.fieldDatas[i])
          }
          this.datas = arr
          if (this.element.options.attrs.multiple) {
            this.checkAll = this.value.length === this.datas.length
            this.isIndeterminate = this.value.length > 0 && this.value.length < this.datas.length
          }
        })
      }
      if (this.element.options.value) {
        this.value = this.fillValueDerfault()
        this.changeValue(this.value)
      }
    },
    loadDataMore() {
      this.fieldNumber += 100
      if(this.fieldNumber > this.fieldDatas.length) {
        this.fieldNumber = this.fieldDatas.length
      }
      console.log(this.fieldNumber)
      let arr = [] 
      for(let i=0;i<this.fieldNumber;i++) {
        arr.push(this.fieldDatas[i])
      }
      this.datas = arr
      if (this.element.options.attrs.multiple) {
        this.checkAll = this.value.length === this.datas.length
        this.isIndeterminate = this.value.length > 0 && this.value.length < this.datas.length
      }
    },
    changeValue(value) {
      if (!this.inDraw) {
        if (value === null) {
          this.element.options.value = ''
        } else {
          this.element.options.value = Array.isArray(value) ? value.join() : value
        }
        this.element.options.manualModify = false
      } else {
        this.element.options.manualModify = true
      }
      this.setCondition()
    },

    setCondition() {
      const param = {
        component: this.element,
        value: this.formatFilterValue(),
        operator: this.operator
      }
      this.inDraw && this.$store.commit('addViewFilter', param)
    },
    formatFilterValue() {
      if (this.value === null) return []
      if (Array.isArray(this.value)) return this.value
      return this.value.split(',')
    },
    fillValueDerfault() {
      const defaultV = this.element.options.value === null ? '' : this.element.options.value.toString()
      if (this.element.options.attrs.multiple) {
        if (defaultV === null || typeof defaultV === 'undefined' || defaultV === '' || defaultV === '[object Object]') { return [] }
        return defaultV.split(',')
      } else {
        if (defaultV === null || typeof defaultV === 'undefined' || defaultV === '' || defaultV === '[object Object]') { return null }
        return defaultV.split(',')[0]
      }
    },
    optionDatas(datas) {
      if (!datas) return null
      return datas.filter(item => !!item).map(item => {
        return {
          id: item,
          text: item
        }
      })
    },
    changeRadioBox(value) {
      this.changeValue(value)
    },
    handleCheckAllChange(val) {
      this.value = val ? this.datas.map(item => item.id) : []
      this.isIndeterminate = false
      this.changeValue(this.value)
    },
    handleCheckedChange(values) {
      const checkedCount = values.length
      this.checkAll = checkedCount === this.datas.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.datas.length
      this.changeValue(values)
    },
    testChange(item) {
      this.value = this.value === item.id ? null : item.id
      this.changeRadioBox(this.value)
    }

  }
}

</script>

<style lang="scss" scoped>
  .loading_css {
    text-align: center;
    cursor: pointer;
  }
  .de-select-grid-search {
    background-color: transparent;
  }
  .de-select-grid-search {
    >>>input {
      border-radius: 0px;

    }

    .el-input {
      display: block !important;
    }
  }

  .de-select-grid-class {
    height: 100%;

    .list {
      overflow-y: auto;
      width: 100%;
      position: relative;
      bottom: 0;
      height: calc(100% - 40px);
      text-align: left;
    }
  }

  .radio-group-container {
    background-color: transparent;
  }

  .radio-group-container>.el-radio-group>label {
    display: block !important;
    margin: 10px !important;
  }

  .checkbox-group-container {
    background-color: transparent;
    label.el-checkbox {
      display: block !important;
      margin: 10px !important;
    }

    .el-checkbox-group>label {
      display: block !important;
      margin: 10px !important;
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
