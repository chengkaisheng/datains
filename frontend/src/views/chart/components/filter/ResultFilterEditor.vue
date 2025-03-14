<template>
  <el-col>
    <div v-if="item.deType === 0 || item.deType === 5">
      <el-radio-group
        v-model="filterType"
        size="mini"
        style="margin-bottom: 10px;"
        @change="filterTypeChange"
      >
        <el-radio label="logic">{{ $t('chart.logic_exp') }}</el-radio>
        <el-radio label="enum">{{ $t('chart.enum_exp') }}</el-radio>
      </el-radio-group>
    </div>

    <div v-if="((item.deType === 0 || item.deType === 5) && filterType === 'logic') || item.deType === 1 || item.deType === 2 || item.deType === 3">
      <div style="display: inline-block;">
        <el-button icon="el-icon-plus" circle size="mini" style="margin-bottom: 10px;" @click="addFilter" />
        <el-button size="mini" style="margin-bottom: 10px;" @click="uploadLogic('logic')">上传</el-button>
        <el-button size="mini" style="margin-bottom: 10px;" @click="downloadTemplate('logic')">下载模板</el-button>
        <el-radio-group
          v-show="item.filter && item.filter.length > 1"
          v-model="logic"
          size="mini"
          style="margin-left: 10px;"
          @change="logicChange"
        >
          <el-radio-button label="and">{{ $t('chart.and') }}</el-radio-button>
          <el-radio-button label="or">{{ $t('chart.or') }}</el-radio-button>
        </el-radio-group>
      </div>
      <div style="max-height: 50vh;overflow-y: auto;">
        <el-row v-for="(f,index) in item.filter" :key="index" class="filter-item">
          <el-col :span="4">
            <span>{{ item.name }}</span>
          </el-col>
          <el-col :span="8">
            <el-select v-model="f.term" size="mini">
              <el-option-group
                v-for="(group,idx) in options"
                :key="idx"
                :label="group.label"
              >
                <el-option
                  v-for="opt in group.options"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-option-group>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-show="!f.term.includes('null') && !f.term.includes('empty')" v-model="f.value" class="value-item" :placeholder="$t('chart.condition')" size="mini" clearable />
          </el-col>
          <el-col :span="6">
            <el-button type="text" icon="el-icon-delete" circle style="float: right" @click="removeFilter(index)" />
          </el-col>
        </el-row>
      </div>
    </div>

    <div v-if="(item.deType === 0 || item.deType === 5) && filterType === 'enum'">
      <span style="margin-right: 10px;">{{ $t('chart.filter_exp') }}</span>
      <el-select
        v-model="enumCheckField"
        filterable
        collapse-tags
        multiple
        :placeholder="$t('chart.pls_slc')"
        size="mini"
        @change="enumChange"
      >
        <el-option
          v-for="field in fieldOptions"
          :key="field.id"
          :label="field.text"
          :value="field.id"
        />
      </el-select>
      <el-button size="mini" style="margin-left: 10px;" @click="uploadLogic('enum')">上传</el-button>
      <el-button size="mini" style="margin-left: 10px;" @click="downloadTemplate('enum')">下载模板</el-button>
    </div>
  </el-col>
</template>

<script>
import { multFieldValues } from '@/api/dataset/dataset'
import { excelToJson } from '@/utils/excelToJson';

