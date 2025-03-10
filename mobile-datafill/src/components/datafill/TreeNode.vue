<template>
  <van-cell
    :title="node.name"
    :class="{
      'selected-node': isSelected,
      'tree-node': true,
      'has-children': hasChildren
    }"
    :is-link="hasChildren"
    :arrow-direction="expanded ? 'down' : 'right'"
    @click="handleClick"
  />
  <div
    v-if="hasChildren && expanded"
    class="children-container"
    :class="{ 'has-border': hasChildren }"
  >
    <TreeNode
      v-for="child in node.children"
      :key="child.id"
      :node="child"
      :expand="expand"
      :selected-id="selectedId"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Cell as VanCell } from 'vant'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  expand: {
    type: Boolean,
    default: false
  },
  selectedId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select'])

const expanded = ref(props.expand)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)
const isSelected = computed(() => props.node.id === props.selectedId)

// 监听 expand prop 的变化
watch(() => props.expand, (newValue) => {
  expanded.value = newValue
})

const handleClick = () => {
  if (hasChildren.value) {
    expanded.value = !expanded.value
  }
  // 点击节点，触发父组件的select事件 非叶子节点 也可以点击
  emit('select', props.node)
}
</script>

<style scoped>
/* 树节点基础样式 */
.tree-node {
  position: relative;
  transition: all var(--transition-quick) var(--easing-standard);
  margin: 2px 0;
  border-radius: var(--radius-sm);
}

.tree-node:hover {
  background-color: var(--bg-tertiary);
}

/* 节点标题样式 */
.tree-node :deep(.van-cell__title) {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  line-height: var(--line-height-compact);
  padding-left: 4px;
}

/* 选中状态样式 */
.selected-node {
  background-color: var(--primary-light);
}

.selected-node :deep(.van-cell__title) {
  color: var(--primary-color);
  font-weight: 500;
}

/* 子节点容器样式 */
.children-container {
  position: relative;
  padding-left: 20px;
  margin-left: 12px;
}

/* 子节点连接线 */
.has-border {
  border-left: 1px dashed var(--border-color);
}

/* 单元格样式优化 */
:deep(.van-cell) {
  padding: 12px 16px;
  background-color: transparent;
  transition: background-color var(--transition-quick);
}

:deep(.van-cell::after) {
  display: none;
}

/* 展开箭头样式 */
.has-children :deep(.van-cell__right-icon) {
  color: var(--text-tertiary);
  font-size: var(--font-size-base);
  transition: transform var(--transition-quick);
}

.has-children[aria-expanded="true"] :deep(.van-cell__right-icon) {
  transform: rotate(90deg);
}

/* 悬停状态 */
.tree-node:hover :deep(.van-cell__right-icon) {
  color: var(--text-secondary);
}

/* 动画效果 */
.children-container {
  transition: height var(--transition-normal) var(--easing-standard);
}

/* 层级缩进线条 */
.children-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--border-color);
  opacity: 0.5;
}

/* 最后一个子节点的连接线处理 */
.children-container :last-child::after {
  content: '';
  position: absolute;
  left: -20px;
  bottom: 0;
  width: 1px;
  height: 50%;
  background-color: var(--bg-primary);
}
</style>
