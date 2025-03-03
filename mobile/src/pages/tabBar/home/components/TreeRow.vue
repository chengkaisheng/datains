<template>
  <view class="tree-row-wrapper">
    <view class="tree-row" :style="{ paddingLeft: level * 40 + 'rpx' }">
      <view class="td name-cell" style="flex: 2">
        <view class="name-content" @click="toggleExpand">
          <uni-icons 
            v-if="hasChildren"
            :type="expanded ? 'bottom' : 'right'" 
            size="14"
            color="#606266"
          ></uni-icons>
          <text>{{ item.name }}</text>
        </view>
      </view>
      <view class="td action-cell" style="flex: 1">
        <view class="actions">
          <view class="operation-btn" @click="$emit('upload', item)">
            上传
          </view>
          <view class="operation-btn view-btn" @click="$emit('view', item)">
            查看
          </view>
        </view>
      </view>
    </view>

    <view v-if="expanded && hasChildren" class="children-wrapper">
      <tree-row
        v-for="(child, index) in item.children"
        :key="child.id || index"
        :item="child"
        :level="level + 1"
        @upload="$emit('upload', $event)"
        @view="$emit('view', $event)"
      />
    </view>
  </view>
</template>

<script>
export default {
  name: 'TreeRow',
  props: {
    item: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    hasChildren() {
      return this.item.children && this.item.children.length > 0
    }
  },
  methods: {
    toggleExpand() {
      if (this.hasChildren) {
        this.expanded = !this.expanded
      }
    }
  }
}
</script>

<style scoped>
.tree-row-wrapper {
  width: 100%;
}

.tree-row {
  display: flex;
  padding: 20rpx;
  border-bottom: 1px solid #ebeef5;
  background: #fff;
}

.td {
  display: flex;
  align-items: center;
}

.name-cell {
  font-size: 28rpx;
  color: #606266;
}

.name-content {
  display: flex;
  align-items: center;
  gap: 10rpx;
  cursor: pointer;
}

.name-content:hover {
  color: #409eff;
}

.action-cell {
  justify-content: center;
}

.actions {
  display: flex;
  gap: 10rpx;
}

.operation-btn {
  padding: 4rpx 20rpx;
  background: #409eff;
  color: #fff;
  border-radius: 4rpx;
  font-size: 24rpx;
  cursor: pointer;
}

.operation-btn:hover {
  opacity: 0.8;
}

.children-wrapper {
  width: 100%;
  background: #f8f9fb;
}

.children-wrapper .tree-row {
  background: transparent;
}
</style> 