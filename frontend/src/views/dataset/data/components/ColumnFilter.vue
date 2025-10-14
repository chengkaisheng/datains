<!-- ColumnFilter.vue -->
<template>
  <el-popover
    v-model="visible"
    placement="bottom-start"
    width="200"
    trigger="click"
  >
    <el-input
      :value="localValue"
      size="mini"
      placeholder="输入筛选值"
      clearable
      @input="val => localValue = val"
    />
    <div style="text-align:right;margin-top:6px;">
      <el-button size="mini" type="primary" @click="ok">确定</el-button>
      <el-button size="mini" @click="reset">重置</el-button>
    </div>

    <!-- 触发图标 -->
    <i slot="reference" class="el-icon-arrow-down" style="cursor:pointer;margin-left:4px;" />
  </el-popover>
</template>

<script>
export default {
  name: 'ColumnFilter',
  props: {
    value: String, // 外部 v-model 绑定
    columnKey: Object // 列字段名
  },
  data() {
    return {
      visible: false,
      localValue: this.value || ''
    }
  },
  watch: {
    // 父组件重置后同步
    value(val) {
      this.localValue = val || ''
    }
  },
  methods: {
    ok() {
      this.$emit('input', this.localValue)
      this.$emit('change', this.localValue, this.columnKey)
      this.visible = false
    },
    reset() {
      this.localValue = ''
      this.$emit('input', '')
      this.$emit('change', '', this.columnKey)
    }
  }
}
</script>
