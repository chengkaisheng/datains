<template>
  <view class="tree-table">
    <view class="table-header">
      <view class="th" style="flex: 2">文件夹</view>
      <view class="th" style="flex: 1">操作</view>
    </view>
    
    <view class="table-body">
      <view v-if="!data || data.length === 0" class="empty-data">
        暂无数据
      </view>
      <tree-row
        v-else
        v-for="(item, index) in data"
        :key="item.id || index"
        :item="item"
        :level="0"
        @upload="handleUpload"
        @view="handleView"
      />
    </view>
  </view>
</template>

<script>
import TreeRow from './TreeRow.vue'

export default {
  name: 'TreeTable',
  components: {
    TreeRow
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleUpload(item) {
      this.$emit('upload', item.id)
    },
    handleView(item) {
      this.$emit('view', item)
    }
  }
}
</script>

<style scoped>
.tree-table {
  width: 100%;
}

.table-header {
  display: flex;
  background: #f5f7fa;
  padding: 20rpx;
  font-weight: bold;
}

.th {
  font-size: 28rpx;
  color: #606266;
}

.empty-data {
  text-align: center;
  padding: 40rpx;
  color: #909399;
  font-size: 28rpx;
}
</style>
