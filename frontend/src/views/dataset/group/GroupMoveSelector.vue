<template>
  <el-col style="height: 400px;overflow-y: auto;margin-bottom: 10px;">
    <el-tree
      :data="tData"
      node-key="id"
      :expand-on-click-node="false"
      highlight-current
      @node-click="nodeClick"
    >
      <span slot-scope="{ node, data }" :class="treeClass(data,node)">
        <span style="display: flex;flex: 1;width: 0;">
          <span v-if="data.type === 'scene'">
            <svg-icon icon-class="scene" class="ds-icon-scene" />
          </span>
          <span
            style="margin-left: 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
            :title="data.name"
          >{{ data.name }}</span>
        </span>
      </span>
    </el-tree>
  </el-col>
</template>

<script>
import { groupTree } from '@/api/dataset/dataset'

export default {
  name: 'GroupMoveSelector',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tData: [],
      currGroup: '',
      groupForm: {
        name: '',
        pid: '0',
        level: 0,
        type: 'group',
        children: [],
        sort: 'type desc,name asc'
      },
      targetGroup: {}
    }
  },
  watch: {
    item() {
      this.tree(this.groupForm)
    }
  },
  mounted() {
    this.tree(this.groupForm)
  },
  methods: {
    tree(group) {
      groupTree(group).then(res => {
        this.tData = [{
          id: '0',
          name: this.$t('dataset.dataset_group'),
          pid: '0',
          privileges: 'grant,manage,use',
          type: 'group',
          disabled: true, // 根节点禁用
          children: res.data
        }]
      })
    },
    nodeClick(data, node) {
      // if (data.id === '0') return // 禁止选中根节点
      this.targetGroup = data
      this.$emit('targetGroup', data)
    },
    treeClass(data) {
      if (data.id === '0') return 'custom-tree-node root-disabled'
      return 'custom-tree-node'
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.root-disabled {
  color: #999;
  cursor: not-allowed;
  pointer-events: none; /* 禁止点击 */
}
</style>
