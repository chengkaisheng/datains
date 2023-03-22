<template>
  <div>
    <el-header style="height: 50px;line-height: 50px;">
      <el-row>
        <el-col :span="4">
          <el-button icon="el-icon-d-arrow-left" circle @click="goback"></el-button>
          <span style="padding-left: 10px;">数据管理</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-form :model="searchForm" label-width="70px">
          <el-col :span="4">
            <el-form-item label="提交人">
              <el-select v-model="searchForm.submitBy" clearable size="small" style="width: 100%;">
                <el-option v-for="item of submitList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="修改人">
              <el-select v-model="searchForm.updateBy" clearable size="small" style="width: 100%;">
                <el-option v-for="item of updateList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提交时间">
              <el-date-picker
                style="width: 98%;"
                v-model="searchForm.submitTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="修改时间">
              <el-date-picker
                style="width: 98%;"
                v-model="searchForm.updateTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: center;">
            <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
            <el-button size="samll" @click="reset">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col style="text-align:right;">
          <el-button type="primary" size="small" @click="addPeson" >新增表单</el-button>
          <el-button size="small" @click="importClick">批量导入</el-button>
          <el-button size="small" @click="exportClick">批量导出</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-table
          border
          stripe
          height="60vh"
          :data="personData"
        >
          <el-table-column v-for="(item,index) of tableProps" :key="index"
           :label="item.name" :prop="item.value" show-overflow-tooltip width="120">
          </el-table-column>
          <el-table-column label="提交人" prop="submitBy" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="修改人" prop="updateBy" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="提交时间" prop="submitTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="修改时间" prop="updateTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" title="编辑" @click="revise(scope.row)"></el-button>
              <el-button type="text" icon="el-icon-delete" title="删除" @click="deleteClick(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-dialog
        title="物理表名称"
        :visible.sync="visibleAdd"
        :close-on-click-modal='false'
        width="40%"
        :before-close="onCancel"
      >
        <div>
          <el-row v-for="(item,index) of formEleData" :key="index">
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'text'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-input v-model="addForm[item.tableFieldName]" 
                  size="small" :placeholder="item.placeholder" :readonly="item.status ==='onlyread'">
                </el-input>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'area'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-input type="textarea" v-model="addForm[item.tableFieldName]"
                  :placeholder="item.placeholder"
                  :autosize="{ minRows: 2, maxRows: 4}">
                </el-input>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'select'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-select v-model="addForm[item.tableFieldName]" style="width: 100%;" clearable :placeholder="item.placeholder">
                  <el-option v-for="(obj,ind) of item.optionData" :key="ind" 
                    :label="obj.optionValue" :value="obj.relationId">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'label'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-select v-model="addForm[item.tableFieldName]" style="width: 100%;" clearable :placeholder="item.placeholder">
                  <el-option v-for="(obj,ind) of item.labelData" :key="ind" 
                    :label="obj.labelValue" :value="obj.labelValue">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'number'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-input-number v-model="addForm[item.tableFieldName]" :placeholder="item.placeholder"
                  :min="item.minValue" :max="item.maxValue" :step="item.stepValue"
                ></el-input-number>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'time'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-date-picker
                  :type="item.formatType"
                  v-model="addForm[item.tableFieldName]"
                  :placeholder="item.placeholder"
                  :value-format="item.formatValue"
                ></el-date-picker>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'radio'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-radio-group v-model="addForm[item.tableFieldName]">
                  <el-radio v-for="(val,ind) of item.radioData" :key="ind" :label="val"></el-radio>
                </el-radio-group>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'checkbox'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-checkbox-group v-model="addForm[item.tableFieldName]">
                  <el-checkbox v-for="(val,ind) of item.checkBoxData" :key="ind" :label="val"></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;" v-if="item.addType === 'cascader'">
              <el-col :span="4" v-if="item.showTitle">{{item.titleValue}}</el-col>
              <el-col :span="item.showTitle? 20 : 24">
                <el-cascader :options="cascaderData" v-model="addForm[item.tableFieldName]" :placeholder="item.placeholder"></el-cascader>
              </el-col>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onSuccess">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="批量导入数据"
        :visible.sync="visibleImp"
        :close-on-click-modal="false"
        width="40%"
        :before-close="onImpCancel"
      >
        <div>
          <el-row>
            <el-col>
              <el-col :span="8" class="ask_box" style="text-align:right; padding-right: 10px;">上传文件要求：</el-col>
              <el-col :span="16" class="ask_box">
                <div>1、表头不能为空</div>
                <div>2、请使用chrome浏览器上传文件</div>
                <div>3、仅支持（*.xls和*.xlsx）文件</div>
                <div>4、文件大小不能超过50MB，行不能超过50万行，列不能超过100列</div>
              </el-col>
            </el-col>
            <el-col>
              <el-col :span="8" class="ask_box" style="text-align: right;padding-right: 10px;">下载Excel模板：</el-col>
              <el-col :span="16">
                <el-button type="text" size="mini" @click="downloadModel">模板.xlsx<i class="el-icon-download"></i></el-button>
              </el-col>
            </el-col>
          </el-row>
          <div style="margin-top: 10px;">
            <el-upload
              class="upload-demo"
              drag
              action="#"
              :limit="1"
              :auto-upload="false"
              :show-file-list="isShowList"
              accept=".xls,.xlsx"
              :file-list="fileList"
              :on-change="upLoadExcel"
              :http-request="requestExcel">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <span>将文件拖到此处，或<em>点击上传</em></span>
                <div class="ask_box">上传文件大小限制50MB以内</div>
              </div>
            </el-upload>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onImpCancel">取 消</el-button>
          <el-button type="primary" @click="onImpSuccess">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="导出"
        :visible.sync="visibleExp"
        :close-on-click-modal="false"
        width="40%"
        :before-close="onExpCancel"
      > 
        <div>
          <el-row>
            <el-form :model="expForm" :rules="expRules" ref="expForm" label-width="120px">
              <el-col>
                <el-form-item label="导出名称：" prop="expName">
                  <el-input v-model="expForm.expName" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <el-form-item label="导出内容" prop="expStatus">
                  <el-radio-group v-model="expForm.expStatus" >
                    <el-radio label="all">全部数据</el-radio>
                    <el-radio label="search">查询条件和显示字段过滤后的数据</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onExpCancel('expForm')">取 消</el-button>
          <el-button type="primary" @click="onExpSuccess('expForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import { export_json_to_excel } from '@/plugins/Export2Excel'
