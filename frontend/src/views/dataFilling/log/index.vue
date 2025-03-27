<script>
import DeContainer from '@/components/datains/DeContainer.vue'
import DeAsideContainer from '@/components/datains/DeAsideContainer.vue'
import LogList from '../form/LogList.vue'

export default {
  name: 'DataFillingTemplate',
  components: { DeAsideContainer, DeContainer, LogList },
  data() {
    return {
      activeName: 'log'
    }
  },
  computed: {
    // 数据填报下的菜单
    menusList() {
      let dataFilling = this.$store.state.permission.routes.find(item => item.name === 'data-filling')
      return dataFilling ? dataFilling.children : []
    },
  },
  methods: {
    hasMenuPermission(menuName) {
      return this.menusList.findIndex(menu => menu.name === menuName) !== -1
    },
    tabClick() {
      if (this.activeName === 'forms') {
        this.$router.push('/data-filling/my-jobs')
      } else if (this.activeName === 'template') {
        this.$router.push('/data-filling/template')
      }
    },
  }
}
</script>

<template>
  <de-container
    v-loading="$store.getters.loadingMap[$store.getters.currentPath]"
    style="background-color: #f7f8fa"
  >
    <de-aside-container type="data-filling">
      <el-tabs
        v-model="activeName"
        class="tab-panel"
        @tab-click="tabClick"
      >

        <el-tab-pane
          v-if="hasMenuPermission('my-jobs')"
          name="forms"
        >
          <span slot="label">
            填报管理
          </span>
        </el-tab-pane>

        <el-tab-pane
          v-if="hasMenuPermission('data-filling-template')"
          name="template"
        >
          <span slot="label">
            模板库
          </span>
        </el-tab-pane>

        <el-tab-pane
          name="log"
        >
          <span slot="label">
            审计日志
          </span>
        </el-tab-pane>
        
      </el-tabs>

      
    </de-aside-container>


    <el-main v-if="activeName === 'log'" style="padding: 0">
        <LogList></LogList>
    </el-main>

  </de-container>
</template>

<style  lang="scss" scoped>
.ms-aside-container {
  height: calc(100vh - 56px);
  padding: 0px;
  min-width: 260px;
  max-width: 460px;
}

.tab-panel {
  height: 100%;
  overflow-y: auto;
}

.tab-panel ::v-deep .el-tabs__nav-wrap {
  padding: 0 10px;
}

.tab-panel ::v-deep .el-tabs__nav-wrap::after {
  height: 1px;
}

.tab-panel ::v-deep .el-tabs__item {
  /* width: 10px; */
  padding: 0 10px;
}

::v-deep.ms-aside-container{
  padding: 0
}
.m-dialog {
  .el-dialog__body {
    padding: 0
  }
}
.de-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end
}
.custom-tree-node-list {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 8px;
}
.father .child {
  /*display: none;*/
  visibility: hidden;
}

.father:hover .child {
  /*display: inline;*/
  visibility: visible;
}
.no-tdata {
  text-align: center;
  margin-top: 80px;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  color: var(--deTextSecondary, #646a73);
  font-weight: 400;

  .no-tdata-new {
    cursor: pointer;
    color: var(--primary, #3370ff);
  }
}
.de-tree {
  .el-tree-node.is-current.is-focusable {
    &>.el-tree-node__content {
      background-color: var(--deWhiteHover, #e0eaff);
      color: var(--primary, #3370ff);
    }
  }

  .el-tree-node__content, .de-el-tree-node__content {

    .el-icon-more,
    .el-icon-plus {
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      color: #646a73;
      cursor: pointer;
    }

    .el-icon-more:hover,
    .el-icon-plus:hover {
      background: rgba(31, 35, 41, 0.1);
      border-radius: 4px;
    }

    .el-icon-more:active,
    .el-icon-plus:active {
      background: rgba(31, 35, 41, 0.2);
      border-radius: 4px;
    }
  }
  .el-tree-node__content {
    height: 40px;
    border-radius: 4px;

    &:hover {
      background: rgba(31, 35, 41, 0.1);
    }
  }

  .de-el-tree-node__content {
    .el-button--text {
      padding: 0 !important;
    }
    .el-icon-more {
      width: 32px;
      height: 32px;
      line-height: 32px;
    }
  }
}

.file-container {
  display: flex;
  height: 100%;
  
  .file-tree {
    width: 280px;
    border-right: 1px solid #dcdfe6;
  }
  
  .file-content {
    flex: 1;
  }
}
</style>
