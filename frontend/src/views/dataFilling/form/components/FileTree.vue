<template>
  <div class="de-tree" style="padding-left: 20px; padding-right: 20px;">
    <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
        文件夹
      <el-button
        icon="el-icon-plus"
        type="text"
        @click="handleCreateFolder()"
      />
    </div>

    <div
      v-if="!treeData.length && !loading"
      class="no-tdata"
    >
      暂无数据
      <span
        class="no-tdata-new"
        @click="() => handleCreateFolder()"
      >
        {{ $t('deDataset.create') }}
      </span>
    </div>

    <el-tree
      v-else
      ref="fileTreeRef"
      :default-expanded-keys="expandedArray"
      :data="treeData"
      node-key="id"
      highlight-current
      :expand-on-click-node="true"
      :filter-node-method="filterNode"
      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      @node-click="nodeClick"
    >
      <template slot-scope="{ node, data }">
        <span class="custom-tree-node-list father">
          <span style="display: flex; flex: 1; width: 0">
            <span v-if="data.nodeType === 'folder'">
              <svg-icon icon-class="scene" />
            </span>
            <span v-else>
              <svg-icon icon-class="form" />
            </span>
            <span
              style="margin-left: 6px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
              :title="data.name"
            >
              {{ data.name }}
            </span>
          </span>

          <span
            class="child"
            @click.stop
          >
            <template v-if="data.nodeType === 'folder'">
              <el-dropdown
                trigger="click"
                size="small"
                @command="clickTreeAddBtn"
              >
                <span class="el-dropdown-link">
                  <el-button
                    icon="el-icon-plus"
                    type="text"
                    size="small"
                  />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="beforeData('folder',data)">
                    <svg-icon icon-class="scene" />
                    <span style="margin-left: 5px">{{ $t('data_fill.new_folder') }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>

            <span style="margin-left: 12px" @click.stop>
              <el-dropdown trigger="click" size="small" @command="clickMore">
                <span class="el-dropdown-link">
                  <el-button
                    icon="el-icon-more"
                    type="text"
                    size="small"
                  />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-edit-outline"
                    :command="beforeClickMore('rename', data, node)"
                  >
                    {{ $t('panel.rename') }}
                  </el-dropdown-item>
                  <!-- <el-dropdown-item
                    icon="el-icon-right"
                    :command="beforeClickMore('move', data, node)"
                  >
                    {{ $t('dataset.move_to') }}
                  </el-dropdown-item> -->
                  <el-dropdown-item
                    icon="el-icon-delete"
                    :command="beforeClickMore('delete', data, node)"
                  >
                    {{ $t('panel.delete') }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </span>
      </template>
    </el-tree>

    <!-- 添加新建文件夹弹窗 -->
    <el-dialog
      :title="dialogType === 'create' ? '新建文件夹' : '编辑文件夹'"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form
        :model="folderForm"
        :rules="rules"
        ref="folderForm"
        label-width="100px">
        <el-form-item label="文件夹名称" prop="name">
          <el-input v-model="folderForm.name" placeholder="请输入文件夹名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="folderForm.description"
            :rows="3"
            placeholder="请输入描述信息">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import datafill from '@/api/datafill/datafill'
export default {
  name: 'FileTree',
  data() {
    return {
      treeData: [],
      loading: false,
      expandedArray: [],
      rules: {
        name: [
          { required: true, message: '请输入文件夹名称', trigger: 'blur' }
        ]
      },
      dialogType: 'create',
      editingId: null,
      dialogVisible: false,
      folderForm: {
        pid: 0,
        name: '',
        description: '',
      },
    }
  },
  mounted() {
    this.getTreeData()
  },
  methods: {
    getTreeData() {
      datafill.getDataFillTree().then(res => {
        this.treeData = res.data || []
      })
    },
    beforeData(type, data) {
      return {
        ...data,
        createType: type
      }
    },
    beforeClickMore(optType, data, node) {
      return {
        type: data.nodeType,
        data: data,
        node: node,
        optType: optType
      }
    },
    clickTreeAddBtn(data) {
      if (data.createType === 'folder') {
        this.handleCreateFolder(data)
      }
    },
    clickMore(param) {
      switch (param.optType) {
        case 'rename':
          this.handleEdit(param.data)
          break
        case 'delete':
          this.handleDelete(param.data)
          break
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.toLowerCase().includes(value.toLowerCase())
    },
    nodeExpand(data) {
      if (data.id) {
        this.expandedArray.push(data.id)
      }
    },
    nodeCollapse(data) {
      if (data.id) {
        this.expandedArray.splice(this.expandedArray.indexOf(data.id), 1)
      }
    },
    nodeClick(data, node) {
      console.log(data);
      console.log(node);
      this.$emit('getFileList', data)
    },
    handleCreateFolder(data) {
      this.dialogType = 'create'
      this.editingId = null
      this.dialogVisible = true
      this.folderForm = {
        pid: data ? data.id : '0',
        name: '',
        description: '',
      }
    },
    handleEdit(row) {
      this.dialogType = 'edit'
      this.editingId = row.id
      this.dialogVisible = true
      this.folderForm = {
        pid: row.pid,
        name: row.name,
        description: row.description,
      }
    },
    submitForm() {
      this.$refs.folderForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'create') {
            datafill.addDataFill({
              nodeType: 'folder',
              ...this.folderForm
            }).then(res => {
              this.getTreeData()
              this.$message({
                type: 'success',
                message: '创建成功！'
              })
            })
          } else {
            datafill.updateDataFill({
              id: this.editingId,
              nodeType: 'folder',
              ...this.folderForm
            }).then(res => {
              this.getTreeData()
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
            })
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        datafill.deleteDataFill(row.id).then(res => {
          this.getTreeData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.de-tree {
  .el-tree-node.is-current.is-focusable {
    &>.el-tree-node__content {
      background-color: var(--deWhiteHover, #e0eaff);
      color: var(--primary, #3370ff);
    }
  }

  .el-tree-node__content {
    height: 40px;
    border-radius: 4px;

    &:hover {
      background: rgba(31, 35, 41, 0.1);
    }

    .el-icon-more,
    .el-icon-plus {
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      color: #646a73;
      cursor: pointer;
    }

    .el-icon-more:hover,
    .el-icon-plus:hover {
      background: rgba(31, 35, 41, 0.1);
      border-radius: 4px;
    }

    .el-icon-more:active,
    .el-icon-plus:active {
      background: rgba(31, 35, 41, 0.2);
      border-radius: 4px;
    }
  }
}

.custom-tree-node-list {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 8px;
}

.father .child {
  visibility: hidden;
}

.father:hover .child {
  visibility: visible;
}

.no-tdata {
  text-align: center;
  margin-top: 80px;
  font-family: AlibabaPuHuiTi;
  font-size: 14px;
  color: var(--deTextSecondary, #646a73);
  font-weight: 400;

  .no-tdata-new {
    cursor: pointer;
    color: var(--primary, #3370ff);
  }
}
</style> 