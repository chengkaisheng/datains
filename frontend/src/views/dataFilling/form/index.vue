<script>
import { filter, forEach, find, split, get, groupBy, keys, includes, cloneDeep } from 'lodash-es'
import DeContainer from '@/components/datains/DeContainer.vue'
import DeAsideContainer from '@/components/datains/DeAsideContainer.vue'
import NoSelect from './NoSelect.vue'
import ViewTable from './ViewTable.vue'
import datafill from '@/api/datafill/datafill'
import { listForm, saveForm, updateFormName, deleteForm, getWithPrivileges, uploadExcelForm, excelUploadAiHandle } from '@/views/dataFilling/form/dataFilling'
import { listForm as listFormTemplate } from '@/views/dataFilling/template/template'
// import { hasDataPermission } from '@/utils/permission'
import { hasPermission } from '../permission.js'
import DataFillingFormMoveSelector from './MoveSelector.vue'
// import DataTable from '@/views/datafill/index.vue'
import FileTree from './components/FileTree.vue'
import FileList from '@/views/datafill/FileList.vue'
import DeTree from './components/DeTree.vue'
export default {
  name: 'DataFillingForm',
  components: { DataFillingFormMoveSelector, DeAsideContainer, DeContainer, NoSelect, ViewTable, FileList, FileTree, DeTree },
  data() {
    return {
      selectedItem: undefined,
      moveDialogTitle: '',
      moveGroup: false,
      treeLoading: false,
      requiredRule: { required: true, message: this.$t('commons.required'), trigger: ['blur', 'change'] },
      activeName: 'forms',
      showFolderCreateForm: false,
      folderForm: {
        name: undefined,
        pid: '0',
        level: 0,
        nodeType: 'folder'
      },
      formList: [],
      expandedArray: [],
      updateFormData: {},
      showUpdateName: false,
      displayFormData: undefined,
      nodeData: {},
      showTemplate: false,
      templateForm: {},
      folderTreeShow: false,
      folders: [],
      templateList: [],
      selectedParent: null,
    }
  },
  computed: {
    flattenFolderList() {
      const result = []
      this.flattenFolder(this.formList, result)
      return result
    },
    isAdmin() {
      return this.$store.state.user.user.username === 'admin'
    },
    selectDatasets() {
      const result = []
      this.templateFlattenFolder(this.folders, result)
      return result
    },
    // 数据填报下的菜单
    menusList() {
      let dataFilling = this.$store.state.permission.routes.find(item => item.name === 'data-filling')
      return dataFilling ? dataFilling.children : []
    },
  },
  mounted() {
    this.treeLoading = true
    listForm({
      name: '',
      nodeType: 'folder'
    }).then(res => {
      this.formList = res.data || []

      if (this.$route.query && this.$route.query.id) {
        this.$nextTick(() => {
          if (this.$refs.formTreeRef) {
            this.$refs.formTreeRef.setCurrentKey(this.$route.query.id)
            const checkedNode = this.$refs.formTreeRef && this.$refs.formTreeRef.getNode(this.$route.query.id)
            if (checkedNode) {
              if (checkedNode.parent) {
                checkedNode.parent.expand()
              }
              this.selectedItem = find(this.flattenFolderList, f => f.id === this.$route.query.id)
              if (this.selectedItem) {
                this.nodeClick(this.selectedItem)
              }
            }
          }
        })
      }
    }).finally(() => {
      this.treeLoading = false
    })
  },
  methods: {
    hasMenuPermission(menuName) {
      return this.menusList.findIndex(menu => menu.name === menuName) !== -1
    },
    hasPermission(privileges, type) {
      return hasPermission(privileges, type)
    },
    filterListDeep(list) {
      return filter(list, item => {
        const hasChildren = item.children && item.children.length > 0
        if (item.children) {
          this.filterListDeep(item.children)
        }
        return hasChildren
      })
    },
    createFolder(folder) {
      this.folderForm.name = undefined
      this.folderForm.pid = folder.id
      if (folder.firstFolder) {
        this.folderForm.level = folder.level
      } else {
        this.folderForm.level = folder.level + 1
      }
      this.showFolderCreateForm = true
    },
    closeSaveFolder() {
      this.showFolderCreateForm = false
    },
    doSaveFolder() {
      this.$refs['mFolderForm'].validate((valid) => {
        if (valid) {
          const data = {
            name: this.folderForm.name,
            pid: this.folderForm.pid,
            level: this.folderForm.level,
            nodeType: 'folder'
          }
          saveForm(data).then(res => {
            this.closeSaveFolder()
            listForm({
              name: '',
              nodeType: 'folder'
            }).then(res => {
              this.formList = res.data || []
            })
          })
        }
      })
    },
    beforeData(type, data) {
      return {
        ...data,
        createType: type
      }
    },
    clickMore(param) {
      switch (param.optType) {
        case 'rename':
          this.openUpdateForm(param)
          break
        case 'edit':
          this.editForm(param.data)
          break
        case 'delete':
          this.delete(param.data)
          break
        case 'move':
          this.moveTo(param.data)
          break
        case 'copy':
          this.copyForm(param.data)
          break
      }
    },
    moveTo(data) {
      this.selectedItem = data
      this.moveGroup = true
      this.moveDialogTitle = this.$t('dataset.m1') + (data.name.length > 10 ? (data.name.substr(0, 10) + '...') : data.name) + this.$t('dataset.m2')
    },
    openUpdateForm(param) {
      this.updateFormData = cloneDeep(param.data)
      this.showUpdateName = true
    },
    closeUpdateForm() {
      this.showUpdateName = false
    },
    doUpdateForm() {
      this.$refs['mUpdateNameForm'].validate((valid) => {
        if (valid) {
          const data = {
            id: this.updateFormData.id,
            name: this.updateFormData.name
          }
          updateFormName(data).then(res => {
            this.closeUpdateForm()
            listForm({
              name: '',
              nodeType: 'folder'
            }).then(res => {
              this.formList = res.data || []
            })
            if (this.updateFormData.nodeType !== 'folder' && this.updateFormData.id === this.displayFormData.id) {
              getWithPrivileges(data.id).then(res => {
                this.displayFormData = res.data
              })
            }
          })
        }
      })
    },
    delete(data) {
      this.$confirm(
        this.$t('data_fill.form.confirm_delete'),
        this.$t('dataset.tips'),
        {
          confirmButtonText: this.$t('dataset.confirm'),
          cancelButtonText: this.$t('dataset.cancel'),
          type: 'warning'
        }
      ).then(() => {
        deleteForm(data.id).then((response) => {
          if (this.displayFormData && this.displayFormData.id === data.id) {
            this.displayFormData = undefined
          }
          listForm({
            name: '',
            nodeType: 'folder'
          }).then(res => {
            this.formList = res.data || []
          })
          this.nodeData = {}
          this.$refs.fileListRef.clearAll()
        })
      }).catch(() => {
      })
    },
    copyForm(data) {
      this.$router.push({ name: 'data-filling-form-create', query: { copy: data.id }})
    },
    editForm(data) {
      this.$router.push({ name: 'data-filling-form-create', query: { id: data.id }})
    },
    onMoveSuccess() {
      this.moveGroup = false
      listForm({
        name: '',
        nodeType: 'folder'
      }).then(res => {
        this.formList = res.data || []
      })
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
        this.createFolder(data)
      } else if (data.createType === 'form') {
        this.createForm(data)
      } else if (data.createType === 'excel') {
        this.createExcel(data)
      } else if (data.createType === 'excelAI') {
        this.createExcelAI(data)
      } else if (data.createType === 'template') {
        this.showTemplate = true
        this.selectedParent = data
        this.getTemplateTree(data)
      }
    },
    createForm(data) {
      const _param = {
        folder: data.id,
        level: data.level + 1
      }
      this.$router.push({ name: 'data-filling-form-create', query: _param })
    },
    createExcelAI(data) {
      // 创建一个隐藏的文件上传input
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.xlsx,.xls'
      input.style.display = 'none'
      
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        
        const formData = new FormData()
        formData.append('file', file)
        this.$message({
          message: '正在导入Excel...',
          type: 'info',
          showClose: true
        })
        
        excelUploadAiHandle(formData).then(res => {
          let file1 = new File([res], `${file.name}`, {
            type: res.type,
            lastModified: Date.now()
          });
          const formData1 = new FormData()
          formData1.append('file', file1)
          uploadExcelForm(data.id, formData1).then(res => {
            this.$message.success('Excel导入成功')
            // 刷新表单列表
            listForm({
              name: '',
              nodeType: 'folder'
            }).then(res => {
              this.formList = res.data || []
            })
            // 刷新填报列表
            this.nodeData = data
            this.$nextTick(() => {
              this.$refs.fileListRef.getDataFill()
            })
          })
        })
      }
      
      // 触发文件选择
      document.body.appendChild(input)
      input.click()
      document.body.removeChild(input)
    },
    createExcel(data) {
      console.log(data);
      // 创建一个隐藏的文件上传input
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.xlsx,.xls'
      input.style.display = 'none'
      
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        
        // 验证文件类型
        const isExcel = /\.(xlsx|xls)$/.test(file.name.toLowerCase())
        if (!isExcel) {
          this.$message.error('请上传Excel文件(.xlsx或.xls格式)')
          return
        }
        
        // 创建FormData对象上传文件
        const formData = new FormData()
        formData.append('file', file)
        
        // 调用上传API
        // this.$message.loading('正在导入Excel...')
        this.$message({
          message: '正在导入Excel...',
          type: 'info',
          showClose: true
        })
        // TODO: 替换为实际的上传API
        uploadExcelForm(data.id, formData).then(res => {
          this.$message.success('Excel导入成功')
          // 刷新表单列表
          listForm({
            name: '',
            nodeType: 'folder'
          }).then(res => {
            this.formList = res.data || []
          })
          // 刷新填报列表
          this.nodeData = data
          this.$nextTick(() => {
            this.$refs.fileListRef.getDataFill()
          })
        })
      }
      
      // 触发文件选择
      document.body.appendChild(input)
      input.click()
      document.body.removeChild(input)
    },
    templateFilterMethod() {},
    getTemplateList() {
      if(!this.templateForm.folder) return;
      const params = {
        goPage: 1,
        pageSize: 10000,
        data: {
          pid: this.templateForm.folder,
          name: '',
          nodeType: ''
        }
      }
      datafill.getAllFillTemplate(params).then((res) => {
        this.templateList = res.data.listObject || []
      })
    },
    getTemplateTree(data) {
      listFormTemplate({ nodeType: 'folder' }).then((val) => {
        this.folders = this.filterListDeep(val.data) || []
        if (this.templateForm.folder) {
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.templateForm.folder)
            this.$refs.tree.setCheckedKeys([this.templateForm.folder])
          })
        }
      })
    },
    closeTemplate() {
      this.showTemplate = false
      this.templateForm = {}
    },
    confirmTemplate() {
      this.$refs['mtemplateForm'].validate((valid) => {
        if (valid) {
          let selectedTemplate = this.templateList.find(item => item.id === this.templateForm.template)
          let params = {
            commitNewUpdate: selectedTemplate.commitNewUpdate,
            createIndex: selectedTemplate.createIndex,
            datasource: null,
            forms: selectedTemplate.forms,
            level: this.selectedParent.level,
            name: this.templateForm.formName,
            nodeType: 'form',
            pid: this.selectedParent.id,
            tableIndexes: selectedTemplate.tableIndexes,
            tableName: null,
          }
          saveForm(params).then(res => {
            this.closeTemplate()
            this.nodeData = this.selectedParent
            this.$nextTick(() => {
              this.$refs.fileListRef.getDataFill()
            })
          })
        }
      })
    },
    floderNodeClick(data) {
      this.$nextTick(() => {
        this.templateForm.folder = data.id
        this.templateForm.level = data.level + 1
        this.folderTreeShow = false
        // if (hasDataPermission('manage', data.privileges)) {
        //   this.templateForm.folder = data.id
        //   this.templateForm.level = data.level + 1
        //   this.folderTreeShow = false
        // } else {
        //   this.templateForm.folder = undefined
        //   this.templateForm.level = undefined
        // }
      })
    },
    floderFilterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    filterMethod(val) {
      if (!val) this.$refs.tree.filter(val)
      this.$refs.tree.filter(val)
    },
    templateFlattenFolder(list, result = []) {
      forEach(list, item => {
        result.push(item)
        if (item.children && item.children.length > 0) {
          this.templateFlattenFolder(item.children, result)
        }
      })
      return result
    },
    filterNode(value, data) {
      if (!value) return true
      if (this.searchType === 'folder') {
        if (
          data.label.indexOf(value) !== -1
        ) {
          this.searchPids.push(data.id)
          return true
        }
        if (this.searchPids.indexOf(data.pid) !== -1) {
          this.searchPids.push(data.id)
          return true
        }
      } else {
        return data.label.indexOf(value) !== -1
      }
      return false
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
      // 点击节点 调用接口 获取填报列表
      this.nodeData = data
      this.$nextTick(() => {
        this.$refs.fileListRef.getDataFill()
      })
    },
    tabClick() {
      if (this.activeName === 'template') {
        this.$router.push('/data-filling/template')
      } else if (this.activeName === 'log') {
        this.$router.push('/data-filling/log')
      }
    },
    flattenFolder(list, result = []) {
      forEach(list, item => {
        result.push(item)
        if (item.children && item.children.length > 0) {
          this.flattenFolder(item.children, result)
        }
      })
      return result
    },
    getTemplateFileList() {
      console.log('getTemplateFileList')
    }
  }
}
</script>

