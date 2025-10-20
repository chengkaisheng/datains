<template>
  <div class="my_table">
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%"
      :row-style="{height: '35px'}"
      @select="selectOne"
      @select-all="selectAll"
    >
      <el-table-column
        :column-key="fieldName"
        :label="columnLabel"
        :prop="fieldName"
        filter-placement="right-start"
        :filters="filter_options"
        :filter-multiple="false"
        :filter-method="filterHandler"
      >
        <template #default="{ row }">
          <span>{{ row.nickName }}</span>
          <!-- ★ 权限配置按钮 -->
          <el-button
            v-if="shares.some(s => s.authTarget === row.userId)"
            type="text"
            size="mini"
            icon="el-icon-setting"
            style="margin-left:8px;color:#409EFF;"
            @click.stop="openAuthDialog(row)"
          />
        </template>
      </el-table-column>

      <el-table-column type="selection" fixed />
    </el-table>

    <!-- ★ 权限弹窗 -->
    <el-dialog
      title="权限配置"
      :visible="authDialogVisible"
      width="400px"
      append-to-body
    >
      <div class="auth-line">
        <label>授权权限：</label>
      </div>
      <el-checkbox-group v-model="currentAuth">
        <el-checkbox
          v-for="opt in optionsData"
          :key="opt.privilegeExtend"
          :label="opt.privilegeExtend"
          :disabled="opt.privilegeExtend === 'view'"
        >
          {{ opt.privilegeName || opt.label }}
        </el-checkbox>
      </el-checkbox-group>

      <template #footer>
        <el-button size="mini" @click="authDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="saveAuth">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { userListsWithOutPage } from '@/api/system/user'
import { formatCondition } from '@/utils/index'
import { loadShares } from '@/api/dataset/dataset'
import { execute } from '@/api/system/dynamic'

