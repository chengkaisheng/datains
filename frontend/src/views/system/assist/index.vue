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
          <span>自助取数</span>
          <span style="float: right;">
            <el-button @click="goback">取消</el-button>
            <el-button type="primary" @click="submit">保存</el-button>
          </span>
        </el-header>
        <el-main>
          <el-row type="flex">
            <el-col :span="assistData.assistMuster?18:24" class="bor_box min_hg">
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
                    <el-option :value="addFileList" style="height: 100%;max-height: 200px;overflow-y: auto;padding: 0;background-color: #ffffff;">
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
                <el-col :span="4">自助取数名称</el-col>
                <el-col :span="8">
                  <el-input v-model="assistData.name" placeholder="请输入"></el-input>
                </el-col>
              </el-row>
              <el-row class="col_bottom">
                <el-col :span="4">数据集</el-col>
                <el-col :span="8">
                  <el-select ref="dataRef" v-model="assistData.assistMuster" 
                    placeholder="请选择" style="width: 100%;">
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
              <el-row class="bor_box" style="height:350px;">
                <!-- <de-container>
                  <de-main-container>
                    <dataset-table-data :table="table" />
                  </de-main-container>
                </de-container> -->
                <div id="table_normal" style="width: 100%;height: 100%;overflow: hidden;" ></div>
              </el-row>
            </el-col>
            <el-col :span="assistData.assistMuster?6:0" class="bor_box min_hg">
              <assist-chart v-if="assistData.assistMuster&&table.id && chartView && isShowChart" ref="chartEditRef" :edit-from="'panel'" :chart="chartView" :type-title="typeTitle" :table-data="table" :param="chartEditParam"></assist-chart>
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
import DeContainer from '@/components/datains/DeContainer'
import DeMainContainer from '@/components/datains/DeMainContainer'
import DatasetTableData from '@/views/dataset/common/DatasetTableData'
import { getTable } from '@/api/dataset/dataset'
import assistChart from '@/views/system/assist/assistChart'
import { mapState } from 'vuex'
import bus from '@/utils/bus'
import {
  post,
} from '@/api/chart/chart'

import {
  DEFAULT_COLOR_CASE,
  DEFAULT_LABEL,
  DEFAULT_LEGEND_STYLE,
  DEFAULT_SIZE,
  DEFAULT_TITLE_STYLE,
  DEFAULT_TOOLTIP,
  DEFAULT_XAXIS_STYLE,
  DEFAULT_YAXIS_STYLE,
  DEFAULT_YAXIS_EXT_STYLE,
  DEFAULT_SPLIT,
  DEFAULT_FUNCTION_CFG,
  DEFAULT_THRESHOLD,
  DEFAULT_TOTAL
} from '@/views/chart/chart/chart'

import { baseTableNormal } from '@/views/chart/chart/table/table-info'

