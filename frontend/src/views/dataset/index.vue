<template>
  <de-container v-loading="$store.getters.loadingMap[$store.getters.currentPath]">

    <de-aside-container type="dataset">
      <el-tabs v-model="activeName" class="tab-panel" :stretch="true" @tab-click="handleClick">
        <el-tab-pane name="group" :label="$t('dataset.datalist')">
          <group v-if="activeName === 'group'" :save-status="saveStatus" @switchComponent="switchComponent" />
        </el-tab-pane>
        <el-tab-pane name="shareTree" :label="$t('panel.share')">
          <ShareTree v-if="showShare" ref="share_tree" :msg-panel-ids="msgPanelIds" @switchComponent="switchComponent" />
        </el-tab-pane>
      </el-tabs>
    </de-aside-container>

    <de-main-container>
      <component :is="component" ref="dynamic_component" :param="param" @switchComponent="switchComponent" @saveSuccess="saveSuccess" />
    </de-main-container>
  </de-container>
</template>

<script>
import DeMainContainer from '@/components/datains/DeMainContainer'
import DeContainer from '@/components/datains/DeContainer'
import DeAsideContainer from '@/components/datains/DeAsideContainer'
import Group from './group/Group'
import ShareTree from './GrantAuth/shareTree'

import DataHome from './data/DataHome'
import ViewTable from './data/ViewTable'
import ViewOnlineExcel from './data/ViewOnlineExcel'
import AddDB from './add/AddDB'
import AddApi from './add/AddApi'
import AddSQL from './add/AddSQL'
import AddExcel from './add/AddExcel'
import AddOnlineExcel from './add/AddOnlineExcel'
import AddCustom from './add/AddCustom'
import AddUnion from '@/views/dataset/add/AddUnion'
import FieldEdit from './data/FieldEdit'
import { removeClass } from '@/utils'
import { checkCustomDs } from '@/api/dataset/dataset'
export default {
  name: 'DataSet',
  components: { DeMainContainer, DeContainer, DeAsideContainer, Group, ShareTree, DataHome, ViewTable, ViewOnlineExcel, AddDB, AddSQL, AddExcel, AddOnlineExcel, AddCustom, AddApi },
  data() {
    return {
      component: DataHome,
      param: {},
      saveStatus: null,
      activeName: 'group',
      showShare: false,
      msgPanelIds: null
    }
  },
  mounted() {
    removeClass(document.body, 'showRightPanel')
  },
  created() {
    this.initDs()
    this.$store.dispatch('app/toggleSideBarHide', true)
    const routerParam = this.$router.currentRoute.params
    this.toMsgShare(routerParam)
  },
  methods: {
    initDs() {
      checkCustomDs().then(res => {
        this.$store.dispatch('dataset/setHideCustomDs', res.data)
      })
    },
    switchComponent(c) {
      console.log('switchComponent', c)
      this.param = c.param
      switch (c.name) {
        case 'ViewTable':
          this.component = ViewTable
          break
        case 'AddDB':
          this.component = AddDB
          break
        case 'AddSQL':
          this.component = AddSQL
          break
        case 'AddExcel':
          this.component = AddExcel
          break
        case 'AddOnlineExcel':
          this.component = AddOnlineExcel
          break
        case 'viewOnlineExcel':
          this.component = ViewOnlineExcel
          break
        case 'AddCustom':
          this.component = AddCustom
          break
        case 'AddUnion':
          this.component = AddUnion
          break
        case 'FieldEdit':
          this.component = FieldEdit
          break
        case 'AddApi':
          this.component = AddApi
          break
        default:
          this.component = DataHome
          break
      }
    },
    handleClick(tab, event) {
      // 点击分析面板需要刷新分享内容
      if (tab.name === 'shareTree') {
        this.refreshShare()
      }
    },

    refreshShare() {
      this.showShare = false
      this.$nextTick(() => (this.showShare = true))
    },

    saveSuccess(val) {
      this.saveStatus = val
    },

    toMsgShare(routerParam) {
      if (routerParam !== null && routerParam.msgNotification) {
        const panelShareTypeIds = [4, 5, 6]
        // 说明是从消息通知跳转过来的
        if (panelShareTypeIds.includes(routerParam.msgType)) { // 是数据集同步
          if (routerParam.sourceParam) {
            try {
              const msgParam = JSON.parse(routerParam.sourceParam)
              this.param = msgParam.tableId
              this.component = ViewTable
              this.$nextTick(() => {
                this.$refs.dynamic_component && this.$refs.dynamic_component.msg2Current && this.$refs.dynamic_component.msg2Current(routerParam.sourceParam)
              })
            } catch (error) {
              console.error(error)
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .ms-aside-container {
    height: calc(100vh - 56px);
    padding: 0 0;
    min-width: 260px;
    max-width: 460px;
  }

  .ms-main-container {
    height: calc(100vh - 56px);
    padding: 10px 15px 0 15px;
  }
  .tab-panel{
    height: 100%;
    overflow-y: auto;
  }
  .tab-panel>>>.el-tabs__nav-wrap{
    padding: 0 10px;
  }
  .tab-panel>>>.el-tabs__nav-wrap::after {
    height: 1px;
  }
  .tab-panel>>>.el-tabs__item{
    /* width: 10px; */
    padding: 0 10px;
  }
</style>