export default {
  name: 'GrantUser',
  props: {
    resourceId: {
      type: String,
      default: null
    },
    keyWord: {
      type: String,
      default: ''
    },
    authPrivileges: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: [],
      defaultHeadName: this.$t('commons.all'),
      columnLabel: null,
      filter_options: [
        { text: this.$t('panel.unshared_people'), value: 0 },
        { text: this.$t('panel.shared_people'), value: 1 }
      ],
      fieldName: 'nickName',
      type: 0, // 类型0代表用户
      shares: [],
      tableData: [],
      authDialogVisible: false,
      currentNode: null,
      currentAuth: [],
      optionsTemplate: [],
      optionsData: [],
      authAlreadyExists: []
    }
  },
  watch: {
    keyWord(val) {
      this.tableData = this.data.filter(node =>
        !val || node[this.fieldName].toLowerCase().includes(val.toLowerCase())
      )
      this.setCheckNodes()
    }
  },
  created() {
    this.initColumnLabel()
    this.executeAxios(
      '/plugin/auth/authDetailsModel/' + 'panel',
      'get',
      {},
      (res) => {}
    )
    this.search()
  },
  methods: {
    initColumnLabel() {
      this.columnLabel = this.defaultHeadName
    },
    search(condition) {
      const temp = formatCondition(condition)
      const param = temp || {}
      userListsWithOutPage(param).then(response => {
        const data = response.data.filter(ele => ele.id !== this.$store.getters.user.userId)
        this.data = data
        this.tableData = data
        this.queryShareNodeIds()
      })
    },
    getSelected() {
      return this.shares
    },
    filterHandler(value, row) {
      return !(value ^ this.shares.some(s => s.authTarget === row.userId))
    },
    queryShareNodeIds(callBack) {
      const param = { resourceId: this.resourceId, type: this.type }
      loadShares(param).then(res => {
        this.authAlreadyExists = res.data
        // const shares = res.data
        // const nodeIds = shares.map(share => share.targetId)
        // this.shares = shares.map(share => ({
        //   authTarget: share.targetId,
        //   authTargetType: 'user',
        //   privilegeType: 1,
        //   privilegeValue: 1
        // }))
        this.$nextTick(() => this.setCheckNodes())
        callBack && callBack()
      })
    },
    setCheckNodes() {
      this.$nextTick(() => {
        this.$refs.table.store.states.data.forEach(node => {
          const nodeId = node.userId
          const shares = this.authAlreadyExists.map(share => share.targetId)
          this.authAlreadyExists.forEach(share => {
            if (share.targetId === nodeId) {
              const privileges = share.privileges.split(',').filter(Boolean) || []
              privileges.forEach(privilege => {
                const useItem = this.optionsTemplate.find(i => i.privilegeExtend === privilege)
                const exists = this.shares.some(s =>
                  s.authTarget === nodeId &&
                  s.privilegeType === (useItem && useItem.privilegeType || 1)
                )
                if (!exists) { // ✅ 防止重复 push
                  this.shares.push({
                    authTarget: nodeId,
                    authTargetType: 'user',
                    privilegeType: (useItem && useItem.privilegeType) || 1,
                    privilegeValue: 1
                  })
                }
              })
            }
          })
          if (shares.includes(nodeId)) {
            this.$refs.table.toggleRowSelection(node, true)
          }
        })
      })
    },
    selectOne(selection, row) {
      const userId = row.userId
      const useItem = this.optionsTemplate.find(i => i.privilegeExtend === 'view')
      if (selection.some(node => node.userId === row.userId)) {
        if (!this.shares.some(s => s.authTarget === userId)) {
          this.shares.push({
            authTarget: userId,
            authTargetType: 'user',
            privilegeType: useItem.privilegeType || 1,
            privilegeValue: 1
          })
        }
      } else {
        this.shares = this.shares.filter(s => s.authTarget !== userId)
      }
    },
    selectAll(selection) {
      const useItem = this.optionsTemplate.find(i => i.privilegeExtend === 'view')
      if (selection.length > 0) {
        selection.forEach(node => {
          const userId = node.userId
          if (!this.shares.some(s => s.authTarget === userId)) {
            this.shares.push({
              authTarget: userId,
              authTargetType: 'user',
              privilegeType: useItem.privilegeType || 1,
              privilegeValue: 1
            })
          }
        })
      } else {
        const currentNodes = this.$refs.table.store.states.data
        const currentIds = currentNodes.map(n => n.userId)
        this.shares = this.shares.filter(s => !currentIds.includes(s.authTarget))
      }
    },

    // --------------------
    // ↓ 以下逻辑完全移植自 GrantDept.vue
    // --------------------
    executeAxios(url, type, data, callBack) {
      const param = { url, type, data, callBack }
      execute(param).then(res => {
        this.optionsTemplate = res.data
      })
    },
    openAuthDialog(row) {
      this.currentNode = row
      this.optionsData = this.authPrivileges
        .split(',')
        .map(v => this.optionsTemplate.find(i => i.privilegeExtend === v))
        .filter(Boolean)
      const hasUse = this.optionsData.some(o => o.privilegeExtend === 'view')
      if (!hasUse) {
        const useTpl = this.optionsTemplate.find(i => i.privilegeExtend === 'view')
        if (useTpl) this.optionsData.unshift(useTpl)
      }
      const share = this.authAlreadyExists.find(s => s.targetId === row.userId)
      const arr = share ? share.privileges.split(',').filter(Boolean) : []
      if (!arr.includes('view')) arr.push('view')
      this.currentAuth = arr
      this.authDialogVisible = true
    },
    saveAuth() {
      const node = this.currentNode
      const newShares = this.currentAuth.map(ext => {
        const opt = this.optionsTemplate.find(i => i.privilegeExtend === ext)
        return {
          authTarget: node.userId,
          authTargetType: 'user',
          privilegeType: opt ? opt.privilegeType : 1,
          privilegeValue: 1
        }
      })
      const oldSharesList = this.shares.filter(s => s.authTarget === newShares[0].authTarget)
      const removedShares = oldSharesList.filter(oldItem =>
        !newShares.some(newItem =>
          newItem.authTargetType === oldItem.authTargetType &&
          newItem.privilegeType === oldItem.privilegeType &&
          newItem.privilegeValue === oldItem.privilegeValue
        )
      )
      const removedSharesWithZero = removedShares.map(item => ({
        ...item,
        privilegeValue: 0
      }))
      const mergedShares = [...newShares, ...removedSharesWithZero]

      const targetAuths = mergedShares.map(item => item.authTarget)
      const targetSet = new Set(targetAuths)
      this.shares = this.shares.filter(s => !targetSet.has(s.authTarget))
      this.shares.push(...mergedShares)

      this.authDialogVisible = false
      this.$message.success('权限配置已保存')
    }
  }
}
</script>

<style scoped>
.my_table >>> .el-table__row>td {
  border: none;
  padding: 0 0;
}
.my_table >>> .el-table th.is-leaf {
  border: none;
}
.my_table >>> .el-table::before {
  height: 0;
}
.my_table>>>.el-table-column--selection .cell {
  text-align: center;
}
.auth-line {
  margin-bottom: 10px;
}
.el-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
