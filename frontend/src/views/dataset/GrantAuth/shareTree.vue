<template>
  <el-col style="padding: 0 5px 0 5px;">
    <el-row>
      <span class="header-title">{{ $t('panel.share_in') }}</span>
      <div class="block" style="margin-top:8px;">
        <el-tree ref="topTree" :data="datas" :props="defaultProps" :highlight-current="true" node-key="name" :default-expanded-keys="expandNodes" @node-click="handleNodeClick">
          <span slot-scope="{ data }" class="custom-tree-node father">
            <span style="display: flex; flex: 1 1 0%; width: 0px;" :class="!!data.msgNode ? 'msg-node-class': ''">
              <!-- <span v-if="!!data.id">
                <svg-icon icon-class="panel" class="ds-icon-scene" />
              </span> -->
              <span>
                <svg-icon v-if="data.datasetType === 'db'" icon-class="ds-db" class="ds-icon-db" />
                <svg-icon v-if="data.datasetType === 'sql'" icon-class="ds-sql" class="ds-icon-sql" />
                <svg-icon v-if="data.datasetType === 'excel'" icon-class="ds-excel" class="ds-icon-excel" />
                <!-- <svg-icon v-if="data.datasetType === 'onLineExcel'" icon-class="ds-excel" class="ds-icon-excel" /> -->
                <i v-if="data.datasetType === 'onLineExcel'" class="el-icon-edit-outline ds-icon-excel" />
                <svg-icon v-if="data.datasetType === 'custom'" icon-class="ds-custom" class="ds-icon-custom" />
                <svg-icon v-if="data.datasetType === 'union'" icon-class="ds-union" class="ds-icon-union" />
                <svg-icon v-if="data.datasetType === 'api'" icon-class="ds-api" class="ds-icon-api" />
              </span>
              <span v-if="data.datasetType === 'db' || data.datasetType === 'sql'">
                <span v-if="data.mode === 0" style="margin-left: 6px"><i class="el-icon-s-operation" /></span>
                <span v-if="data.mode === 1" style="margin-left: 6px"><i class="el-icon-alarm-clock" /></span>
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
        <el-tree ref="botTree" :data="outDatas" :props="defaultProps" :highlight-current="true" node-key="name" :default-expand-all="true" @node-click="handleNodeClick">
          <span slot-scope="{ data }" class="custom-tree-node father">
            <span style="display: flex; flex: 1 1 0%; width: 0px;">
              <!-- @click="viewMyShare(data)" -->
              <!-- <span v-if="!!data.id">
                <svg-icon icon-class="panel" class="ds-icon-scene" />
              </span> -->
              <!-- {{ data }} -->
              <span>
                <svg-icon v-if="data.datasetType === 'db'" icon-class="ds-db" class="ds-icon-db" />
                <svg-icon v-if="data.datasetType === 'sql'" icon-class="ds-sql" class="ds-icon-sql" />
                <svg-icon v-if="data.datasetType === 'excel'" icon-class="ds-excel" class="ds-icon-excel" />
                <!-- <svg-icon v-if="data.datasetType === 'onLineExcel'" icon-class="ds-excel" class="ds-icon-excel" /> -->
                <i v-if="data.datasetType === 'onLineExcel'" class="el-icon-edit-outline ds-icon-excel" />
                <svg-icon v-if="data.datasetType === 'custom'" icon-class="ds-custom" class="ds-icon-custom" />
                <svg-icon v-if="data.datasetType === 'union'" icon-class="ds-union" class="ds-icon-union" />
                <svg-icon v-if="data.datasetType === 'api'" icon-class="ds-api" class="ds-icon-api" />
              </span>
              <span v-if="data.datasetType === 'db' || data.datasetType === 'sql'">
                <span v-if="data.mode === 0" style="margin-left: 6px"><i class="el-icon-s-operation" /></span>
                <span v-if="data.mode === 1" style="margin-left: 6px"><i class="el-icon-alarm-clock" /></span>
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
// import { loadTree, loadShareOutTree, removeShares } from '@/api/panel/share'
import { loadTree, loadShareOutTree, removeShares } from '@/api/dataset/dataset'
import { uuid } from 'vue-uuid'
// import { initPanelData } from '@/api/panel/panel'
// import { proxyInitPanelData } from '@/api/panel/shareProxy'
import bus from '@/utils/bus'
export default {
  name: 'ShareTree',
  props: {
  },
  data() {
    return {
      datas: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      expandNodes: [],
      outDatas: []
    }
  },
  computed: {
    panelInfo() {
      return this.$store.state.panel.panelInfo
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
    handleNodeClick(data, node) {
      data.type = 'datasetShare'
      if (data.datasetType !== 'group') {
        if (data.datasetType === 'onLineExcel') {
          this.$emit('switchComponent', { name: 'viewOnlineExcel', param: data })
        } else {
          this.$emit('switchComponent', { name: 'ViewTable', param: data })
        }
      }
    },
    // handleNodeClick(data) {
    //   if (!data || !data.userId || !data.id) {
    //     return
    //   }
    //   const param = { userId: data.userId }
    //   proxyInitPanelData(data.id, param, function() {
    //     bus.$emit('set-panel-show-type', 1)
    //     bus.$emit('set-panel-share-user', data.userId)
    //   })
    //   this.$refs['botTree'].setCurrentKey(null)
    // },
    // viewMyShare(data) {
    //   initPanelData(data.id, function() {
    //     bus.$emit('set-panel-show-type', 2)
    //   })
    //   this.$refs['topTree'].setCurrentKey(null)
    // },
    resetID(data) {
      if (data) {
        data.forEach(item => {
          item.type !== 'custom' && (item.id = uuid.v1())
        })
      }

      return data
    },
    removeCurrent(node) {
      const param = {
        datasetId: node.id
      }

      this.$confirm('确认取消当前数据集所有分享？', '', {
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
