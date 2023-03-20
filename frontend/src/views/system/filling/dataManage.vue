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
          <el-table-column label="姓名" prop="sname" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="学号" prop="sid" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="班级" prop="sclass" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="年龄" prop="sage" show-overflow-tooltip width="120"></el-table-column>
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
          <el-row>
            <el-col style="margin-bottom: 10px;">
              <el-col :span="4">姓名：</el-col>
              <el-col :span="20">
                <el-input v-model="addForm.sname" size="small" placeholder="请输入"></el-input>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;">
              <el-col :span="4">年龄：</el-col>
              <el-col :span="20">
                <el-input-number v-model="addForm.sage" size="small" placeholder="请输入"></el-input-number>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;">
              <el-col :span="4">学号</el-col>
              <el-col :span="20">
                <el-input v-model="addForm.sid" size="small" placeholder="请输入"></el-input>
              </el-col>
            </el-col>
            <el-col style="margin-bottom: 10px;">
              <el-col :span="4">班级</el-col>
              <el-col :span="20">
                <el-input v-model="addForm.sclass" size="small" placeholder="请输入"></el-input>
              </el-col>
            </el-col>
            <el-col>
              <el-col :span="4">所在省份：</el-col>
              <el-col :span="20">
                <el-radio-group v-model="addForm.province">
                  <el-radio v-for="item of provinceList" :key="item" :label="item"></el-radio>
                </el-radio-group>
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
                <el-button type="text" size="mini" @click="downloadModel">模板.xls<i class="el-icon-download"></i></el-button>
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
      personData: [],
      submitList: [],
      updateList: [],

      visibleAdd: false,
      status: '',
      addForm: {
        sname: '',
        sage: null,
        sid: '',
        sclass: '',
        province: '',
      },
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
    this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
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
    },
    onSuccess(){
      console.log('提交',this.addForm)
      if(this.status === '新增') {
        let obj = {
          sname: this.addForm.sname,
          sid: this.addForm.sid,
          sage: this.addForm.sage,
          sclass: this.addForm.sclass,
          submitBy: this.$store.getters.name,
          submitTime: this.dateFormat(new Date()),
          updateBy: '',
          updateTime: '',
          province: this.addForm.province
        }
        this.targetData.updateBy = this.$store.getters.name
        this.targetData.updateTime = this.dateFormat(new Date())
        this.targetData.dataManage.personData.push(obj)
        this.axios.post('/system/data/fill/table/update',this.targetData).then(res => {
          this.personData = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
          this.onCancel()
        })
      } else if (this.status === '编辑') {
        let obj = {
          sname: this.addForm.sname,
          sid: this.addForm.sid,
          sage: this.addForm.sage,
          sclass: this.addForm.sclass,
          submitBy: this.addForm.submitBy,
          submitTime: this.addForm.submitTime,
          updateBy: this.$store.getters.name,
          updateTime: this.dateFormat(new Date()),
          province: this.addForm.province
        }
        let data = JSON.parse(JSON.stringify(this.targetData.dataManage.personData))
        for(let i=0;i<data.length;i++) {
          if(data[i].sid === obj.sid) {
            data[i] = obj
          }
        }
        console.log('修改后',data)
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
      this.addForm = {
        sname: '',
        sage: null,
        sid: '',
        sclass: '',
        province: '',
      }
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
      const excelHeader = ['姓名','学号','班级','年龄','提交人','修改人','提交时间','修改时间','省份']
      const excelHeaderKeys = ['sname','sid','sclass','sage','submitBy','updateBy','submitTime','updateTime','province']
      const excelData = []
      const excelName = '模板'
      export_json_to_excel(excelHeader, excelData, excelName)
    },
    onImpSuccess() {

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

          const excelHeader = ['姓名','学号','班级','年龄','提交人','修改人','提交时间','修改时间','省份']
          const excelHeaderKeys = ['sname','sid','sclass','sage','submitBy','updateBy','submitTime','updateTime','province']
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