export default {
  name: '',
  components: {LayoutContent,selectTree,DatasetTableData,DeContainer,DeMainContainer,assistChart},
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
      tableList: {},

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
        assistTid: '',
        assistMuster: '',
        assistArea: '',
        assistYear: '',
        assistTime: [],
        viewInfo: {},
      },
      chartView: {
        render: 'antv',
        type: 'table-normal'
      },
      antVRenderStatus: false,
      isShowChart: true,
      myChart: null
    }
  },
  computed: {
    ...mapState([
      'fillNumber'
    ]),
    chartEditParam() {
      if (this.chartView) {
        if (this.chartView.type === 'table-normal') {
          return { 'data': this.chartView, 'optType': 'edit' }
        }else {
          return {}
        }
      }
      return this.chartView ? { 'data': this.chartView, 'optType': 'edit' } : {}
    },
  },
  mounted() {
    this.addId = this.fillNumber
    this.init()
    this.bindEvent()
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
    bindEvent() {
      bus.$on('view-in-chart', (param) => {
        this.getDataEdit(param)
      })
    },
    getDataEdit(param) {
      const data = JSON.parse(JSON.stringify(param))
      if(param.type === 'propData') {
        this.chartView.xaxis = param.viewInfo.xaxis
        this.chartView.yaxis = param.viewInfo.yaxis
        // console.log('param',this.chartView)
      } else if(param.type === 'propStyle') {
        this.chartView.customAttr = param.viewInfo.customAttr
        this.chartView.customStyle = param.viewInfo.customStyle
        this.chartView.senior = param.viewInfo.senior
        this.chartView.title = param.viewInfo.title
        this.chartView.name = param.viewInfo.title
        // console.log('propStyle',this.chartView)
      }
      this.viewData(data.viewInfo)
    },
    viewData(viewInfo) {
      // console.log('数据变动',viewInfo,this.tableList)
      let field = this.tableList.fields.map(item => {return {...item}})
      let data = this.tableList.data.map(item => {return {...item}})
      let xaxis = JSON.parse(viewInfo.xaxis).map(item => item.datainsName)
      let yaxis = JSON.parse(viewInfo.yaxis).map(item => item.datainsName)
      let f = xaxis.concat(yaxis)
      console.log('111',field,data,f)
      let arr1 = []
      let arr2 = []
      if(f.length) {
        field.map(item => {
          if(f.indexOf(item.datainsName) !== -1) {
            arr1.push(item)
          }
        })
        for(let i=0;i<data.length;i++) {
          let obj = {}
          for(let k in data[i]) {
            if(f.indexOf(k) !== -1) {
              obj[k] = data[i][k]
            }
          }
          arr2.push(obj)
        }
      }
      // console.log('处理后',arr1,arr2)
      this.chartView.data = {
        fields: arr1,
        tableRow: arr2,
      }
      console.log('chartView:::',this.chartView)
      this.antVRenderStatus = true
      if(this.chartView.type === 'table-normal') {
        this.myChart = baseTableNormal(this.myChart, 'table_normal', this.chartView, null, arr2,'')
      } else {
        if (this.myChart) {
          this.antVRenderStatus = false
          this.myChart.destroy()
        }
      }
      // console.log('myChart',this.myChart)
      if (this.myChart) {
        this.myChart.options.animation = false
      }
      if (this.myChart && this.antVRenderStatus) {
        // console.log('this.antVRenderStatus', this.antVRenderStatus)
        this.myChart.render()
      }
      // 
    },
    getTable(table) {
      // this.table = table
      console.log('这个有触发吗？',table)
      // this.selObj.setvalue = table.label
      this.assistData.assistMuster = table.label
      this.assistData.assistTid = table.id
      if(this.myChart) {
        this.myChart.destroy()
      }
      table && table.id && getTable(table.id).then(response => {
        this.table = response.data
        console.log('这个数据',this.table)
        this.$refs.dataRef.blur()
        this.isShowChart = false
        setTimeout(()=>{
          this.isShowChart = true
        })
        this.createView()
        this.getTableData()
        // this.$emit('getTable', this.table)
      }).catch(res => {
        this.table = {}
      })
    },
    getTableData() {
      if (this.table.id) {
        post('/dataset/table/getPreviewData/1/100', this.table, false,30000).then(res => {
          console.log('res11',res)
          this.tableList = res.data
        })
      }
    },
    createView() {
        this.chartView.name = this.assistData.name
        this.chartView.title = this.assistData.name
        this.chartView.id = this.typeTitle === '新增'?this.addId : this.assistData.id
        this.chartView.tableId = this.table.id
        this.chartView.type = 'table-normal'
        this.chartView.isPlugin = false
        this.chartView.render = 'antv'
        this.chartView.resultMode = 'custom'
        this.chartView.resultCount = 1000
        this.chartView.customAttr = JSON.stringify({
          color: DEFAULT_COLOR_CASE,
          tableColor: DEFAULT_COLOR_CASE,
          size: DEFAULT_SIZE,
          label: DEFAULT_LABEL,
          tooltip: DEFAULT_TOOLTIP,
          totalCfg: DEFAULT_TOTAL
        })
        this.chartView.customStyle = JSON.stringify({
          text: DEFAULT_TITLE_STYLE,
          legend: DEFAULT_LEGEND_STYLE,
          xAxis: DEFAULT_XAXIS_STYLE,
          yAxis: DEFAULT_YAXIS_STYLE,
          yAxisExt: DEFAULT_YAXIS_EXT_STYLE,
          split: DEFAULT_SPLIT
        })
        this.chartView.senior = JSON.stringify({
          functionCfg: DEFAULT_FUNCTION_CFG,
          assistLine: [],
          threshold: DEFAULT_THRESHOLD
        })
        this.chartView.stylePriority = 'view' // 默认样式优先级视图
        this.chartView.xaxis = JSON.stringify([])
        this.chartView.xaxisExt = JSON.stringify([])
        this.chartView.yaxis = JSON.stringify([])
        this.chartView.yaxisExt = JSON.stringify([])
        this.chartView.extStack = JSON.stringify([])
        this.chartView.customFilter = JSON.stringify([])
        this.chartView.drillFields = JSON.stringify([])
        this.chartView.extBubble = JSON.stringify([])
        this.chartView.data = {}
        console.log('数据',this.chartView)
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
      } else if (data.type === 2) {
        this.assistData = data
        this.panelType = 'add'
        this.table.id = data.assistTid
        this.chartView = data.chartView
        this.getTableData()
        setTimeout(() => {
          this.viewData(data.chartView)
        },100)
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
        assistTid: '',
        assistMuster: '',
        assistArea: '',
        assistYear: '',
        assistTime: [],
      }
      this.table = {}
      this.chartView = {}
    },
    submit() {
      console.log('保存',this.assistData,this.table,this.chartView)
      if(!this.assistData.assistMuster && !this.assistData.pid) return
      if(this.typeTitle === '新增') {
        let obj = {
          id: this.addId,
          pid: this.assistData.pid,
          name: this.assistData.name,
          assistMuster: this.assistData.assistMuster,
          assistTid: this.assistData.assistTid,
          createdBy: this.$store.getters.name,
          createdTime: this.dateFormat(new Date()),
          updateBy: '',
          updateTime: '',
          type: 2,
          ownerList: [], // 所有者
          describe: '',
          chartView: this.chartView
        }
        this.axios.post('/system/data/assist/table/add',obj).then(res => {
          if(res.status === 200) {
            this.$message.success('新增成功')
            this.tableData = res.data.list
            this.addId += 1
            this.$store.commit('setFillNumber',this.addId)
            this.goback()
          }
        })
      } else if(this.typeTitle === '修改') {
        let obj = {
          id: this.assistData.id,
          pid: this.assistData.pid,
          name: this.assistData.name,
          assistMuster: this.assistData.assistMuster,
          assistTid: this.assistData.assistTid,
          createdBy: this.assistData.createdBy,
          createdTime: this.assistData.createdTime,
          updateBy: this.$store.getters.name,
          updateTime: this.dateFormat(new Date()),
          type: 2,
          ownerList: this.assistData.ownerList, // 所有者
          describe: this.assistData.describe,
          chartView: this.chartView
        }

        this.axios.post('/system/data/assist/table/update',obj).then(res => {
          if(res.status === 200) {
            this.$message.success('修改成功')
            this.tableData = res.data.list
            this.goback()
          }
        })
      }
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
  height: 52vh;
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

/* .sel_box ::v-deep .el-select-dropdown__item {
  padding: 0px;
} */

.col_bottom {
  margin-bottom: 10px;
}
</style>