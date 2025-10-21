<template>
  <el-col style="padding: 0 5px 0 5px;">
    <el-row>
      <span class="header-title">{{ $t('panel.share_in') }}</span>
      <div class="block" style="margin-top:8px;">
        <el-tree ref="topTree" :data="datas" :props="defaultProps" :highlight-current="true" node-key="name" :default-expanded-keys="expandNodes" @node-click="handleNodeClick">
          <span slot-scope="{ data }" class="custom-tree-node father">
            <span style="display: flex; flex: 1 1 0%; width: 0px;" :class="!!data.msgNode ? 'msg-node-class': ''">
              <span v-if="!!data.id">
                <svg-icon icon-class="panel" class="ds-icon-scene" />
              </span>
              <span style="margin-left: 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ data.name }}</span>
            </span>

          </span>
        </el-tree>
      </div>
    </el-row>

    <el-row>
      <span class="header-title">{{ $t('panel.share_out') }}</span>
      <div class="block" style="margin-top:8px;">
        <el-tree ref="botTree" :data="outDatas" :props="defaultProps" :highlight-current="true" node-key="name" :default-expand-all="true">
          <span slot-scope="{ data }" class="custom-tree-node father">
            <span style="display: flex; flex: 1 1 0%; width: 0px;" @click="viewMyShare(data)">
              <span v-if="!!data.id">
                <svg-icon icon-class="panel" class="ds-icon-scene" />
              </span>
              <span style="margin-left: 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ data.name }}</span>
            </span>

            <span class="child">
              <span class="el-dropdown-link">
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  size="small"
                  @click="removeCurrent(data)"
                />
              </span>
            </span>
          </span>

        </el-tree>
      </div>
    </el-row>
  </el-col>
</template>

