<template>
  <view class="tree-item">
    <view 
      class="tree-node"
      :class="{ 
        'active': selectedNode && selectedNode.id === node.id,
        'is-folder': node.nodeType === 'folder'
      }"
      @click.stop="handleClick"
    >
      <view class="node-content">
        <text>{{ node.name }}</text>
        <uni-icons 
          v-if="node.nodeType === 'folder'"
          :type="node.expanded ? 'bottom' : 'right'" 
          size="14"
          color="#606266"
        ></uni-icons>
      </view>
    </view>
    
    <view 
      v-if="node.expanded && node.children && node.children.length"
      :class="['node-children', `level-${level}`]"
    >
      <tree-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :selected-node="selectedNode"
        @node-click="handleChildClick"
        @node-select="handleChildSelect"
      ></tree-node>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 0
    },
    selectedNode: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleClick() {
      if (this.node.nodeType === 'folder') {
        this.$emit('node-click', this.node);
      } else {
        this.$emit('node-select', this.node);
      }
    },
    handleChildClick(node) {
      this.$emit('node-click', node);
    },
    handleChildSelect(node) {
      this.$emit('node-select', node);
    }
  }
}
</script>

<style scoped>
.tree-item {
  font-size: 28rpx;
}

.tree-node {
  display: flex;
  align-items: center;
  padding: 16rpx 20rpx;
  cursor: pointer;
}

.tree-node:hover {
  background-color: #f5f7fa;
}

.tree-node.active {
  color: #409eff;
}

.tree-node.is-folder {
  font-weight: 500;
}

.node-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.node-children {
  padding-left: 20rpx;
}

.node-children.level-1 {
  background: #f8f9fb;
}

.node-children.level-2 {
  background: #f0f2f5;
}

.node-children.level-3 {
  background: #e8eaed;
}
</style>