import xlsx from 'xlsx'

export default {
  name: 'dataManage',
  props: {
    targetData: {
      type: Object,
    }
  },
  data(){
    return {
      searchForm: {
        submitBy: '',
        updateBy: '',
        submitTime: [],
        updateTime: [],
      },
      tableProps: [], // 表格pro
      formEleData: [], // 表单的格式
      personData: [],

      submitList: [],
      updateList: [],

      visibleAdd: false,
      status: '',
      addForm: {},
      oldForm: {},
      provinceList: [
        "北京",
        "上海",
        "天津",
        "重庆",
        "辽宁",
        "吉林",
        "黑龙江",
        "河北",
        "山西",
        "陕西",
        "甘肃",
        "青海",
        "山东",
        "安徽",
        "江苏",
        "浙江",
        "河南",
        "湖北",
        "湖南",
        "江西",
        "台湾",
        "福建",
        "云南",
        "海南",
        "四川",
        "贵州",
        "广东",
        "香港",
        "澳门",
        "内蒙古",
        "新疆",
        "广西",
        "西藏",
        "宁夏",
      ],
      visibleImp: false,
      isShowList: false,
      fileList: [],
      visibleExp: false,
      expForm: {
        expName: '',
        expStatus: '',
      },
      expRules: {
        expName: [
          { required: true, message: '请输入导出名称', trigger: 'blur' },
        ],
        expStatus: [
          { required: true, message: '请选择导出内容', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    console.log('数据===>',this.targetData)
    this.initData()
  },
  mounted() {
    this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
    this.initSearch()
  },
  methods: {
    initData() {
      let form = JSON.parse(JSON.stringify(this.targetData.checkObjs))
      for(let i=0;i<form.length;i++) {
        if(form[i].tableFieldName !== '') {
          if(form[i].defaultValue && form[i].defaultValue !== '') {
            this.oldForm[form[i].tableFieldName] = form[i].defaultValue
          } else {
            this.oldForm[form[i].tableFieldName] = ''
          }
        }
      }
      this.formEleData = form
      console.log('新增表单',this.oldForm,this.formEleData)


      let list = JSON.parse(JSON.stringify(this.targetData.checkObjs))
      let arr2 = []
      for(let i=0;i<list.length;i++) {
        let obj = {
          name: list[i].titleValue,
          value: list[i].tableFieldName
        }
        arr2.push(obj)
      }
      this.tableProps = arr2
      console.log('表格props：',this.tableProps)
    },
    initSearch() {
      let arr1 = []
      let arr2 = []
      this.personData.forEach(item => {
        if(item.submitBy !== '' && arr1.indexOf(item.submitBy) === -1) {
          arr1.push(item.submitBy)
        }
        if(item.updateBy !== '' && arr2.indexOf(item.updateBy) === -1) {
          arr2.push(item.updateBy)
        }
      })
      this.submitList = arr1
      this.updateList = arr2
    },
    goback() {
      this.$emit('goback')
    },
    search() {
      console.log('查询',this.searchForm)
      let data = JSON.parse(JSON.stringify(this.personData))
      let arr = []
      for(let i=0;i<data.length;i++) {
        if(
          (this.searchForm.submitBy !== '' && data[i].submitBy === this.searchForm.submitBy)
          || (this.searchForm.updateBy !== '' && data[i].updateBy === this.searchForm.updateBy)
          || this.filterDate(data[i].submitTime, this.searchForm.submitTime)
          || this.filterDate(data[i].updateTime, this.searchForm.updateTime)
        ) {
          arr.push(data[i])
        }
      }
      console.log('arrrr',arr)
      if(this.searchForm.submitBy === '' 
        && this.searchForm.updateBy === '' 
        && this.searchForm.submitTime.length === 0 
        && this.searchForm.updateTime.length === 0
      ) {
        this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
      } else {
        this.personData = arr
      }
      
    },
    filterDate(time,data) {
      if(time !== '' && data.length) {
        if(new Date(time).getTime() > new Date(data[0]).getTime() && 
          new Date(time).getTime() < new Date(data[1]).getTime()
        ){
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    reset() {
      this.searchForm = {
        submitBy: '',
        updateBy: '',
        submitTime: [],
        updateTime: [],
      }
      this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
    },
    // 新增
    addPeson() {
      this.visibleAdd = true
      this.status = '新增'
      this.addForm = JSON.parse(JSON.stringify(this.oldForm))
    },
    onSuccess(){
      console.log('提交',this.addForm)
      if(this.status === '新增') {
        let obj = {
          ...this.addForm,
          submitBy: this.$store.getters.name,
          submitTime: this.dateFormat(new Date()),
          updateBy: '',
          updateTime: '',
        }
        this.targetData.updateBy = this.$store.getters.name
        this.targetData.updateTime = this.dateFormat(new Date())
        this.targetData.dataManage.personData.push(obj)
        console.log('新增obj',obj)
        this.axios.post('/system/data/fill/table/update',this.targetData).then(res => {
          this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
          this.onCancel()
        })
      } else if (this.status === '编辑') {
        let obj = {
          ...this.addForm,
          // submitBy: this.addForm.submitBy,
          // submitTime: this.addForm.submitTime,
          updateBy: this.$store.getters.name,
          updateTime: this.dateFormat(new Date()),
          province: this.addForm.province
        }
        console.log('修改obj',obj)
        let data = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
        for(let i=0;i<data.length;i++) {
          if(data[i].sid === obj.sid) {
            data[i] = obj
          }
        }
        this.targetData.dataManage.personData = JSON.parse(JSON.stringify(data))
        this.targetData.updateBy = this.$store.getters.name
        this.targetData.updateTime = this.dateFormat(new Date())
        this.axios.post('/system/data/fill/table/update',this.targetData).then(res => {
          this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
          this.onCancel()
        })
      }
    },
    dateFormat(date) {
      let time = new Date(date)
      let year = time.getFullYear()
      let mon = time.getMonth()+1<10? '0'+ time.getMonth() : time.getMonth()
      let day = time.getDate()<10? '0'+ time.getDate() : time.getDate()
      let h = time.getHours()<10? '0' + time.getHours() : time.getHours()
      let m = time.getMinutes()<10? '0' + time.getMinutes() : time.getMinutes()
      let s = time.getSeconds()<10? '0' + time.getSeconds() : time.getSeconds()

      return year +'-'+ mon +'-'+ day + ' '+ h +':'+ m +':'+ s
    },
    onCancel() {
      this.visibleAdd = false
      this.addForm = JSON.parse(JSON.stringify(this.oldForm))
    },
    // 导入点击
    importClick() {
      this.visibleImp = true
    },
    // 导入
    upLoadExcel(file,fileList) {
      //文件上传前做判断
      console.log('file',file,fileList)
      let types = ['xlsx','xls']
      let filetype = file.raw.name.substring(file.raw.name.lastIndexOf('.')+1)
      if(types.indexOf(filetype) === -1) {
        this.$message.error('仅支持（.xls和.xlsx）文件格式')
        this.isShowList = false
        return
      }
      if(file.raw.size > 1024*1024*50) {
        this.$message.error('文件大小不能超过50MB')
        this.isShowList = false
        return
      }
      this.isShowList = true;
      this.fileList = fileList
      console.log('上传数据列表',this.fileList)
    },
    // 自定义
    requestExcel(file) {
      console.log('file1111',file)
    },
    // 下载模板 
    downloadModel() {
      let arr1 = JSON.parse(JSON.stringify(this.tableProps)).map(item => item.name)
      let arr2 = JSON.parse(JSON.stringify(this.tableProps)).map(item => item.value)
      const excelHeader = [...arr1,'提交人','修改人','提交时间','修改时间']
      const excelHeaderKeys = [...arr2,'submitBy','updateBy','submitTime','updateTime']
      const excelData = []
      const excelName = '模板'
      export_json_to_excel(excelHeader, excelData, excelName)
    },
    async onImpSuccess() {
      console.log(this.fileList)
      if(!this.fileList.length) {
        this.$message.info('请上传文件')
        return
      }
      // 读取文件不是立马能够读取到的，所以是异步的，使用Promise
      let dataBinary = await new Promise((resolve) => {
        // Web API构造函数FileReader，可实例化对象，去调用其身上方法，去读取解析文件信息
        let reader = new FileReader();
        reader.readAsBinaryString(this.fileList[0].raw); //读取raw的file文件
        reader.onload = (ev) => {
          resolve(ev.target.result); // 将解析好的结果扔出去，用于使用
        }
      });
      // console.log("读取出的流文件", dataBinary);

      // 使用 xlsx插件解析读取好的二进制excel流文件
      let workBook = xlsx.read(dataBinary, {type: 'binary', cellDates: true});
      // excel 有很多的sheet，这里取第一个sheet 
      let firstWorkSheet = workBook.Sheets[workBook.SheetNames[0]];
      // 分为 第一行的数据， 和第一行以下的数据
      const header = this.getHeaderRow(firstWorkSheet)
      console.log("读取的excel表头数据（第一行）", header);
      const data = xlsx.utils.sheet_to_json(firstWorkSheet);
      console.log("读取所有excel数据", data);

      let arr = []
      for(let i=0;i<data.length;i++) {
        let a = data[i]
        let obj = {}
        for(let k in a) {
          this.tableProps.map(item => {
            if(item.name === k) {
              obj[item.value] = a[k]
            }
          })

          if(k === '提交人') {
            obj.submitBy = a[k]
          }
          if(k === '修改人') {
            obj.updateBy = a[k]
          }
          if(k === '提交时间') {
            obj.submitTime = a[k]
          }
          if(k === '修改时间') {
            obj.updateTime = a[k]
          }
        }
        arr.push(obj)
      }
      console.log('处理后数据',arr)
      this.targetData.updateBy = this.$store.getters.name
      this.targetData.updateTime = this.dateFormat(new Date())
      this.targetData.dataManage.personData.push(...arr)
      this.axios.post('/system/data/fill/table/update',this.targetData).then(res => {
        this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
        this.visibleImp = false
        this.isShowList = false
        this.fileList = []
      })
    },
    getHeaderRow(sheet) {
      const headers = []; 
      const range = xlsx.utils.decode_range(sheet["!ref"]); //读取sheet的单元格
      let C;
      const R = range.s.r;
      // 从第一行开始
      for(C = range.s.c; C <=range.e.c; ++C) {
        // 行走范围内的每一列
        const cell = sheet[xlsx.utils.encode_cell({c: C, r: R})];
        // 查找第一行中的单元格
        let hdr = 'UNKNOWN' + C;  // 替换为所需的默认值
        if(cell && cell.t) hdr = xlsx.utils.format_cell(cell);
        headers.push(hdr)
      }

      return headers
    },
    onImpCancel() {
      this.visibleImp = false
      this.isShowList = false
      this.fileList = []
    },
    // 导出点击
    exportClick() {
      this.visibleExp = true
    },
    onExpSuccess(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          console.log('expform',this.expForm)
          let arr1 = JSON.parse(JSON.stringify(this.tableProps)).map(item => item.name)
          let arr2 = JSON.parse(JSON.stringify(this.tableProps)).map(item => item.value)
          const excelHeader = [...arr1,'提交人','修改人','提交时间','修改时间']
          const excelHeaderKeys = [...arr2,'submitBy','updateBy','submitTime','updateTime']
          const excelData = JSON.parse(JSON.stringify(this.personData)).map(item => excelHeaderKeys.map(i => item[i]))
          const excelName = this.expForm.expName
          export_json_to_excel(excelHeader, excelData, excelName)
          this.onExpCancel(formName)
        } else {
          return false
        }
      });
    },
    onExpCancel(formName){
      this.$refs[formName].resetFields();
      this.visibleExp = false
      this.expForm = {
        expName: '',
        expStatus: '',
      }
    },
    // 编辑
    revise(data) {
      this.addForm = data
      this.status = '编辑'
      this.visibleAdd = true
    },
    // 删除
    deleteClick(data) {
      console.log('delete',data)
      this.$confirm('是否删除这条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        let a = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
        if(a.length) {
          for(let i=0;i<a.length;i++) {
            if(a[i].sid === data.sid) {
              a.splice(i,1)
            }
          }
        }
        console.log('aaaaa',a)
        this.targetData.dataManage.personData = JSON.parse(JSON.stringify(a))
        this.targetData.updateBy = this.$store.getters.name
        this.targetData.updateTime = this.dateFormat(new Date())
        this.axios.post('/system/data/fill/table/update',this.targetData).then(res => {
          this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
        })
      }).catch(()=>{})
    },

  }
}
</script>
<style scoped>
.upload-demo {
  text-align: center;
}
.ask_box {
  font-size: 10px;
  color: #837e7e;

}
</style>