<script>
import { loadTree, loadShareOutTree, removeShares } from '@/api/panel/share'
import { uuid } from 'vue-uuid'
import { initPanelData } from '@/api/panel/panel'
import { proxyInitPanelData } from '@/api/panel/shareProxy'
import { deepCopy } from '@/components/canvas/utils/utils'
import {
  DEFAULT_COMMON_CANVAS_STYLE_STRING
} from '@/views/panel/panel'
import bus from '@/utils/bus'
export default {
  name: 'ShareTree',
  props: {
    msgPanelIds: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      datas: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      expandNodes: [],
      outDatas: [],
      lastActiveNode: null,
      lastActiveNodeData: null
    }
  },
  computed: {
    panelInfo() {
      return this.$store.state.panel.panelInfo
    }
  },
  watch: {
    '$store.state.panel.mainActiveName': function(newVal, oldVal) {
      if (newVal === 'PanelMain' && this.lastActiveNode && this.lastActiveNodeData) {
        this.activeNodeAndClickOnly(this.lastActiveNodeData)
      }
    }
  },
  created() {
    bus.$on('refresh-my-share-out', () => {
      this.initOutData().then(res => {
        this.outDatas = res.data
        this.setMainNull()
      })
    })
    this.initData().then(res => {
      this.datas = res.data
      if (this.msgPanelIds && this.msgPanelIds.length > 0) {
        this.expandMsgNode(this.msgPanelIds)
      }
    })
    this.initOutData().then(res => {
      this.outDatas = res.data
    })
  },

  methods: {
    initData() {
      const param = {}
      return loadTree(param)
    },
    initOutData() {
      return loadShareOutTree()
    },
    // handleNodeClick(data) {
    //   if (!data || !data.userId || !data.id) {
    //     return
    //   }
    //   const param = { userId: data.userId }
    //   proxyInitPanelData(data.id, param, function() {
    //     bus.$emit('set-panel-show-type', 1)
    //     // bus.$emit('set-panel-show-type', 0)
    //     bus.$emit('set-panel-share-user', data.userId)
    //   })
    //   this.$refs['botTree'].setCurrentKey(null)
    // },
    handleNodeClick(data, node) {
      if (!data || !data.userId || !data.id) {
        return
      }
      this.lastActiveNode = node
      this.lastActiveNodeData = data
      this.$store.commit('setComponentDataCache', null)
      initPanelData(data.id, function(response) {
        bus.$emit('set-panel-show-type', 0)
      })
    },
    edit(data, node) {
      this.lastActiveNodeData = data
      this.lastActiveNode = node
      // 清空当前缓存,快照
      this.$store.commit('refreshSnapshot')
      this.$store.commit('setComponentData', [])
      if (this.isPanelStyle) {
        const canvasStyle = deepCopy(DEFAULT_COMMON_CANVAS_STYLE_STRING)
        canvasStyle.width = this.panelStyleData.canvasWidth
        canvasStyle.height = this.panelStyleData.canvasHeight
        canvasStyle.refreshViewLoading = this.panelStyleData.refreshViewLoading
        canvasStyle.refreshUnit = this.panelStyleData.refreshUnit
        canvasStyle.refreshTime = this.panelStyleData.refreshTime
        canvasStyle.panel = this.panelStyleData.panel
        this.$store.commit('setCanvasStyle', canvasStyle)
      } else {
        this.$store.commit('setCanvasStyle', DEFAULT_COMMON_CANVAS_STYLE_STRING)
      }
      this.$store.dispatch('panel/setPanelInfo', data)
      bus.$emit('PanelSwitchComponent', { name: 'PanelEdit' })
    },
    editFromPanelViewShow() {
      this.edit(this.lastActiveNodeData, this.lastActiveNode)
    },
    activeNodeAndClickOnly(panelInfo) {
      if (panelInfo) {
        this.$nextTick(() => {
          // 延迟设置 CurrentKey
          this.$refs.topTree.setCurrentKey(panelInfo.id)
          // 去除 bottomTree 的 影响
          this.$refs.botTree.setCurrentKey(null)
          this.$nextTick(() => {
            document.querySelector('.is-current').firstChild.click()
          })
        })
      }
    },
    viewMyShare(data) {
      initPanelData(data.id, function() {
        bus.$emit('set-panel-show-type', 2)
      })
      this.$refs['topTree'].setCurrentKey(null)
    },
    resetID(data) {
      if (data) {
        data.forEach(item => {
          item.type !== 'custom' && (item.id = uuid.v1())
        })
      }

      return data
    },
    expandMsgNode(panelIds) {
      // console.log(panelIds)
      this.$nextTick(() => {
        this.getMsgNodes(panelIds)
      })
    },
    getMsgNodes(panelIds) {
      this.datas.forEach(item => {
        if (item.children && item.children.length > 0) {
          item.children.forEach(node => {
            if (panelIds.includes(node.id)) {
              node.msgNode = true
              this.expandNodes.push(item.name)
            }
          })
        }
      })
    },
    removeCurrent(node) {
      const param = {
        panelId: node.id
      }

      this.$confirm(this.$t('panel.remove_share_confirm'), '', {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: 'warning'
      }).then(() => {
        removeShares(param).then(res => {
          this.panelInfo && this.panelInfo.id && node.id === this.panelInfo.id && this.setMainNull()
          this.initOutData().then(res => {
            this.outDatas = res.data
          })
          this.$success(this.$t('commons.delete_success'))
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('commons.delete_cancelled')
        })
      })
    },
    setMainNull() {
      this.$store.dispatch('panel/setPanelInfo', { id: null, name: '', preStyle: null })
    }

  }
}
</script>

<style lang="scss" scoped>
.header-title {
    font-size: 14px;
    flex: 1;
    color: var(--TextPrimary, #606266);
    font-weight: bold;
    display: block;
    height: 100%;
    /*line-height: 36px;*/
  }
.msg-node-class {
  color: red;
  >>> i{
    color: red;
  }
}
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right:8px;
  }

  .custom-tree-node-list {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding:0 8px;
  }
  .father .child {
    /*display: none;*/
    visibility: hidden;
  }
  .father:hover .child {
    /*display: inline;*/
    visibility: visible;
  }
</style>
