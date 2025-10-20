<template>
  <el-col>
    <el-row class="tree-head">
      <span style="float: left;padding-left: 10px">{{ $t('panel.all_org') }}</span>

    </el-row>
    <el-row style="margin-top: 5px">

      <el-tree
        ref="tree"
        :data="data"
        lazy
        :load="loadTree"
        style="width: 100%"
        :props="defaultProps"
        :default-expanded-keys="expandNodeIds"
        node-key="deptId"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>
            <span style="margin-left: 6px">{{ node.data.name }}</span>
          </span>
          <span @click.stop>

            <div>
              <span class="auth-span">
                <el-checkbox v-model="data.checked" @change="nodeStatusChange(data)" />
                <!-- ★ 权限配置按钮 -->
                <el-button
                  v-if="data.checked"
                  type="text"
                  size="mini"
                  icon="el-icon-setting"
                  style="margin-left:8px;color:#409EFF;"
                  @click="openAuthDialog(data)"
                />
              </span>
            </div>
          </span>
        </span>
      </el-tree>
    </el-row>
    <el-dialog
      title="权限配置"
      :visible="authDialogVisible"
      width="400px"
      append-to-body
    >
      <!-- <div class="auth-line">
        <label>已选组织：</label>
        <span>{{ currentNode?.name }}</span>
      </div> -->
      <!-- <el-divider /> -->
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

      <div slot="footer">
        <el-button size="mini" @click="authDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="saveAuth">确定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import { getDeptTree, loadTable } from '@/api/system/dept'
