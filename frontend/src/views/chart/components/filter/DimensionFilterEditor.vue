<template>
  <el-col>
    <el-button icon="el-icon-plus" circle size="mini" style="margin-bottom: 10px;" @click="addFilter" />
    <el-button size="mini" style="margin-bottom: 10px;" @click="uploadLogic('logic')">上传</el-button>
    <el-button size="mini" style="margin-bottom: 10px;" @click="downloadTemplate('logic')">下载模板</el-button>
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
  </el-col>
</template>

<script>
import { excelToJson } from '@/utils/excelToJson';
import { downloadFilterTemplate } from '@/api/panel/panel';
export default {
  name: 'DimensionFilterEditor',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [
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
      ]
    }
  },
  mounted() {
  },
  methods: {
    addFilter() {
      this.item.filter.push({
        term: 'eq',
        value: ''
      })
    },
    removeFilter(index) {
      this.item.filter.splice(index, 1)
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
      downloadFilterTemplate(`${type}.xlsx`).then(res => {
        const blob = new Blob([res])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = type === 'logic' ? '逻辑条件模板.xlsx' : '字段枚举值模板.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
</script>

<style scoped>
.filter-item {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  padding: 4px 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.form-item >>> .el-form-item__label {
  font-size: 12px;
}

span {
  font-size: 12px;
}

.value-item >>> .el-input {
  position: relative;
  display: inline-block;
  width: 80px !important;
}

.el-select-dropdown__item {
  padding: 0 20px;
  font-size: 12px;
}
</style>
