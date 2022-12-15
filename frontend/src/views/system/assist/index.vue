<template>
  <div>
    <div v-if="panelType === 'list'">
      <el-container>
        <el-header style="line-height: 60px;">
          <el-row>
            <el-col>
              <el-button @click="folderClick">
                <i class="el-icon-folder-add"></i>
                <span>新建文件夹</span>
              </el-button>
              <el-button @click="addClick">
                <i class="el-icon-circle-plus-outline"></i>
                <span>新建自助取数</span>
              </el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-row>
            <el-col>
              <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                  label="名称"
                  prop="name"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="createdBy"
                  label="创建者"
                  width="120"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="updateBy"
                  label="修改人"
                  width="120"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="修改时间"
                  width="150"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="操作"
                > 
                <!-- slot-scope="scope" -->
                  <template>
                    <el-button type="text" icon="el-icon-edit" title="编辑"></el-button>
                    <el-button type="text" icon="el-icon-folder-add" title="新建文件夹"></el-button>
                    <el-button type="text" icon="el-icon-circle-plus-outline" title="新建数据填报"></el-button>
                    <el-button type="text" icon="el-icon-delete" title="删除"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div v-if="panelType === 'add'" class="main_panel">
      <el-container>
        <el-header style="line-height: 60px;border: 1px solid #cccccc;">
          <el-button icon="el-icon-d-arrow-left" circle @click="goback"></el-button>
          <span>自助填报</span>
          <span style="float: right;">
            <el-button >取消</el-button>
            <el-button type="primary">保存</el-button>
          </span>
        </el-header>
        <el-main>
          <el-row type="flex">
            <el-col :span="18" class="bor_box min_hg">
              <el-row class="col_bottom">
                <el-col :span="4">自助填报名称</el-col>
                <el-col :span="8">
                  <el-input v-model="assistData.assistName" placeholder="请输入"></el-input>
                </el-col>
              </el-row>
              <el-row class="col_bottom">
                <el-col :span="4">数据集</el-col>
                <el-col :span="8">
                  <el-select ref="dataRef" v-model="assistData.assistMuster">
                    <el-option v-model="setvalue" 
                      style="height: 100%;max-height: 200px;overflow-y: auto;padding: 0;background-color: #ffffff;"
                    >
                      <select-tree :privileges="privileges" :mode="mode" :clear-empty-dir="clearEmptyDir" :type="type" :custom-type="customType" :show-mode="showMode" @getTable="getTable" />
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row class="bor_box col_bottom" type="flex">
                <el-col :span="22">
                  <el-col class="col_bottom">
                    <el-col :span="6">
                      <el-select v-model="assistData.assistArea">
                        <el-option label="1" value="1"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-select v-model="assistData.assistYear">
                        <el-option label="1" value="1"></el-option>
                      </el-select>
                    </el-col>
                  </el-col>
                  <el-col>
                    <el-col :span="12">
                      <el-date-picker
                        v-model="assistData.assistTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary">查询</el-button>
                </el-col>
              </el-row>
              <el-row class="col_bottom">
                <el-col style="text-align:right;">
                  <el-button>创建任务</el-button>
                </el-col>
              </el-row>
              <el-row class="bor_box" style="height:300px;">
                <de-container>
                  <de-main-container>
                    <dataset-table-data :table="table" />
                  </de-main-container>
                </de-container>
              </el-row>
            </el-col>
            <el-col :span="6" class="bor_box min_hg">
              <chart-edit ref="chartEditRef" :edit-from="'panel'" :param="chartEditParam" />
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <el-dialog
      title="新增"
      :visible.sync="visibleType"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
          <el-form-item label="名称" prop="typeName">
            <el-input v-model="formData.typeName" ></el-input>
          </el-form-item>
        </el-form>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSuccess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LayoutContent from '@/components/business/LayoutContent'
import selectTree from '@/views/system/assist/selectTree'
import DatasetTableData from '@/views/dataset/common/DatasetTableData'
import { getTable } from '@/api/dataset/dataset'
import ChartEdit from '@/views/chart/view/ChartEdit'

export default {
  name: '',
  components: {LayoutContent,selectTree,DatasetTableData,ChartEdit},
  props: {
    mode: {
      type: Number,
      required: false,
      default: -1
    },
    type: {
      type: String,
      required: false,
      default: null
    },
    showMode: {
      type: String,
      required: false,
      default: null
    },
    customType: {
      type: Array,
      required: false,
      default: null
    },
    privileges: {
      type: String,
      required: false,
      default: null
    },
    clearEmptyDir: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      panelType: 'list',
      formData: {
        typeName: '',
      },
      tableData: [{
        id: 1,
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹1',
        type: 'group',
        children: [
          {
            id: 1.1,
            updateTime: '2016-05-01',
            updateBy: '王小虎',
            createdBy: '王小虎',
            name: '填报文件夹1-1',
            type: 'group',
            children: []
          },
          {
            id: 1.2,
            updateTime: '2016-05-01',
            updateBy: '王小虎',
            createdBy: '王小虎',
            name: '填报文件夹1-2',
            type: 'group',
            children: []
          }
        ],
      }, {
        id: 2,
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹2',
        type: 'group',
        children: [],
      }, {
        id: 3,
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹3',
        type: 'group',
        children: [],
      }, {
        id: 4,
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹4',
        type: 'group',
        children: [],
      }, {
        id: 5,
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹5',
        type: 'group',
        children: [],
      }],
      indent: 16,
      checkedAll: false,

      visibleType: false,
      rules:{
        typeName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      setvalue: '',
      table:{},

      assistData: {
        assistName: '',
        assistMuster: '',
        assistArea: '',
        assistYear: '',
        assistTime: [],
      }
    }
  },
  mounted() {

  },
  methods: {
    chartEditParam() {
      // if (this.curComponent) {
      //   if (this.curComponent.type === 'view') {
      //     return { 'id': this.curComponent.propValue.viewId, 'optType': 'edit' }
      //   } else if (this.curComponent.type === 'de-tabs' && this.$store.state.chart.viewId) {
      //     return { 'id': this.$store.state.chart.viewId, 'optType': 'edit' }
      //   } else {
      //     return {}
      //   }
      // }
      // return this.curComponent ? { 'id': this.curComponent.propValue.viewId, 'optType': 'edit' } : {}
      return {}
    },
    getTable(table) {
      // this.table = table
      console.log('这个有触发吗？',table)
      // this.selObj.setvalue = table.label
      this.assistData.assistMuster = table.label
      table && table.id && getTable(table.id).then(response => {
        this.table = response.data
        console.log('这个数据',this.table)
        // this.$emit('getTable', this.table)
      }).catch(res => {
        this.table = {}
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    changeAllSelect() {

    },
    changeRowSelect(data) {
      console.log(data)
    },
    folderClick() {
      this.visibleType = true
    },
    handleClose() {
      this.visibleType = false
    },
    onSuccess() {
      this.visibleType = false
    },
    onCancel() {
      this.visibleType = false
    },
    addClick() {
      this.panelType = 'add'
    },
    goback() {
      this.panelType = 'list'
    }
  }
}
</script>

<style scoped>
::v-deep .main_panel .el-main {
  padding: 0px;
}
.bor_box {
  border: 1px solid #cccccc;
  padding: 10px 10px;
}
.min_hg {
  min-height: 500px;
}

.col_bottom {
  margin-bottom: 10px;
}
</style>