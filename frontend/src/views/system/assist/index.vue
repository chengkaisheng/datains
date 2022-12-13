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
      }
    }
  },
  mounted() {

  },
  methods: {
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
  min-height: 500px;
}
</style>