<template>
  <de-container
    v-loading="$store.getters.loadingMap[$store.getters.currentPath]"
    style="background-color: #f7f8fa"
  >
    <de-aside-container type="data-filling">
      <el-tabs
        v-model="activeName"
        class="tab-panel"
        @tab-click="tabClick"
      >

        <el-tab-pane
          name="forms"
        >
          <span slot="label">
            填报管理
          </span>

          <div
            style="padding-left: 20px;padding-right: 20px;"
            class="de-tree"
          >

            <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
              文件夹
              <el-button
                v-show="isAdmin"
                icon="el-icon-plus"
                type="text"
                @click="createFolder({id: '0', level: 0, firstFolder: true})"
              />
            </div>

            <div
              v-if="!formList.length && !treeLoading"
              class="no-tdata"
            >
              暂无数据
              <span
                v-show="isAdmin"
                class="no-tdata-new"
                @click="() => createFolder({id: '0', level: 0, firstFolder: true})"
              >{{
                $t('deDataset.create')
              }}</span>
            </div>
            <el-tree
              v-else
              ref="formTreeRef"
              :default-expanded-keys="expandedArray"
              :data="formList"
              node-key="id"
              highlight-current
              :expand-on-click-node="true"
              :filter-node-method="filterNode"
              @node-expand="nodeExpand"
              @node-collapse="nodeCollapse"
              @node-click="nodeClick"
            >
              <template slot-scope="{ node, data }">
                <span
                  class="custom-tree-node-list father"
                >
                  <span style="display: flex; flex: 1; width: 0">
                    <span v-if="data.nodeType === 'folder'">
                      <i class="el-icon-folder"></i>
                    </span>
                    <span
                      style="
                    margin-left: 6px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                      :title="data.name"
                    >{{ data.name }}</span>
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
                          <el-dropdown-item
                            v-if="hasPermission(data.privileges, 'create_folder')"
                            :command="beforeData('folder',data)"
                          >
                            <i class="el-icon-folder"></i>
                            <span style="margin-left: 5px">{{ $t('data_fill.new_folder') }}</span>
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="hasPermission(data.privileges, 'create_form')"
                            :command="beforeData('form',data)"
                          >
                            <svg-icon
                              icon-class="form"
                              class="ds-icon-scene"
                            />
                            <span>新建表单</span>
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="hasPermission(data.privileges, 'create_form')"
                            :command="beforeData('excel',data)"
                          >
                            <svg-icon
                              icon-class="form"
                              class="ds-icon-scene"
                            />
                            <span>导入表单</span>
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="hasPermission(data.privileges, 'create_form')"
                            :command="beforeData('excelAI',data)"
                          >
                            <svg-icon
                              icon-class="form"
                              class="ds-icon-scene"
                            />
                            <span>导入表单（AI）</span>
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="hasPermission(data.privileges, 'create_form')"
                            :command="beforeData('template',data)"
                          >
                            <svg-icon
                              icon-class="form"
                              class="ds-icon-scene"
                            />
                            <span>导入表单（模板库）</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>

                    <span
                      v-if="data.nodeType !== 'folder'"
                      @click.stop
                    >
                      <el-button
                        icon="el-icon-edit"
                        type="text"
                        size="small"
                        @click="editForm(data)"
                      />
                    </span>

                    <span
                      style="margin-left: 12px"
                      @click.stop
                    >
                      <el-dropdown
                        trigger="click"
                        size="small"
                        @command="clickMore"
                      >
                        <span class="el-dropdown-link">
                          <el-button
                            icon="el-icon-more"
                            type="text"
                            size="small"
                          />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            v-if="hasPermission(data.privileges, 'update_folder')"
                            icon="el-icon-edit-outline"
                            :command="beforeClickMore('rename', data, node)"
                          >
                            {{ $t('panel.rename') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="hasPermission(data.privileges, 'delete')"
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

          </div>
        </el-tab-pane>

        <el-tab-pane
          v-if="hasMenuPermission('data-filling-template')"
          name="template"
        >
          <span slot="label">
            模板库
          </span>
        </el-tab-pane>

        <el-tab-pane
          v-if="hasMenuPermission('data-filling-log')"
          name="log"
        >
          <span slot="label">
            审计日志
          </span>
        </el-tab-pane>
        
      </el-tabs>

      
    </de-aside-container>

    <el-main v-if="activeName === 'forms'" style="padding: 0">
      <div class="file-container">
        <FileList ref="fileListRef" :nodeData="nodeData" class="file-content" />
      </div>
    </el-main>


    <el-dialog
      v-dialogDrag
      append-to-body
      :title="$t('data_fill.new_folder')"
      :visible.sync="showFolderCreateForm"
      :show-close="true"
      width="600px"
      class="m-dialog"
    >
      <el-container
        v-if="showFolderCreateForm"
        style="width: 100%"
        direction="vertical"
      >
        <el-form
          ref="mFolderForm"
          class="m-form"
          :model="folderForm"
          label-position="top"
          hide-required-asterisk
          @submit.native.prevent
        >
          <el-main>
            <el-form-item
              prop="name"
              class="form-item"
              :rules="[requiredRule]"
            >
              <template #label>
                {{ $t('data_fill.form.name') }}
                <span
                  style="color: red"
                >*</span>
              </template>
              <el-input
                v-model.trim="folderForm.name"
                required
                size="small"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-main>
        </el-form>
        <el-footer class="de-footer">
          <el-button @click="closeSaveFolder">{{ $t("commons.cancel") }}</el-button>
          <el-button
            type="primary"
            @click="doSaveFolder"
          >{{ $t("commons.confirm") }}
          </el-button>
        </el-footer>
      </el-container>
    </el-dialog>

    <!-- 从模板库选择模板导入 -->
    <el-dialog
      v-dialogDrag
      append-to-body
      title="模板库导入"
      :visible.sync="showTemplate"
      :show-close="true"
      width="600px"
      class="m-dialog"
    >
      <el-container
        v-if="showTemplate"
        style="width: 100%"
        direction="vertical"
      >
        <el-form
          ref="mtemplateForm"
          class="m-form"
          :model="templateForm"
          label-position="top"
          hide-required-asterisk
          @submit.native.prevent
        >
          <el-main>
            <el-form-item
              prop="folder"
              class="form-item"
            >
              <template #label>
                选择文件夹
                <span
                  style="color: red"
                >*</span>
              </template>
              <el-popover
                v-model="folderTreeShow"
                placement="bottom-start"
                popper-class="user-popper dataset-filed"
                width="552"
                trigger="click"
              >
                <el-tree
                  ref="tree"
                  :data="folders"
                  node-key="id"
                  class="de-tree"
                  :expand-on-click-node="false"
                  highlight-current
                  :filter-node-method="floderFilterNode"
                  default-expand-all
                  @node-click="floderNodeClick"
                >
                  <span
                    slot-scope="{ data }"
                    class="custom-tree-node-dataset"
                  >
                    <span>
                      <i class="el-icon-folder"></i>
                    </span>
                    <span
                      style="
                        margin-left: 6px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      :title="data.name"
                    >{{ data.name }}</span>
                  </span>
                </el-tree>
                <el-select
                  slot="reference"
                  v-model="templateForm.folder"
                  filterable
                  popper-class="tree-select-dataset"
                  style="width: 100%"
                  :filter-method="filterMethod"
                  :placeholder="$t('commons.please_select')"
                  required
                >
                  <el-option
                    v-for="item in selectDatasets"
                    :key="item.label"
                    :label="item.label"
                    :value="item.id"
                  />
                </el-select>
              </el-popover>
            </el-form-item>

            <el-form-item
              prop="template"
              class="form-item"
              :rules="[requiredRule]"
            >
              <template #label>
                选择模板
                <span
                  style="color: red"
                >*</span>
              </template>
              <el-select
                v-model="templateForm.template"
                filterable
                style="width: 100%"
                :filter-method="templateFilterMethod"
                :placeholder="$t('commons.please_select')"
                required
                @focus="getTemplateList"
              >
                <el-option
                  v-for="item in templateList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              prop="formName"
              class="form-item"
              :rules="[requiredRule]"
            >
              <template #label>
                表单名称
                <span
                  style="color: red"
                >*</span>
              </template>
              <el-input placeholder="请输入" v-model="templateForm.formName"></el-input>
            </el-form-item>

          </el-main>
        </el-form>
        <el-footer class="de-footer">
          <el-button @click="closeTemplate">{{ $t("commons.cancel") }}</el-button>
          <el-button
            type="primary"
            @click="confirmTemplate"
          >{{ $t("commons.confirm") }}
          </el-button>
        </el-footer>
      </el-container>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      append-to-body
      :title="$t('data_fill.form.rename')"
      :visible.sync="showUpdateName"
      :show-close="true"
      width="600px"
      class="m-dialog"
    >
      <el-container
        style="width: 100%"
        direction="vertical"
      >
        <el-form
          ref="mUpdateNameForm"
          class="m-form"
          :model="updateFormData"
          label-position="top"
          hide-required-asterisk
          @submit.native.prevent
        >
          <el-main>
            <el-form-item
              prop="name"
              class="form-item"
              :rules="[requiredRule]"
            >
              <template #label>
                {{ $t('data_fill.form.name') }}
                <span
                  style="color: red"
                >*</span>
              </template>
              <el-input
                v-model.trim="updateFormData.name"
                required
                size="small"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-main>
        </el-form>
        <el-footer class="de-footer">
          <el-button @click="closeUpdateForm">{{ $t("commons.cancel") }}</el-button>
          <el-button
            type="primary"
            @click="doUpdateForm"
          >{{ $t("commons.confirm") }}
          </el-button>
        </el-footer>
      </el-container>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      :title="moveDialogTitle"
      :visible="moveGroup"
      :show-close="false"
      width="30%"
      class="dialog-css"
    >
      <data-filling-form-move-selector
        v-if="moveGroup"
        :show-selector.sync="moveGroup"
        :item.sync="selectedItem"
        @moveSuccess="onMoveSuccess"
      />
    </el-dialog>

  </de-container>
</template>

<style  lang="scss" scoped>
.ms-aside-container {
  height: calc(100vh - 56px);
  padding: 0px;
  min-width: 260px;
  max-width: 460px;
}

.tab-panel {
  height: 100%;
  overflow-y: auto;
}

.tab-panel ::v-deep .el-tabs__nav-wrap {
  padding: 0 10px;
}

.tab-panel ::v-deep .el-tabs__nav-wrap::after {
  height: 1px;
}

.tab-panel ::v-deep .el-tabs__item {
  /* width: 10px; */
  padding: 0 10px;
}

::v-deep.ms-aside-container{
  padding: 0
}
.m-dialog {
  .el-dialog__body {
    padding: 0
  }
}
.de-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end
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
  /*display: none;*/
  visibility: hidden;
}

.father:hover .child {
  /*display: inline;*/
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
.de-tree {
  .el-tree-node.is-current.is-focusable {
    &>.el-tree-node__content {
      background-color: var(--deWhiteHover, #e0eaff);
      color: var(--primary, #3370ff);
    }
  }

  .el-tree-node__content, .de-el-tree-node__content {

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
  .el-tree-node__content {
    height: 40px;
    border-radius: 4px;

    &:hover {
      background: rgba(31, 35, 41, 0.1);
    }
  }

  .de-el-tree-node__content {
    .el-button--text {
      padding: 0 !important;
    }
    .el-icon-more {
      width: 32px;
      height: 32px;
      line-height: 32px;
    }
  }
}

.file-container {
  display: flex;
  height: 100%;
  
  .file-tree {
    width: 280px;
    border-right: 1px solid #dcdfe6;
  }
  
  .file-content {
    flex: 1;
  }
}
</style>