import { loadShares } from '@/api/panel/share'
import { execute } from '@/api/system/dynamic'
export default {
  name: 'GrantDept',
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
      defaultCondition: {
        field: 'pid',
        operator: 'eq',
        value: 0
      },
      type: 2, // 类型2代表组织
      shares: [],
      changeIndex: 0,
      timeMachine: null,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: (data, node) => {
          return !data.hasChildren
        }
      },
      expandNodeIds: [],
      sharesLoad: false,
      OptionsData: [],
      authAlreadyExists: [],
      authAlreadyExistsOption: [],
      optionsTemplate: [],
      optionsData: [],
      authDialogVisible: false,
      currentNode: null,
      currentAuth: [] // 当前节点已选权限
    }
  },
  watch: {
    keyWord(v, o) {
      this.destryTimeMachine()
      this.changeIndex++
      this.searchWithKey(this.changeIndex)
    }
  },
  created() {
    this.executeAxios(
      '/plugin/auth/authDetailsModel/' + 'panel',
      'get',
      {},
      (res) => {
      }
    )
    this.search()
  },
  methods: {
    // 根据关键字搜索
    // 1500ms内 key不发生变化则执行查询
    searchWithKey(index) {
      this.timeMachine = setTimeout(() => {
        if (index === this.changeIndex) {
          const condition = {
            field: 'name',
            operator: 'like',
            value: this.keyWord
          }
          this.search(condition)
        }
        this.destryTimeMachine()
      }, 1500)
    },
    destryTimeMachine() {
      this.timeMachine && clearTimeout(this.timeMachine)
      this.timeMachine = null
    },
    loadTree(node, resolve) {
      if (!node || !node.data || !node.data.deptId) return
      getDeptTree(node.data.deptId).then(res => {
        let data = res.data
        data = data.map(obj => {
          if (obj.subCount > 0) {
            obj.hasChildren = true
          }
          return obj
        })
        this.setCheckExpandNodes(data)
        resolve && resolve(data)
      })
    },

    // 加载表格数据
    search(condition) {
      this.data = []
      let param = {}
      if (condition && condition.value) {
        param = { conditions: [condition] }
      } else {
        param = { conditions: [this.defaultCondition] }
      }
      if (!this.sharesLoad) {
        this.queryShareNodeIds(() => {
          this.sharesLoad = true
          this.loadTreeData(param, condition)
        })
      } else {
        this.loadTreeData(param, condition)
      }
    },

    loadTreeData(param, condition) {
      loadTable(param).then(res => {
        let data = res.data
        data = data.map(obj => {
          if (obj.subCount > 0) {
            obj.hasChildren = true
          }
          return obj
        })

        this.setCheckExpandNodes(data)
        this.expandNodeIds = []
        if (condition && condition.value) {
          this.data = this.buildTree(data)
          this.$nextTick(() => {
            this.expandResult(this.data)
          })
        } else {
          this.data = data
        }
      })
    },

    expandResult(list) {
      list.forEach(node => {
        if (node.children && node.children.length > 0) {
          this.expandNodeIds.push(node.deptId)
          this.expandResult(node.children)
        }
      })
    },

    buildTree(arrs) {
      const idMapping = arrs.reduce((acc, el, i) => {
        acc[el.deptId] = i
        return acc
      }, {})
      const roots = []
      arrs.forEach(el => {
        // 判断根节点
        if (el.pid === null || el.pid === 0) {
          roots.push(el)
          return
        }
        // 用映射表找到父元素
        const parentEl = arrs[idMapping[el.pid]]
        // 把当前元素添加到父元素的`children`数组中
        parentEl.children = [...(parentEl.children || []), el]
      })
      return roots
    },

    getSelected() {
      return this.shares
    },

    cancel() {
    },

    buildRequest(rows) {
      const targetIds = rows.map(row => row.deptId)
      const panelIds = [this.resourceId]
      return {
        targetIds: targetIds,
        panelIds: panelIds,
        type: this.type
      }
    },

    queryShareNodeIds(callBack) {
      const param = { resourceId: this.resourceId, type: this.type }
      loadShares(param).then(res => {
        // const shares = res.data
        // const nodeIds = shares.map(share => share.targetId)
        // this.shares = nodeIds
        this.authAlreadyExists = res.data
        callBack && callBack()
      })
    },

    // setCheckExpandNodes(rows) {
    //   rows.forEach(node => {
    //     const nodeId = node.deptId
    //     this.shares.includes(nodeId) && (node.checked = true)
    //   })
    // },
    setCheckExpandNodes(rows) {
      rows.forEach(node => {
        const shares = this.authAlreadyExists.map(share => share.targetId)
        this.authAlreadyExists.forEach(share => {
          if (share.targetId === node.deptId) {
            const privileges = share && share.privileges.split(',').filter(Boolean) || []
            privileges.forEach(privilege => {
              const useItem = this.optionsTemplate.find(i => i.privilegeExtend === privilege)
              this.shares.push(
                {
                  authTarget: node.deptId,
                  authTargetType: 'dept',
                  privilegeType: useItem.privilegeType,
                  privilegeValue: 1
                }
              )
            })
          }
        })
        const exists = shares.includes(node.deptId) && (node.checked = true)
        this.$set(node, 'checked', exists)
      })
    },

    // nodeStatusChange(val) {
    //   if (val.checked) {
    //     if (!this.shares.includes(val.deptId)) {
    //       this.shares.push(val.deptId)
    //     }
    //   } else {
    //     this.shares = this.shares.filter(deptId => deptId !== val.deptId)
    //   }
    // }
    nodeStatusChange(val) {
      const deptId = val.deptId
      if (val.checked) {
        // 若已存在则不再 push
        if (!this.shares.some(s => s.authTarget === deptId)) {
          const useItem = this.optionsTemplate.find(i => i.privilegeExtend === 'view')
          this.shares.push({
            authTarget: deptId,
            authTargetType: 'dept',
            privilegeType: useItem.privilegeType,
            privilegeValue: 1
          })
        }
      } else {
        // 取消勾选：移除该部门对象
        this.shares = this.shares.filter(s => s.authTarget !== deptId)
      }
    },

    executeAxios(url, type, data, callBack) {
      const param = {
        url: url,
        type: type,
        data: data,
        callBack: callBack
      }
      execute(param).then(res => {
        this.optionsTemplate = res.data
      })
    },
    openAuthDialog(node) {
      this.currentNode = node

      // 1. 根据后台配置的权限生成可选项（可能不含 view）
      this.optionsData = this.authPrivileges
        .split(',')
        .map(v => this.optionsTemplate.find(item => item.privilegeExtend === v))
        .filter(Boolean)

      // 2. ★ 若 view 不在列表里，手动补回（用于展示 & 禁用）
      const hasUse = this.optionsData.some(o => o.privilegeExtend === 'view')
      if (!hasUse) {
        const useTpl = this.optionsTemplate.find(i => i.privilegeExtend === 'view')
        if (useTpl) this.optionsData.unshift(useTpl) // 放最前面
      }

      // 3. 回显已授权限（含 view）
      const share = this.authAlreadyExists.find(s => s.targetId === node.deptId)
      const arr = share ? share.privileges.split(',').filter(Boolean) : []
      if (!arr.includes('view')) arr.push('view')
      this.currentAuth = arr
      this.authDialogVisible = true
    },
    // 保存授权
    saveAuth() {
      const node = this.currentNode
      // 1. 生成新结构 shares（每条权限一个对象）
      const newShares = this.currentAuth.map(ext => {
        const opt = this.optionsTemplate.find(i => i.privilegeExtend === ext)
        return {
          authTarget: node.deptId,
          authTargetType: 'dept',
          privilegeType: opt ? opt.privilegeType : 1, // 兜底
          privilegeValue: 1
        }
      })

      // 2. 先取出当前弹窗权限的旧值
      const oldSharesList = this.shares.filter(s => s.authTarget === newShares[0].authTarget)
      // 旧值 oldSharesList 和 新值 newShares 对比 判断 获取旧值中不存在新值中的数据 要获取 旧值中存在、但新值中不存在的项（即被删除的项）。
      const removedShares = oldSharesList.filter(oldItem =>
        !newShares.some(newItem =>
          newItem.authTargetType === oldItem.authTargetType &&
          newItem.privilegeType === oldItem.privilegeType &&
          newItem.privilegeValue === oldItem.privilegeValue
        )
      )
      // 从 removedShares 里拿到所有被删除的项，保持其他字段不变，只把 privilegeValue 改为 0。
      // 可以直接用 .map() 来生成新的数组 👇
      const removedSharesWithZero = removedShares.map(item => ({
        ...item,
        privilegeValue: 0
      }))
      const mergedShares = [...newShares, ...removedSharesWithZero]
      // 获取要去掉的 authTarget 列表
      const targetAuths = mergedShares.map(item => item.authTarget)
      // 从 this.shares 里过滤掉相同 authTarget 的项
      const targetSet = new Set(targetAuths) // 去重后判断
      this.shares = this.shares.filter(s => !targetSet.has(s.authTarget))
      // 再追加新数据
      this.shares.push(...mergedShares)
      // 关闭弹窗
      this.authDialogVisible = false
      this.$message.success('权限配置已保存')
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
    padding-left: 8px;
  }
  .tree-main{
    height:  calc(100vh - 210px);
    border: 1px solid #e6e6e6;
    overflow-y: auto;
  }
  /* .tree-head{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #f7f8fa;
    font-size: 12px;
    color: #3d4d66 ;
  } */
  .tree-head{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid var(--TableBorderColor, #e6e6e6);
    background-color: var(--SiderBG, #f7f8fa);
    font-size: 12px;
    color: var(--TableColor, #3d4d66) ;
  }

  .auth-span{
    float: right;
    width:50px;
    margin-right: 30px
  }
  .highlights-text {
    color: #faaa39 !important;
  }

.my_table >>> .el-table__row>td{
  /* 去除表格线 */
  border: none;
  padding: 0 0;
}
.my_table >>> .el-table th.is-leaf {
  /* 去除上边框 */
    border: none;
}
.my_table >>> .el-table::before{
  /* 去除下边框 */
  height: 0;
}

.my_table>>>.el-table-column--selection .cell{
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
