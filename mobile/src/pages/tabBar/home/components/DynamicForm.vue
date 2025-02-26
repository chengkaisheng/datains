<template>
  <view class="dynamic-form">
    <view 
      v-for="item in formItems" 
      :key="item.id" 
      class="form-item"
    >
      <text class="label">
        {{ item.settings.name }}
        <text v-if="item.settings.required" class="required">*</text>
      </text>
      
      <!-- 文本输入框 -->
      <template v-if="item.type === 'input' && item.settings.inputType !== 'number'">
        <input
          v-model="formData[item.settings.mapping.columnName]"
          :type="item.settings.inputType"
          :placeholder="item.settings.placeholder || `请输入${item.settings.name}`"
          :maxlength="255"
          class="input"
        />
      </template>

      <!-- 数字输入框 -->
      <template v-else-if="item.type === 'input' && item.settings.inputType === 'number'">
        <input
          v-model="formData[item.settings.mapping.columnName]"
          type="number"
          :placeholder="item.settings.placeholder || `请输入${item.settings.name}`"
          :max="999999999999"
          :min="-999999999999"
          class="input"
          @blur="onNumberChange(item)"
        />
      </template>
      
      <!-- 文本域 -->
      <template v-else-if="item.type === 'textarea'">
        <textarea
          v-model="formData[item.settings.mapping.columnName]"
          :placeholder="item.settings.placeholder || `请输入${item.settings.name}`"
          class="textarea"
        />
      </template>

      <!-- 下拉选择框 -->
      <template v-else-if="item.type === 'select'">
        <picker
          :value="formData[item.settings.mapping.columnName]"
          :range="getOptions(item)"
          range-key="name"
          @change="(e) => handleSelect(e, item)"
          class="picker"
        >
          <view class="picker-value">
            {{ getSelectedLabel(item) || item.settings.placeholder || `请选择${item.settings.name}` }}
          </view>
        </picker>
      </template>
      
      <!-- 单选框 -->
      <template v-else-if="item.type === 'radio'">
        <radio-group 
          :value="formData[item.settings.mapping.columnName]"
          class="radio-group"
          @change="(e) => handleRadioChange(e, item)"
        >
          <label 
            v-for="option in getOptions(item)" 
            :key="option.value"
            class="radio-label"
          >
            <radio 
              :value="option.value"
              :checked="formData[item.settings.mapping.columnName] === option.value"
            />
            <text>{{ option.name }}</text>
          </label>
        </radio-group>
      </template>

      <!-- 复选框 -->
      <template v-else-if="item.type === 'checkbox'">
        <checkbox-group
          v-model="formData[item.settings.mapping.columnName]"
          class="checkbox-group"
          @change="(e) => handleCheckboxChange(e, item)"
        >
          <label
            v-for="option in getOptions(item)"
            :key="option.value"
            class="checkbox-label"
          >
            <checkbox :value="option.value" />
            <text>{{ option.name }}</text>
          </label>
        </checkbox-group>
      </template>

      <!-- 日期选择器 -->
      <template v-else-if="item.type === 'date'">
        <picker
          mode="date"
          :value="formData[item.settings.mapping.columnName]"
          @change="(e) => handleDateChange(e, item)"
          class="picker"
        >
          <view class="picker-value">
            {{ formData[item.settings.mapping.columnName] || item.settings.placeholder || `请选择${item.settings.name}` }}
          </view>
        </picker>
      </template>
    </view>
    
    <view class="form-actions">
      <button 
        class="submit-btn" 
        type="primary" 
        @click="submitForm"
      >
        提交
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'DynamicForm',
  
  props: {
    formItems: {
      type: Array,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      formData: {},
      asyncOptions: {} // 用于存储异步获取的选项数据
    }
  },
  
  methods: {
    // 初始化表单数据
    initFormData() {
      this.formData = {}
      this.formItems.forEach(item => {
        const columnName = item.settings.mapping.columnName
        let initialValue = ''
        
        // 根据不同类型设置不同的初始值
        switch(item.type) {
          case 'checkbox':
            initialValue = []
            break
          case 'radio':
          case 'select':
          case 'date':
          case 'input':
          case 'textarea':
          default:
            initialValue = ''
            break
        }
        
        this.$set(this.formData, columnName, initialValue)
      })
    },
    
    // 验证表单
    validateForm() {
      console.log('this.formItems', this.formItems);
      console.log('this.formData', this.formData);
      for (const item of this.formItems) {
        const value = this.formData[item.settings.mapping.columnName]
        const settings = item.settings
        
        // 只有在值为空的情况下才进行必填校验
        if (settings.required) {
          if (value === '' || value === null || value === undefined) {
            uni.showToast({
              title: `请${item.type === 'input' ? '输入' : '选择'}${settings.name}`,
              icon: 'none'
            })
            return false
          }
        }
      }
      return true
    },
    
    // 获取选项列表
    getOptions(item) {
      if (item.settings.optionSourceType === 1) {
        return item.settings.options
      }
      return this.asyncOptions[item.tempId] || []
    },

    // 获取选中项的标签
    getSelectedLabel(item) {
      const value = this.formData[item.settings.mapping.columnName]
      const options = this.getOptions(item)
      const selected = options.find(opt => opt.value === value)
      return selected ? selected.name : ''
    },

    // 处理选择事件
    handleSelect(e, item) {
      const index = e.detail.value
      const options = this.getOptions(item)
      this.formData[item.settings.mapping.columnName] = options[index].value
    },

    // 处理数字输入
    onNumberChange(item) {
      const value = this.formData[item.settings.mapping.columnName]
      if (value) {
        if (item.settings.mapping.type === 'number') {
          this.formData[item.settings.mapping.columnName] = parseInt(value)
        } else {
          this.formData[item.settings.mapping.columnName] = parseFloat(value)
        }
      }
    },

    // 处理复选框变化
    handleCheckboxChange(e, item) {
      this.formData[item.settings.mapping.columnName] = e.detail.value
    },

    // 添加日期转时间戳的工具方法
    dateToTimestamp(dateStr) {
      if (!dateStr) return '';
      return new Date(dateStr).getTime();
    },

    // 修改提交表单方法，处理日期字段
    submitForm() {
      if (this.validateForm()) {
        // 创建新对象，避免直接修改 formData
        const submitData = {};
        
        this.formItems.forEach(item => {
          const columnName = item.settings.mapping.columnName;
          const value = this.formData[columnName];
          
          // 如果是日期类型，转换为时间戳
          if (item.type === 'date' && value) {
            submitData[columnName] = this.dateToTimestamp(value);
          } else {
            submitData[columnName] = value;
          }
        });
        
        console.log('提交的数据:', submitData);
        this.$emit('submit', submitData);
      }
    },

    // 处理日期选择 - 保持原格式存储，提交时再转换
    handleDateChange(e, item) {
      const columnName = item.settings.mapping.columnName;
      this.$set(this.formData, columnName, e.detail.value);
    },

    // 添加单选框变化处理方法
    handleRadioChange(e, item) {
      const columnName = item.settings.mapping.columnName
      this.$set(this.formData, columnName, e.detail.value)
    },
  },
  
  created() {
    this.initFormData()
  },
  
  watch: {
    formItems: {
      handler() {
        this.initFormData()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-form {
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  
  .form-item {
    margin-bottom: 30rpx;
    
    .label {
      display: block;
      margin-bottom: 10rpx;
      font-size: 28rpx;
      color: #606266;
      
      .required {
        color: #f56c6c;
        margin-left: 4rpx;
      }
    }
    
    .input {
      width: 100%;
      height: 70rpx;
      border: 1px solid #dcdfe6;
      border-radius: 4rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
    }
    
    .radio-group {
      display: flex;
      flex-wrap: wrap;
      
      .radio-label {
        margin-right: 30rpx;
        margin-bottom: 10rpx;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        
        text {
          margin-left: 8rpx;
        }
      }
    }
  }
  
  .form-actions {
    margin-top: 40rpx;
    
    .submit-btn {
      width: 100%;
    }
  }

  .textarea {
    width: 100%;
    height: 150rpx;
    border: 1px solid #dcdfe6;
    border-radius: 4rpx;
    padding: 20rpx;
    font-size: 28rpx;
  }

  .picker {
    width: 100%;
    height: 70rpx;
    border: 1px solid #dcdfe6;
    border-radius: 4rpx;
    
    .picker-value {
      height: 70rpx;
      line-height: 70rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
      color: #606266;
    }
  }

  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    
    .checkbox-label {
      margin-right: 30rpx;
      margin-bottom: 10rpx;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      
      text {
        margin-left: 8rpx;
      }
    }
  }
}
</style> 