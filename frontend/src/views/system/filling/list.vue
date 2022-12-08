<template>
  <div>
    <div v-if="panelType === 'list'">
      <el-container>
        <el-header style="line-height: 60px;">
          <el-row>
            <el-col :span="6">
              <el-button @click="typeClick">
                <i class="el-icon-folder-add"></i>
                <span>新增分类</span>
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button @click="fillClick">
                <i class="el-icon-circle-plus-outline"></i>
                <span>新增数据填报</span>
              </el-button>
            </el-col>
            <el-col :span="6" :offset="4">
              <el-input
                v-model="searchValue"
                prefix-icon="el-icon-d-arrow-right"
                clearable
                placeholder="请输入"
              >
              <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-row>
            <el-col>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                :indent="indent"
                :tree-props="{children: 'childs'}">
                <el-table-column width="75">

                </el-table-column>
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
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
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" title="编辑"></el-button>
                    <el-button type="text" icon="el-icon-folder-add" title="新增分类"></el-button>
                    <el-button type="text" icon="el-icon-circle-plus-outline" title="新增数据填报"></el-button>
                    <el-button type="text" icon="el-icon-s-grid" ></el-button>
                  </template>
                </el-table-column> -->
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
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="6" class="bor_box">
              aaa
            </el-col>
            <el-col :span="10" class="bor_box">
              bbb
            </el-col>
            <el-col :span="8" class="bor_box">
              ccc
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div v-if="panelType === 'manage'">

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

export default {
  components: {LayoutContent},
  data() {
    return {
      panelType: 'list',
      searchValue: '',
      formData: {
        typeName: '',
      },
      tableData: [{
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹1',
        type: 'group',
        children: [],
      }, {
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹2',
        type: 'group',
        children: [],
      }, {
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹3',
        type: 'group',
        children: [],
      }, {
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹4',
        type: 'group',
        children: [],
      }, {
        updateTime: '2016-05-03',
        updateBy: '王小虎',
        createdBy: '王小虎',
        name: '填报文件夹5',
        type: 'group',
        children: [],
      }],
      indent: 16,
      visibleType: false,
      rules:{
        typeName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  mounted() {

  },
  methods: {
    searchList() {
      console.log(this.searchValue)
    },
    handleSelectionChange(val) {

    },
    typeClick() {
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
    fillClick() {
      this.panelType = 'add'
    },
    goback() {
      this.panelType = 'list'
    }
  }
}
</script>

<style scoped>
/deep/ .main_panel .el-main {
  padding: 0px;
}
.bor_box {
  border: 1px solid #cccccc;
  min-height: 500px;
}
</style>