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
        <el-col style="text-align: right;">
          <el-button type="primary" size="small" @click="addPeson">新增表单</el-button>
          <el-button size="small">批量导入</el-button>
          <el-button size="small">批量导出</el-button>
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
    </el-main>
  </div>
</template>
<script>
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
      ]
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
    // 编辑
    revise(data) {
      this.addForm = data
      this.status = '编辑'
      this.visibleAdd = true
    },
    // 删除
    deleteClick(data) {
      console.log('delete',data)
    }
  }
}
</script>
<style scoped>

</style>