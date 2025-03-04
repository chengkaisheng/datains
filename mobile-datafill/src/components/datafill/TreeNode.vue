<template>
  <van-cell
    :title="node.name"
    :class="{ 'selected-node': isSelected }"
    :is-link="hasChildren"
    :arrow-direction="expanded ? 'down' : 'right'"
    @click="handleClick"
  />
  <div v-if="hasChildren && expanded" class="children-container">
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
import { ref, computed, watch } from 'vue'
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
.selected-node {
  color: var(--van-primary-color);
  font-weight: bold;
}

.children-container {
  padding-left: 16px;
}

:deep(.van-cell) {
  padding: 10px 16px;
}
</style> 