export default {
  name: 'ResultFilterEditor',
  props: {
    chart: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      textOptions: [
        {
          label: '',
          options: [{
            value: 'eq',
            label: this.$t('chart.filter_eq')
          }, {
            value: 'not_eq',
            label: this.$t('chart.filter_not_eq')
          }]
        },
        {
          label: '',
          options: [{
            value: 'like',
            label: this.$t('chart.filter_like')
          }, {
            value: 'not like',
            label: this.$t('chart.filter_not_like')
          }]
        },
        {
          label: '',
          options: [{
            value: 'null',
            label: this.$t('chart.filter_null')
          }, {
            value: 'not_null',
            label: this.$t('chart.filter_not_null')
          }]
        },
        {
          label: '',
          options: [{
            value: 'empty',
            label: this.$t('chart.filter_empty')
          }, {
            value: 'not_empty',
            label: this.$t('chart.filter_not_empty')
          }]
        }
      ],
      dateOptions: [
        {
          label: '',
          options: [{
            value: 'eq',
            label: this.$t('chart.filter_eq')
          }, {
            value: 'not_eq',
            label: this.$t('chart.filter_not_eq')
          }]
        },
        {
          label: '',
          options: [{
            value: 'lt',
            label: this.$t('chart.filter_lt')
          }, {
            value: 'gt',
            label: this.$t('chart.filter_gt')
          }]
        },
        {
          label: '',
          options: [{
            value: 'le',
            label: this.$t('chart.filter_le')
          }, {
            value: 'ge',
            label: this.$t('chart.filter_ge')
          }]
        }
      ],
      valueOptions: [
        {
          label: '',
          options: [{
            value: 'eq',
            label: this.$t('chart.filter_eq')
          }, {
            value: 'not_eq',
            label: this.$t('chart.filter_not_eq')
          }]
        },
        {
          label: '',
          options: [{
            value: 'lt',
            label: this.$t('chart.filter_lt')
          }, {
            value: 'gt',
            label: this.$t('chart.filter_gt')
          }]
        },
        {
          label: '',
          options: [{
            value: 'le',
            label: this.$t('chart.filter_le')
          }, {
            value: 'ge',
            label: this.$t('chart.filter_ge')
          }]
        }
      ],
      options: [],
      logic: '',
      filterType: '',
      enumCheckField: [],
      fieldOptions: []
    }
  },
  watch: {
    'item': function() {
      this.initOptions()
    }
  },
  mounted() {
    this.initOptions()
    this.init()
    this.initEnumOptions()
  },
  methods: {
    initOptions() {
      console.log('this.item', this.item)
      if (this.item) {
        if (this.item.deType === 0 || this.item.deType === 5) {
          this.options = JSON.parse(JSON.stringify(this.textOptions))
        } else if (this.item.deType === 1) {
          this.options = JSON.parse(JSON.stringify(this.dateOptions))
        } else {
          this.options = JSON.parse(JSON.stringify(this.valueOptions))
        }
      }
    },
    init() {
      this.logic = this.item.logic
      this.filterType = this.item.filterType
      this.enumCheckField = this.item.enumCheckField
    },
    initEnumOptions() {
      // 查找枚举值
      if (this.item.deType === 0 || this.item.deType === 5) {
        multFieldValues({ fieldIds: [this.item.id] }).then(res => {
          this.fieldOptions = this.optionDatas(res.data)
        })
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
    addFilter() {
      console.log(' this.item.filter', this.item.filter)
      this.item.filter.push({
        fieldId: this.item.id,
        term: 'eq',
        value: ''
      })
    },
    removeFilter(index) {
      this.item.filter.splice(index, 1)
    },
    logicChange(val) {
      this.item.logic = val
    },
    filterTypeChange(val) {
      this.item.filterType = val
    },
    enumChange(val) {
      this.item.enumCheckField = this.enumCheckField
    },
    uploadLogic(type) {
      // 创建一个隐藏的文件输入框
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.xlsx'
      input.style.display = 'none'
      
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        
        // 检查文件类型
        if (!file.name.endsWith('.xlsx')) {
          this.$message.error('请上传Excel文件(.xlsx格式)')
          return
        }
        
        excelToJson(file).then(json => {
          console.log('json', json)
          json.map(item => {
            if(type === 'logic') {
              let term = ''
              this.options.map(option => {
                option.options.map(optionItem => {
                  if (optionItem.label === item['过滤条件']) {
                    term = optionItem.value
                  }
                })
              })
              if(!!term) {
                this.item.filter.push({
                  fieldId: this.item.id,
                  term: term,
                  value: (term.includes('empty') || term.includes('null')) ? '' : item['过滤值']
                })
              }
            } else if (type === 'enum') {
              // 需要找到过滤值对应的字段id
              this.fieldOptions.map(option => {
                if (option.text === item['过滤值']) {
                  this.enumCheckField.push(option.id)
                }
              })
              this.item.enumCheckField = this.enumCheckField
            }
          })
        }).catch(err => {
          this.$message.error('文件解析失败：' + err.message)
        })
      }
      
      // 触发文件选择
      document.body.appendChild(input)
      input.click()
      document.body.removeChild(input)
    },
    downloadTemplate(type) {
      // 创建一个a标签用于下载
      const link = document.createElement('a')
      if (type === 'logic') {
        link.href = '/template/逻辑条件模板.xlsx'
        link.download = '逻辑条件模板.xlsx'
      } else if (type === 'enum') {
        link.href = '/template/字段枚举值模板.xlsx'
        link.download = '字段枚举值模板.xlsx'
      }
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style scoped>
  .filter-item{
    width: 100%;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    padding: 4px 14px;
    margin-bottom: 10px;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .form-item>>>.el-form-item__label{
    font-size: 12px;
  }
  span{
    font-size: 12px;
  }

  .value-item>>>.el-input{
    position: relative;
    display: inline-block;
    width: 80px!important;
  }
</style>
