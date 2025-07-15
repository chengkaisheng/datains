<template>
  <div class="log">
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="form-inline">
        <el-form-item label="关键词">
          <el-input
            style="width: 300px;"
            :disabled="!!this.formId"
            v-model="searchForm.keyword"
            placeholder="请输入表单编号、操作人、操作描述"
            clearable
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select style="width: 300px;" v-model="searchForm.operate" placeholder="请选择操作类型" clearable>
            <el-option label="新增" value="INSERT" />
            <el-option label="更新" value="UPDATE" />
            <el-option label="删除" value="DELETE" />
            <el-option label="下载" value="DOWNLOAD" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
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
      <el-table-column prop="formId" label="表单编号" width="300" />
      <el-table-column prop="commitBy" label="操作人" width="120" />
      <el-table-column prop="commitTime" label="操作时间" width="180">
        <template slot-scope="scope">
          {{ new Date(scope.row.commitTime).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作类型" width="100">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.operate)">
            {{ getTagName(scope.row.operate) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="description" label="操作描述" />
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
import { getLogList } from './dataFilling'
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
        keyword: '',
        operate: '',
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
      this.searchForm.keyword = this.formId
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
        keyword: this.searchForm.keyword,
        operate: this.searchForm.operate,
        beginTime: this.searchForm.timeRange ? new Date(this.searchForm.timeRange[0]).getTime() : '',
        endTime: this.searchForm.timeRange ? new Date(this.searchForm.timeRange[1]).getTime() : ''
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
        keyword: this.formId ? this.formId : '',
        operate: '',
        timeRange: []
      }
      this.handleSearch()
    },
    getTagType(operate) {
      let type = 'info'
      switch (operate) {
        case 'INSERT':
          type = 'success';
          break;
        case 'UPDATE':
          type = 'warning';
          break;
        case 'DELETE':
          type = 'danger';
          break;
        case 'DOWNLOAD':
          type = 'success';
          break;
      }
      return type;
    },
    getTagName(operate) {
      let name = ''
      switch (operate) {
        case 'INSERT':
          name = '新增';
          break;
        case 'UPDATE':
          name = '更新';
          break;
        case 'DELETE':
          name = '删除';
          break;
        case 'DOWNLOAD':
          name = '下载';
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