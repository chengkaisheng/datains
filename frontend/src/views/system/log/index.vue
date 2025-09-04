<template>
  <div class="log">
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="form-inline" label-width="80">
        <el-form-item label="操作人员">
          <el-input
            style="width: 300px;"
            :disabled="!!this.formId"
            v-model="searchForm.operName"
            placeholder="请输入操作人员"
            clearable
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item label="请求类型">
          <el-select style="width: 300px;" v-model="searchForm.requestMethod" placeholder="请选择请求类型" clearable>
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="DELETE" value="DELETE" />
            <el-option label="PUT" value="PUT" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
            style="width: 300px;"
            v-model="searchForm.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-form-item>
      </el-form>
      <div class="button-group">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>

    <el-table 
      ref="logTable"
      :data="logList" 
      style="width: 100%"
      :height="tableHeight"
      >
      <el-table-column prop="title" label="操作模块" width="260" />
      <!-- <el-table-column prop="businessType" label="业务类型" width="120" /> -->
      <!-- <el-table-column prop="requestMethod" label="请求方式" width="180">
        <template slot-scope="scope">
          {{ new Date(scope.row.commitTime).toLocaleString() }}
        </template>
      </el-table-column> -->
      <el-table-column prop="requestMethod" label="请求方式" width="150">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.requestMethod)">
            {{ getTagName(scope.row.requestMethod) }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column show-overflow-tooltip prop="operatorType" label="操作类别" /> -->
      <el-table-column show-overflow-tooltip prop="operName" label="操作人员" width="150" />
      <!-- <el-table-column show-overflow-tooltip prop="deptName" label="部门名称" width="200" /> -->
      <el-table-column show-overflow-tooltip prop="operUrl" label="请求url" width="200" />
      <el-table-column show-overflow-tooltip prop="operIp" label="操作地址" width="200" />
      <!-- <el-table-column show-overflow-tooltip prop="operLocation" label="操作地点" /> -->
      <el-table-column show-overflow-tooltip prop="operParam" label="请求参数" width="200" />
      <!-- <el-table-column show-overflow-tooltip prop="jsonResult" label="返回参数" /> -->
      <!-- <el-table-column show-overflow-tooltip prop="status" label="操作状态" /> -->
      <el-table-column show-overflow-tooltip prop="errorMsg" label="错误消息" width="200" />
      <el-table-column show-overflow-tooltip prop="operTime" label="操作时间" width="200" />
      <!-- <el-table-column show-overflow-tooltip prop="costTime" label="消耗时间" /> -->
      <!-- <el-table-column show-overflow-tooltip prop="createBy" label="创建者" /> -->
      <!-- <el-table-column show-overflow-tooltip prop="createTime" label="创建时间" /> -->
    </el-table>
    
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="goPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getLogList } from "@/api/system/log";
export default {
  name: 'LogList',
  props: {
    formId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      goPage: 1,
      pageSize: 10,
      logList: [],
      total: 0,
      tableHeight: 0,
      searchForm: {
        operName: '',
        requestMethod: '',
        timeRange: []
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    if(this.formId) {
      this.searchForm.operName = this.formId
    }
    this.getLogList()
    this.calculateTableHeight()
    window.addEventListener('resize', this.calculateTableHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateTableHeight)
  },
  methods: {
    getLogList() {
      let params = {
        operName: this.searchForm.operName,
        requestMethod: this.searchForm.requestMethod,
        params: {
          beginTime: Array.isArray(this.searchForm.timeRange) && this.searchForm.timeRange.length > 0 ? this.searchForm.timeRange[0] : '',
          endTime: Array.isArray(this.searchForm.timeRange) && this.searchForm.timeRange.length > 0 ? this.searchForm.timeRange[1] : ''
        }
      }
      getLogList(this.goPage, this.pageSize, params).then(res => {
        this.logList = res.data.listObject
        this.total = res.data.itemCount
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getLogList()
    },
    handleCurrentChange(val) {
      this.goPage = val
      this.getLogList()
    },
    handleSearch() {
      this.goPage = 1
      this.getLogList()
    },
    handleReset() {
      this.searchForm = {
        operName: this.formId ? this.formId : '',
        requestMethod: '',
        timeRange: []
      }
      this.handleSearch()
    },
    getTagType(requestMethod) {
      let type = 'info'
      switch (requestMethod) {
        case 'GET':
          type = 'success';
          break;
        case 'POST':
          type = 'warning';
          break;
        case 'DELETE':
          type = 'danger';
          break;
        case 'PUT':
          type = 'success';
          break;
      }
      return type;
    },
    getTagName(requestMethod) {
      let name = ''
      switch (requestMethod) {
        case 'GET':
          name = 'GET';
          break;
        case 'POST':
          name = 'POST';
          break;
        case 'DELETE':
          name = 'DELETE';
          break;
        case 'PUT':
          name = 'PUT';
          break;
      }
      return name;
    },
    calculateTableHeight() {
      // 获取视窗高度
      const windowHeight = window.innerHeight
      // 获取表格元素
      const table = this.$refs.logTable.$el
      // 获取表格顶部到视窗顶部的距离
      const tableTop = table.getBoundingClientRect().top
      // 分页器高度 + 分页器上下margin
      const paginationHeight = 52
      // 预留一些底部空间
      const bottomSpace = 20
      // 计算表格可用高度
      this.tableHeight = windowHeight - tableTop - paginationHeight - bottomSpace
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  // margin-bottom: 20px;
  // background-color: #fff;
  // padding: 20px;
  // border-radius: 4px;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  position: relative;
  .form-inline {
    margin-right: 120px;
  }
  .button-group {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
.log {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>