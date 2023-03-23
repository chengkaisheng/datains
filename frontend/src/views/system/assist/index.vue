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
              <el-button @click="selfClick">
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
                  width="160"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="150"
                > 
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" title="编辑" @click="revise(scope.row)"></el-button>
                    <el-button v-if="scope.row.type === 1" type="text" icon="el-icon-folder-add" title="新建文件夹" @click="folderClick(scope.row)"></el-button>
                    <el-button v-if="scope.row.type === 1" type="text" icon="el-icon-circle-plus-outline" title="新建数据填报" @click="selfClick(scope.row)"></el-button>
                    <el-button v-if="scope.row.type === 2" type="text" icon="el-icon-setting" title="属性" @click="attributeClick(scope.row)"></el-button>
                    <el-button type="text" icon="el-icon-rank" title="移动" @click="moveClick(scope.row)"></el-button>
                    <el-button type="text" icon="el-icon-delete" title="删除" @click="deleteClick(scope.row)"></el-button>
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
            <el-button type="primary" @click="submit">保存</el-button>
          </span>
        </el-header>
        <el-main>
          <el-row type="flex">
            <el-col :span="18" class="bor_box min_hg">
              <el-row class="col_bottom" v-if="typeTitle === '新增'">
                <el-col :span="4">所属文件</el-col>
                <el-col :span="8" class="sel_box">
                  <el-select
                    v-model="addfilename"
                    placeholder="请选择"
                    ref="selectAdd"
                    clearable
                    @clear="clearable"
                    style="width: 100%;"
                    :popper-append-to-body="false"
                  >
                    <el-option :value="addFileList" style="height: auto">
                      <el-tree
                        node-key="id"
                        ref="treeAdd"
                        :data="addFileList"
                        :props="defaultProps"
                        highlight-current
                        @node-click="nodeClick"
                      ></el-tree>
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row class="col_bottom">
                <el-col :span="4">自助填报名称</el-col>
                <el-col :span="8">
                  <el-input v-model="assistData.name" placeholder="请输入"></el-input>
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
              <el-row class="bor_box" style="min-height:350px;">
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
      :title="typeTitle"
      :visible.sync="visibleType"
      width="30%"
      :close-on-click-modal="false"
      :before-close="onCancel">
      <div>
        <el-form ref="formData" :model="formData" label-width="80px" :rules="rules">
          <el-form-item label="名称" prop="typeName">
            <el-input v-model="formData.name" ></el-input>
          </el-form-item>
        </el-form>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSuccess('formData')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="属性"
      :visible.sync="visibleAttr"
      width="30%"
      :close-on-click-modal="false"
      :before-close="onAttrCancel"
    >
      <div>
        <el-row>
          <el-form :model="attrObj" ref="attrForm" label-width="90px">
            <el-col>
              <el-form-item label="名称">
                <el-input v-model="attrObj.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="所有者">
                <el-select v-model="attrObj.ownerList" multiple collapse-tags placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item of owners" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="attrObj.describe" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onAttrCancel">取 消</el-button>
        <el-button type="primary" @click="onAttrSuccess">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="移动"
      :visible.sync="visibleMove"
      width="30%"
      :close-on-click-modal="false"
      :before-close="onMoveCancel"
    >
      <div>
        <el-row>
          <el-col>
            <el-tree
              node-key="id"
              ref="treeAdd"
              :data="addFileList"
              :props="defaultProps"
              highlight-current
              @node-click="nodeMoveClick"
            ></el-tree>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onMoveCancel">取 消</el-button>
        <el-button type="primary" @click="onMoveSuccess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LayoutContent from '@/components/business/LayoutContent'
import selectTree from '@/views/system/assist/selectTree'
import DeMainContainer from '@/components/datains/DeMainContainer'
import DatasetTableData from '@/views/dataset/common/DatasetTableData'
import { getTable } from '@/api/dataset/dataset'
import ChartEdit from '@/views/chart/view/ChartEdit'
import { mapState } from 'vuex'

