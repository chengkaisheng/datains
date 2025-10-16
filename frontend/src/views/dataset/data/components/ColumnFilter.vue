<!-- ColumnFilter.vue -->
<template>
  <el-popover
    v-model="visible"
    placement="bottom-start"
    width="220"
    trigger="click"
    :append-to-body="true"
    popper-class="column-filter-popper"
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
    <!-- <i slot="reference" class="el-icon-search" style="cursor:pointer;margin-left:4px;color:#909399;" /> -->
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
      localValue: this.value || '', // 临时值（输入框显示）
      lastConfirmedValue: this.value || '' // 正式值（上次确定或重置）
    }
  },
  watch: {
    // 父组件重置后同步
    value(val) {
      this.localValue = val || ''
    },
    visible(val) {
      if (!val) {
      // 弹窗关闭 → 丢弃临时输入，恢复正式值
        this.localValue = this.lastConfirmedValue
      }
    }
  },
  methods: {
    ok() {
      this.lastConfirmedValue = this.localValue
      this.$emit('input', this.localValue)
      this.$emit('change', this.localValue, this.columnKey)
      this.visible = false
    },
    reset() {
      this.localValue = ''
      this.lastConfirmedValue = ''
      this.$emit('input', '')
      this.$emit('change', '', this.columnKey)
    }
  }
}
</script>

<style>
.column-filter-popper {
  z-index: 3000 !important;
}
</style>
