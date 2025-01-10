<template>
  <el-col>
    <el-row style="margin-top: 10px">
      <complex-table
        :data="data"
        :hideColumns="true"
        :pagination-config="paginationConfig"
        @search="search"
        style="overflow: auto;"
        :style="{height: height}"
      >
        <template #toolbar>
          <el-button icon="el-icon-circle-plus-outline" @click="create(undefined)">
            {{ $t('commons.add') }}
          </el-button>
        </template>
        <el-table-column
          prop="authTargetType"
          :label="$t('dataset.row_permission.type')"
        >
          <template v-slot:default="scope">
            <span v-if="scope.row.authTargetType === 'dept'">{{ $t('auth.dept') }}</span>
            <span v-if="scope.row.authTargetType === 'role'">{{ $t('auth.role') }}</span>
            <span v-if="scope.row.authTargetType === 'user'">{{ $t('auth.user') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="authTargetName"
          :label="$t('dataset.row_permission.name')"
        />
        <fu-table-operations
          :buttons="buttons"
          :label="$t('commons.operating')"
          fix
        />

      </complex-table>
    </el-row>
    <el-dialog
      v-dialogDrag
      class="dialog-css"
      :title="update_column_permission_dialog_title"
      :visible.sync="update_column_permission"
      :show-close="false"
      width="50%"
      append-to-body
    >
      <el-row style="padding: 0 20px">
        <el-col>
          <el-form
            ref="columnPermissionForm"
            :form="columnPermissionForm"
            :model="columnPermissionForm"
            label-width="60px"
            :rules="rule"
            inline
          >
            <el-form-item>
              <el-switch
                active-color="#13ce66"
                inactive-color="#ff4949"
                :inactive-text="$t('dataset.column_permission.disable')"
                :active-text="$t('dataset.column_permission.enable')"
                v-model="columnPermissionForm.permissions.enable"
              />
            </el-form-item>
            <el-form-item
              :label="$t('dataset.row_permission.type')"
              prop="authTargetType"
            >
              <el-select
                class="select-item"
                size="mini"
                @change="onTypeChange"
                v-model="columnPermissionForm.authTargetType"
              >
                <el-option :label="$t('auth.dept')" value="dept" />
                <el-option :label="$t('auth.role')" value="role" />
                <el-option :label="$t('auth.user')" value="user" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('commons.name')" prop="authTargetId">
              <el-select
                class="select-item"
                size="mini"
                v-model="columnPermissionForm.authTargetId"
              >
                <el-option 
                  v-if="columnPermissionForm.authTargetType === 'dept'"
                  :value="selectValue" :label="selectLabel"
                  hidden
                  >
                </el-option>
                <el-tree
                  v-if="columnPermissionForm.authTargetType === 'dept'"
                  :data="targetObjs"
                  :props="defaultProps"
                  highlight-current
                  node-key="id"
                  @node-click="handleNodeClick"
                >
                  <span slot-scope="{ node, data }">
                    <span :class="data.auth ? '' : 'custom-node-label'">{{ node.label }}</span>
                  </span>
                </el-tree>
                <el-option
                  v-else
                  v-for="item in targetObjs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col>
          <el-table
            ref="multipleTable"
            class="my_table"
            :data="columnPermissionForm.permissions.columns"
            max-height="300"
            height="300"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" />
            <el-table-column
              prop="name"
              :label="$t('dataset.field_name')"
              
            />
            <el-table-column :label="$t('commons.operating')">
              <template v-slot:default="scope">
                <el-radio
                  :disabled="!scope.row.selected"
                  label="Prohibit"
                  v-model="scope.row.opt"
                >
                  {{ $t("dataset.column_permission.prohibit") }}
                </el-radio>
                <el-radio
                  :disabled="!scope.row.selected"
                  label="Desensitization"
                  v-model="scope.row.opt"
                >
                  {{ $t("dataset.column_permission.desensitization") }}
                </el-radio>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="dialog-footer" slot="footer">
        <el-button size="mini" @click="closeDialog">{{
          $t("dataset.cancel")
        }}</el-button>
        <el-button type="primary" size="mini" @click="save">{{
          $t("dataset.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import ComplexTable from '@/components/business/complex-table'
import { formatQuickCondition, formatOrders, formatCondition } from '@/utils/index.js'
import { execute } from '@/api/system/dynamic'

export default {
  name: "ColumnPermissions",
  components: {
    ComplexTable
  },
  props: {
    param: {
      type: Object,
      default: null,
    },
    obj: {
      type: Object,
      default: function _default() {},
    },
  },
  data() {
    return {
      height: '',
      columns: [],
      buttons: [
        {
          label: this.$t("commons.edit"),
          icon: "el-icon-edit",
          type: "primary",
          click: this.create,
          disabled: this.disableEdit,
        },
        {
          label: this.$t("commons.delete"),
          icon: "el-icon-delete",
          type: "danger",
          click: this.deletePermission,
          disabled: this.disableDelete,
        },
      ],
      searchConfig: {
        useQuickSearch: true,
        useComplexSearch: true,
        quickPlaceholder: this.$t(
          "dataset.row_permission.search_by_filed_name"
        ),
        components: [
          {
            field: "dataset_table_field.name",
            label: this.$t("panel.column_name"),
            component: "DeComplexInput",
          },
          {
            field: "dataset_row_permissions.auth_target_type",
            label: this.$t("dataset.row_permission.auth_type"),
            component: "FuComplexSelect",
            options: [
              { label: this.$t("auth.dept"), value: "dept" },
              {
                label: this.$t("auth.role"),
                value: "role",
              },
              { label: this.$t("auth.user"), value: "user" },
            ],
          },
        ],
      },
      last_condition: null,
      orderConditions: [],
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      data: [],
      update_column_permission: false,
      update_column_permission_dialog_title: "",
      defaultForm: {
        authTargetId: null,
        authTargetType: null,
        datasetId: "",
        permissions: {
          enable: true,
          columns: [],
        },
      },
      columnPermissionForm: {
        authTargetId: null,
        authTargetType: null,
        datasetId: "",
        permissions: {
          enable: true,
          columns: [],
        },
      },
      targetObjs: [],
      filedList: [],
      depts: null,
      loadingRowPermission: false,
      fieldOptions: [],
      item: {},
      rule: {
        authTargetType: [
          {
            required: true,
            message: this.$t("dataset.row_permission.please_select_auth_type"),
            trigger: "blur",
          },
        ],
        authTargetId: [
          {
            required: true,
            message: this.$t("dataset.row_permission.please_select_auth_id"),
            trigger: "blur",
          },
        ],
        datasetFieldId: [
          {
            required: true,
            message: this.$t("dataset.row_permission.please_select_field"),
            trigger: "blur",
          },
        ],
      },
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      selectValue: '',
      selectLabel: '',
    };
  },

  computed: {},
  created() {
    this.defaultForm.datasetId = this.obj.id;
    this.initFieldLists();
    this.search(this.last_condition);
  },
  mounted() {
    this.height = document.getElementById('viewTable').clientHeight - 125 + 'px';
  },
  mounted() {
    console.log('this.$refs.permissionsRef', this.$refs.permissionsRef);
    
  },
  beforeDestroy: function beforeDestroy() {},

  methods: {
    handleNodeClick(node) {
      if(!node.auth) return;
      this.selectValue = node.id;
      this.selectLabel = node.name;
      this.rowPermissionForm.authTargetId = node.id;
    },
    executeAxios(url, type, data, callBack) {
      var param = {
        url: url,
        type: type,
        data: data,
        callBack: callBack,
      };
      execute(param)
      .then(res => {
        if (param.callBack) {
          param.callBack(res)
        }
      }).catch(e => {
        if (param.callBack) {
          param.callBack(e)
        }
      })
    },
    initFieldLists() {
      var _this = this;

      this.executeAxios(
        "dataset/field/listForPermissionSeting/" + this.obj.id,
        "post",
        {},
        function (response) {
          _this.filedList = response.data;
        }
      );
    },
    select(selection) {},
    currentChange() {
      this.search();
    },
    sizeChange() {
      this.currentPage = 1;
      this.search();
    },
    search(condition) {
      var _this2 = this;

      var showLoading =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : true;

      this.last_condition = condition;
      condition = formatQuickCondition(condition, "dataset_table_field.name");
      var temp = formatCondition(condition);
      var param = temp || {};
      param["orders"] = formatOrders(this.orderConditions);
      var _paginationConfig = this.paginationConfig,
        currentPage = _paginationConfig.currentPage,
        pageSize = _paginationConfig.pageSize;

      this.executeAxios(
        "plugin/dataset/columnPermissions/pageList/" +
          this.obj.id +
          "/" +
          currentPage +
          "/" +
          pageSize,
        "post",
        param,
        function (response) {
          _this2.data = response.data.listObject;
          _this2.data.forEach(function (item) {
            item.permissions = JSON.parse(item.permissions);
            _this2.permissionInfo(item);
          });
          _this2.paginationConfig.total = response.data.itemCount;
        }
      );
    },
    permissionInfo(item) {
      var params = {
        authTargetId: item.authTargetId,
        authTargetType: item.authTargetType,
      };
      this.executeAxios(
        "/plugin/dataset/columnPermissions/permissionInfo",
        "post",
        params,
        function (response) {
          item.authTargetName = response.data.authTargetName;
        }
      );
    },
    create(permissionObj) {
      var _this3 = this;

      if (!permissionObj) {
        this.targetObjs = [];
        // this.columnPermissionForm = JSON.parse(
        //   JSON.stringify(
        //     this.defaultForm
        //   )
        // );
        this.columnPermissionForm = JSON.parse(
          JSON.stringify(
            this.defaultForm
          )
        );
        this.filedList.forEach(function (filed) {
          _this3.columnPermissionForm.permissions.columns.push({
            id: filed.id,
            name: filed.name,
            opt: "Prohibit",
          });
        });
        this.update_column_permission_dialog_title = this.$t(
          "dataset.column_permission.add"
        );
      } else {
        this.update_column_permission_dialog_title = this.$t(
          "dataset.column_permission.edit"
        );
        // this.columnPermissionForm =
        //   __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(
        //     {},
        //     JSON.parse(
        //       JSON.stringify(
        //         permissionObj
        //       )
        //     )
        //   );
        this.columnPermissionForm = Object.assign({}, JSON.parse(JSON.stringify(permissionObj)))
        var columnsPermissions = this.columnPermissionForm.permissions.columns;
        this.columnPermissionForm.permissions.columns = [];
        var rows = [];
        for (var i = 0; i < this.filedList.length; i++) {
          var item = {
            id: this.filedList[i].id,
            name: this.filedList[i].name,
            opt: "Prohibit",
          };
          for (var j = 0; j < columnsPermissions.length; j++) {
            if (item.id === columnsPermissions[j].id) {
              item.selected = columnsPermissions[j].selected;
              item.opt = columnsPermissions[j].opt;
              if (item.selected) {
                rows.push(item);
              }
            }
          }
          this.columnPermissionForm.permissions.columns.push(item);
        }
        this.toggleSelection(rows);
        this.fetchTypeList();
      }
      this.$nextTick(() => {
        this.update_column_permission = true;
      })
    },
    toggleSelection(rows) {
      var _this4 = this;

      if (rows) {
        rows.forEach(function (row) {
          _this4.$nextTick(function () {
            _this4.$refs.multipleTable.toggleRowSelection(row);
          });
        });
      }
    },
    onTypeChange() {
      this.fetchTypeList();
      this.columnPermissionForm.authTargetId = "";
    },
    fetchTypeList() {
      var _this5 = this;

      this.targetObjs = [];
      var params = {
        authTargetId: this.columnPermissionForm.authTargetId,
        authTargetType: this.columnPermissionForm.authTargetType,
        datasetId: this.columnPermissionForm.datasetId,
      };
      this.executeAxios(
        "plugin/dataset/columnPermissions/authObjs",
        "post",
        params,
        function (res) {
          _this5.targetObjs = res.data;
        }
      );
    },
    closeDialog() {
      this.update_column_permission = false;
      this.resetTaskForm();
    },
    resetTaskForm() {
      this.columnPermissionForm = JSON.parse(
        JSON.stringify(
          this.defaultForm
        )
      );
    },
    deletePermission(item) {
      var _this6 = this;

      this.$confirm(
        this.$t("dataset.confirm_delete"),
        this.$t("dataset.tips"),
        {
          confirmButtonText: this.$t("dataset.confirm"),
          cancelButtonText: this.$t("dataset.cancel"),
          type: "warning",
        }
      ).then(function () {
        _this6.executeAxios(
          "/plugin/dataset/columnPermissions/delete/" + item.id,
          "post",
          {},
          function (res) {
            _this6.$message({
              message: _this6.$t("dataset.delete_success"),
              type: "success",
              showClose: true,
            });
            _this6.search(_this6.last_condition, true);
          }
        );
      });
    },
    save() {
      var _this7 = this;

      this.$refs.columnPermissionForm.validate(function (valid) {
        if (valid) {
          var params = JSON.parse(
            JSON.stringify(
              _this7.columnPermissionForm
            )
          );
          params.permissions =
            JSON.stringify(
              params.permissions
            );
          _this7.executeAxios(
            "/plugin/dataset/columnPermissions/save",
            "post",
            params,
            function (res) {
              if (res.success) {
                _this7.$message({
                  message: _this7.$t("dataset.save_success"),
                  type: "success",
                  showClose: true,
                });
                _this7.update_column_permission = false;
                _this7.resetTaskForm();
                _this7.search(_this7.last_condition, true);
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    handleSelectionChange(items) {
      var selectedId = [];
      items.forEach(function (item) {
        item.selected = true;
        selectedId.push(item.id);
      });
      this.columnPermissionForm.permissions.columns.forEach(function (filed) {
        if (selectedId.indexOf(filed.id) < 0) {
          filed.selected = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.dialog-css {
  /* your styles */
}
</style>