export default {
  name: '',
  components: {LayoutContent,selectTree,DatasetTableData,DeMainContainer,ChartEdit},
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
      addId: 16,
      formData: {
        name: '',
      },
      addfilename: '',
      addForm: {
        pid: null,
        addName: '',
        addType: '',
      },
      addFileList: [],
      defaultProps: {
        id: 'id',
        label: 'name',
        children: 'children'
      },
      tableData: [],
      indent: 16,
      checkedAll: false,

      visibleType: false,
      typeTitle: '',
      rules:{
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      setvalue: '',
      table:{},

      attrObj: {},
      owners: [
        {id: '001',name: '胡桃'},
        {id: '002',name: '行秋'},
        {id: '003',name: '夜阑'},
        {id: '004',name: '钟离'},
        {id: '005',name: '申鹤'},
      ],
      visibleAttr: false,

      visibleMove: false,
      moveObj: {},
      moveInObj: {},

      assistData: {
        pid: '',
        name: '',
        assistMuster: '',
        assistArea: '',
        assistYear: '',
        assistTime: [],
      }
    }
  },
  computed: {
    ...mapState([
      'fillNumber'
    ])
  },
  mounted() {
    this.addId = this.fillNumber
    this.init()
  },
  methods: {
    init() {
      this.axios.get('/system/data/assist/table/list').then(res => {
        console.log('数据',res)
        if(res.status === 200) {
          this.tableData = res.data.list
        }
      })
    },
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
    folderClick(data) {
      this.visibleType = true
      this.typeTitle = '新增'
      if(data && data.id) {
        this.formData.pid = data.id
      }
    },
    revise(data) {
      this.typeTitle = '修改'
      if(data.type === 1) {
        this.visibleType = true
        this.formData = data
      }
    },
    onSuccess(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          if(this.typeTitle === '新增') {
            let obj = {
              id: this.addId,
              name: this.formData.name,
              createdBy: this.$store.getters.name,
              updateBy: '',
              updateTime: '',
              type: 1,
              children: [],
            }
            if(this.formData.pid!== undefined) {
              obj.pid = this.formData.pid
            }
            this.axios.post('/system/data/assist/table/add',obj).then(res => {
              if(res.status === 200) {
                this.$message.success('新增成功')
                this.tableData = res.data.list
                this.visibleType = false
                this.formData = {name: ''}
                this.addId += 1
                this.$store.commit('setFillNumber',this.addId)
              }
            }).catch(err => { this.$message.error('新增失败') })
          } else if(this.typeTitle === '修改') {
            let obj = {
              id: this.formData.id,
              name: this.formData.name,
              createdBy: this.formData.createdBy,
              updateBy: this.$store.getters.name,
              updateTime: this.dateFormat(new Date()),
              type: this.formData.type,
              children: this.formData.children
            }
            if(this.formData.pid!== undefined) {
              obj.pid = this.formData.pid
            }
            this.axios.post('/system/data/assist/table/update',obj).then(res => {
              if(res.status === 200) {
                this.$message.success('修改成功')
                this.tableData = res.data.list
                this.visibleType = false
                this.formData = {name: ''}
              }
            })
          }
        }else {
          return false
        }
      })
    },
    dateFormat(date) {
      let time = new Date(date)
      let year = time.getFullYear()
      let mon = time.getMonth()+1<10? '0'+ (time.getMonth()+1) : time.getMonth()+1
      let day = time.getDate()<10? '0'+ time.getDate() : time.getDate()
      let h = time.getHours()<10? '0' + time.getHours() : time.getHours()
      let m = time.getMinutes()<10? '0' + time.getMinutes() : time.getMinutes()
      let s = time.getSeconds()<10? '0' + time.getSeconds() : time.getSeconds()

      return year +'-'+ mon +'-'+ day + ' '+ h +':'+ m +':'+ s
    },
    onCancel() {
      this.$refs.formData.resetFields()
      this.visibleType = false
      this.formData = {
        name: ''
      }
    },
    selfClick(data) {
      console.log(data)
      if(data && data.id) {
        this.addfilename = data.name
        this.addForm.pid = data.id
      }
      this.typeTitle = '新增'
      this.searchFiles()
      this.panelType = 'add'
    },
    searchFiles(data) {
      let obj = {id: ''}
      if(data) { // 用于去除当前所在的文件id
        if(!data.pid) {
          obj.id = data.id
        } else {
          obj.id = data.pid
        }
      }
      this.axios.post('/system/data/assist/add/search',obj).then(res => {
        // console.log('数据1111',res)
        if(res.status === 200) {
          this.addFileList = res.data.list
          console.log('文件夹数据',this.addFileList)
        }
      })
    },
    // 清空树选择
    clearable() {
      console.log('1111111')
      this.assistData.pid = null
    },
    // 树点击赋值
    nodeClick(data) {
      // console.log(data)
      this.assistData.pid = data.id
      this.addfilename = data.name
      this.$refs.selectAdd.blur();
    },
    goback() {
      this.panelType = 'list'
      this.addfilename = ''
      this.assistData = {
        pid: '',
        name: '',
        assistMuster: '',
        assistArea: '',
        assistYear: '',
        assistTime: [],
      }
    },
    submit() {

    },
    attributeClick(data) {
      this.attrObj = data
      this.visibleAttr = true
    },
    onAttrSuccess() {
      this.axios.post('/system/data/assist/table/update',this.attrObj).then(res => {
        if(res.status === 200) {
          this.tableData = res.data.list
          this.visibleAttr = false
          this.attrObj = {}
        }
      })
    },
    onAttrCancel(){
      this.attrObj = {}
      this.visibleAttr = false
    },
    //移动
    moveClick(data) {
      this.visibleMove = true
      this.moveObj = data
      this.searchFiles(data)
    },
    nodeMoveClick(data) {
      this.moveInObj = data // 移动的父类
    },
    onMoveSuccess(){
      if(!this.moveInObj.id) return
      let obj = {
        ...this.moveObj,
        pid: this.moveInObj.id,
      }
      this.axios.post('/system/data/assist/table/move',obj).then(res => {
        // console.log('移动数据',res)
        if(res.status === 200) {
          this.$message.success('移动成功')
          this.tableData = res.data.list
          this.visibleMove = false
        }
      })
    },
    onMoveCancel(){
      this.visibleMove =false
      this.moveObj = {}
      this.moveInObj = {}
    },
    // 删除
    deleteClick(data) {
      this.$confirm('是否删除此文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.axios.post('/system/data/assist/table/delete',{id: data.id}).then(res => {
          // console.log('ressssssss',res)
          if(res.status === 200) {
            this.tableData = res.data.list
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      }).catch(() => {});
    }
  }
}
</script>

<style scoped>
.ms-aside-container {
    height: 50vh;
    min-width: 180px;
    max-width: 280px;
    padding: 0 0;
  }

  .ms-main-container {
    height: 50vh;
    border: 1px solid #E6E6E6;
    border-left: 0 solid;
  }

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

.sel_box ::v-deep .el-select-dropdown__item {
  padding: 0px;
}

.col_bottom {
  margin-bottom: 10px;
}
</style>