<template>
  <el-col>
    <el-row style="margin-top: 10px">
      <complex-table
        :data="data"
        :columns="columns"
        local-key="rowPermission"
        :search-config="searchConfig"
        :pagination-config="paginationConfig"
        @select="select"
        @search="search"
        style="overflow: auto;"
        :style="{height: height}"
      >
        <template v-slot:toolbar>
          <el-button
            icon="el-icon-circle-plus-outline"
            @click="create(undefined)"
          >
            {{ $t("commons.add") }}
          </el-button>
        </template>
        <el-table-column
          prop="authTargetType"
          :label="$t('dataset.row_permission.type')"
        >
          <template v-slot:default="scope">
            <span v-if="scope.row.authTargetType === 'dept'">{{
              $t("auth.dept")
            }}</span>
            <span v-if="scope.row.authTargetType === 'role'">{{
              $t("auth.role")
            }}</span>
            <span v-if="scope.row.authTargetType === 'user'">{{
              $t("auth.user")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="authTargetName"
          :label="$t('dataset.row_permission.name')"
        />
        <el-table-column prop="fieldName" :label="$t('dataset.field_name')" />
        <el-table-column
          prop="filterDTO"
          :label="$t('dataset.row_permission.value')"
        >
          <template v-slot:default="scope">
            <el-table
              style="width: 100%"
              :data="scope.row.filterDTO"
              :show-header="false"
            >
              <el-table-column prop="term" width="100">
                <template v-slot:default="scope">
                  <span v-if="scope.row.term === 'eq'">{{
                    $t("chart.filter_eq")
                  }}</span>
                  <span v-if="scope.row.term === 'not_eq'">{{
                    $t("chart.filter_not_eq")
                  }}</span>
                  <span v-if="scope.row.term === 'lt'">{{
                    $t("chart.filter_lt")
                  }}</span>
                  <span v-if="scope.row.term === 'gt'">{{
                    $t("chart.filter_gt")
                  }}</span>
                  <span v-if="scope.row.term === 'le'">{{
                    $t("chart.filter_le")
                  }}</span>
                  <span v-if="scope.row.term === 'ge'">{{
                    $t("chart.filter_ge")
                  }}</span>
                  <span v-if="scope.row.term === 'enum'">{{
                    $t("chart.enum_exp")
                  }}</span>
                  <span v-if="scope.row.term === 'like'">{{
                    $t("chart.filter_include")
                  }}</span>
                  <span v-if="scope.row.term === 'not like'">{{
                    $t("chart.filter_not_include")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="value" :show-overflow-tooltip="true" />
            </el-table>
          </template>
        </el-table-column>
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
      :title="update_row_permission_dialog_title"
      :visible.sync="update_row_permission"
      :show-close="false"
      width="50%"
      append-to-body
    >
      <el-col>
        <el-form
          ref="rowPermissionForm"
          :form="rowPermissionForm"
          :model="rowPermissionForm"
          label-width="100px"
          :rules="rule"
        >
          <el-form-item
            :label="$t('dataset.row_permission.type')"
            prop="authTargetType"
          >
            <el-select
              @change="onTypeChange"
              v-model="rowPermissionForm.authTargetType"
            >
              <el-option :label="$t('auth.dept')" value="dept" />
              <el-option :label="$t('auth.role')" value="role" />
              <el-option :label="$t('auth.user')" value="user" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('commons.name')" prop="authTargetId">
            <el-select v-model="rowPermissionForm.authTargetId">
              <el-option 
                v-if="rowPermissionForm.authTargetType === 'dept'"
                :value="selectValue" :label="selectLabel"
                hidden
                >
              </el-option>
              <el-tree
                v-if="rowPermissionForm.authTargetType === 'dept'"
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
          <el-form-item :label="$t('dataset.field_name')" prop="datasetFieldId">
            <el-select
              @change="onFieldChange"
              v-model="rowPermissionForm.datasetFieldId"
            >
              <el-option
                v-for="item in filedList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-col
              v-loading="loadingRowPermission"
              element-loading-spinner="el-icon-loading"
            >
              <div v-if="item.deType === 0 || item.deType === 5">
                <el-radio-group
                  style="margin-bottom: 10px"
                  size="mini"
                  @change="initEnumOptions"
                  v-model="rowPermissionForm.filterType"
                >
                  <el-radio label="logic">{{ $t("chart.logic_exp") }}</el-radio>
                  <el-radio label="enum">{{ $t("chart.enum_exp") }}</el-radio>
                </el-radio-group>
              </div>
              <div
                v-if="
                  ((item.deType === 0 || item.deType === 5) &&
                    rowPermissionForm.filterType === 'logic') ||
                  item.deType === 1 ||
                  item.deType === 2 ||
                  item.deType === 3
                "
              >
                <div style="display: inline-block">
                  <el-button
                    style="margin-bottom: 10px"
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    @click="addFilter"
                  />
                  <el-radio-group
                    v-show="
                      rowPermissionForm.filter &&
                      rowPermissionForm.filter.length > 1
                    "
                    style="margin-left: 10px"
                    size="mini"
                    v-model="rowPermissionForm.logic"
                  >
                    <el-radio-button label="and">{{
                      $t("chart.and")
                    }}</el-radio-button>
                    <el-radio-button label="or">{{
                      $t("chart.or")
                    }}</el-radio-button>
                  </el-radio-group>
                </div>
                <div style="max-height: 50vh; overflow-y: auto">
                  <el-row
                    v-for="(f, index) in rowPermissionForm.filter"
                    :key="index"
                    class="filter-item"
                  >
                    <el-col :span="8">
                      <el-select size="mini" v-model="f.term">
                        <el-option-group
                          v-for="(group, idx) in options"
                          :key="idx"
                          :label="group.label"
                        >
                          <el-option
                            v-for="opt in group.options"
                            :key="opt.value"
                            :label="opt.label"
                            :value="opt.value"
                          />
                        </el-option-group>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-input
                        v-show="
                          !f.term.includes('null') && !f.term.includes('empty')
                        "
                        class="value-item"
                        :placeholder="$t('chart.condition')"
                        size="mini"
                        clearable
                        v-model="f.value"
                      />
                    </el-col>
                    <el-col :span="6">
                      <el-button
                        style="float: right"
                        type="text"
                        icon="el-icon-delete"
                        circle
                        @click="removeFilter(index)"
                      />
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div
                v-if="
                  (item.deType === 0 || item.deType === 5) &&
                  rowPermissionForm.filterType === 'enum'
                "
              >
                <div style="display: flex;">
                  <span style="margin-right: 10px">{{
                    $t("chart.filter_exp")
                  }}</span>
                  <!-- 数据量过大，修改为输入 -->
                  <el-input
                    style="width: 200px;"
                    size="mini"
                    placeholder="请输入"
                    v-model="inputVal"
                    @keyup.enter.native="handleEnter"
                  ></el-input>
                </div>
                <div class="enumCheckFieldList">
                  <div
                    class="enumCheckFieldListItem"
                    v-for="item in rowPermissionForm.enumCheckField"
                    :key="item"
                  >{{ item }}<i @click="deleteEnumCheckField(item)" style="margin-left: 5px;cursor: pointer;" class="el-icon-close"></i></div>
                </div>
                <!-- <el-select
                  filterable
                  collapse-tags
                  multiple
                  :placeholder="$t('chart.pls_slc')"
                  size="mini"
                  v-model="rowPermissionForm.enumCheckField"
                >
                  <el-option
                    v-for="field in fieldOptions"
                    :key="field.id"
                    :label="field.text"
                    :value="field.id"
                  />
                </el-select> -->
              </div>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
      <div slot="footer" class="dialog-footer">
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
import ComplexTable from "@/components/business/complex-table";
import {
  formatQuickCondition,
  formatOrders,
  formatCondition,
} from "@/utils/index.js";
import { execute } from "@/api/system/dynamic";

export default {
  name: "RowPermissions",
  components: {
    ComplexTable,
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
          click: this.deleteRowPermission,
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
              { label: this.$t("auth.role"), value: "role" },
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
      update_row_permission: false,
      update_row_permission_dialog_title: "",
      defaultForm: {
        authTargetId: null,
        authTargetType: null,
        datasetFieldId: null,
        filterType: "logic",
        enumCheckField: [],
        datasetId: "",
        logic: "and",
        filter: [{ term: "eq", value: "" }],
      },
      rowPermissionForm: {},
      targetObjs: [],
      filedList: [],
      depts: null,
      textOptions: [
        {
          label: "",
          options: [
            {
              value: "eq",
              label: this.$t("chart.filter_eq"),
            },
            {
              value: "not_eq",
              label: this.$t("chart.filter_not_eq"),
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "like",
              label: this.$t("chart.filter_like"),
            },
            {
              value: "not like",
              label: this.$t("chart.filter_not_like"),
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "null",
              label: this.$t("chart.filter_null"),
            },
            {
              value: "not_null",
              label: this.$t("chart.filter_not_null"),
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "empty",
              label: this.$t("chart.filter_empty"),
            },
            {
              value: "not_empty",
              label: this.$t("chart.filter_not_empty"),
            },
          ],
        },
      ],
      dateOptions: [
        {
          label: "",
          options: [
            {
              value: "eq",
              label: this.$t("chart.filter_eq"),
            },
            {
              value: "not_eq",
              label: this.$t("chart.filter_not_eq"),
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "lt",
              label: this.$t("chart.filter_lt"),
            },
            {
              value: "gt",
              label: this.$t("chart.filter_gt"),
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "le",
              label: this.$t("chart.filter_le"),
            },
            {
              value: "ge",
              label: this.$t("chart.filter_ge"),
            },
          ],
        },
      ],
      valueOptions: [
        {
          label: "",
          options: [
            {
              value: "eq",
              label: this.$t("chart.filter_eq"),
            },
            {
              value: "not_eq",
              label: this.$t("chart.filter_not_eq"),
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "lt",
              label: this.$t("chart.filter_lt"),
            },
            {
              value: "gt",
              label: this.$t("chart.filter_gt"),
            },
          ],
        },
        {
          label: "",
          options: [
            {
              value: "le",
              label: this.$t("chart.filter_le"),
            },
            {
              value: "ge",
              label: this.$t("chart.filter_ge"),
            },
          ],
        },
      ],
      options: [
        {
          label: "",
          options: [
            {
              value: "eq",
              label: this.$t("chart.filter_eq"),
            },
            {
              value: "not_eq",
              label: this.$t("chart.filter_not_eq"),
            },
          ],
        },
      ],
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
      inputVal: undefined,
    };
  },

  computed: {},
  created: function created() {
    this.defaultForm.datasetId = this.obj.id;
    this.initFieldLists();
    this.search(this.last_condition);
  },
  mounted() {
    this.height = document.getElementById('viewTable').clientHeight - 125 + 'px';
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
        .then((res) => {
          if (param.callBack) {
            param.callBack(res);
          }
        })
        .catch((e) => {
          if (param.callBack) {
            param.callBack(e);
          }
        });
    },
    initFieldLists: function initFieldLists() {
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
    select: function select(selection) {},
    search: function search(condition) {
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
        "plugin/dataset/rowPermissions/pageList/" +
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
            console.log(item);
            item.filter = JSON.parse(item.filter);
            if (item.filterType === "enum") {
              item.filterDTO = [];
              item.filterDTO.push({ term: "enum", value: item.enumCheckField });
            } else {
              item.filterDTO = item.filter;
            }
            _this2.dataSetRowPermissionInfo(item);
            if (item.enumCheckField.length > 0) {
              item.enumCheckField = item.enumCheckField.split(",");
            } else {
              item.enumCheckField = [];
            }
          });
          _this2.paginationConfig.total = response.data.itemCount;
        }
      );
    },
    dataSetRowPermissionInfo: function dataSetRowPermissionInfo(item) {
      var params = {
        authTargetId: item.authTargetId,
        authTargetType: item.authTargetType,
      };
      this.executeAxios(
        "/plugin/dataset/rowPermissions/dataSetRowPermissionInfo",
        "post",
        params,
        function (response) {
          item.authTargetName = response.data.authTargetName;
        }
      );
    },
    create: function create(rowPermissionObj) {
      var _this3 = this;

      if (!rowPermissionObj) {
        this.targetObjs = [];
        this.rowPermissionForm = JSON.parse(JSON.stringify(this.defaultForm));
        this.update_row_permission_dialog_title = this.$t(
          "dataset.row_permission.add"
        );
      } else {
        this.rowPermissionForm = Object.assign(
          {},
          JSON.parse(JSON.stringify(rowPermissionObj))
        );
        this.update_row_permission_dialog_title = this.$t(
          "dataset.row_permission.edit"
        );
        this.filedList.forEach(function (filed) {
          if (filed.id === _this3.rowPermissionForm.datasetFieldId) {
            _this3.initOptions(filed);
            _this3.item = filed;
            if (_this3.rowPermissionForm.filterType === "enum") {
              _this3.initEnumOptions();
            }
          }
        });
        this.fetchTypeList();
      }
      this.update_row_permission = true;
    },
    onTypeChange: function onTypeChange() {
      this.fetchTypeList();
      this.rowPermissionForm.authTargetId = "";
    },
    fetchTypeList: function fetchTypeList() {
      var _this4 = this;

      this.targetObjs = [];
      var params = {
        authTargetId: this.rowPermissionForm.authTargetId,
        authTargetType: this.rowPermissionForm.authTargetType,
        datasetId: this.rowPermissionForm.datasetId,
      };
      this.executeAxios(
        "plugin/dataset/rowPermissions/authObjs",
        "post",
        params,
        function (res) {
          _this4.targetObjs = res.data;
        }
      );
    },
    addFilter: function addFilter() {
      this.rowPermissionForm.filter.push({
        term: "eq",
        value: "",
      });
    },
    removeFilter: function removeFilter(index) {
      this.rowPermissionForm.filter.splice(index, 1);
    },
    closeDialog: function closeDialog() {
      this.update_row_permission = false;
      this.item = {};
      this.resetTaskForm();
    },
    resetTaskForm: function resetTaskForm() {
      this.rowPermissionForm = JSON.parse(JSON.stringify(this.defaultForm));
      this.rowPermissionForm = {
        datasetId: this.rowPermissionForm.datasetId,
        authTargetId: null,
        filter: [{ term: "eq", value: "" }],
      };
    },
    deleteRowPermission: function deleteRowPermission(item) {
      var _this5 = this;

      this.$confirm(
        this.$t("dataset.confirm_delete"),
        this.$t("dataset.tips"),
        {
          confirmButtonText: this.$t("dataset.confirm"),
          cancelButtonText: this.$t("dataset.cancel"),
          type: "warning",
        }
      )
        .then(function () {
          _this5.executeAxios(
            "/plugin/dataset/rowPermissions/delete/" + item.id,
            "post",
            {},
            function (res) {
              _this5.$message({
                message: _this5.$t("dataset.delete_success"),
                type: "success",
                showClose: true,
              });
              _this5.search(_this5.last_condition, true);
            }
          );
        })
        .catch(function () {});
    },
    save: function save() {
      var _this6 = this;

      this.$refs.rowPermissionForm.validate(function (valid) {
        if (valid) {
          if (_this6.rowPermissionForm.filterType === "logic") {
            for (var i = 0; i < _this6.rowPermissionForm.filter.length; i++) {
              var f = _this6.rowPermissionForm.filter[i];
              if (
                !f.term.includes("null") &&
                !f.term.includes("empty") &&
                (!f.value || f.value === "")
              ) {
                _this6.$message({
                  message: _this6.$t("chart.filter_value_can_null"),
                  type: "error",
                  showClose: true,
                });
                return;
              }
            }
          }
          var params = JSON.parse(JSON.stringify(_this6.rowPermissionForm));
          params.filter = JSON.stringify(params.filter);
          params.enumCheckField = params.enumCheckField.join(",");
          _this6.executeAxios(
            "/plugin/dataset/rowPermissions/save",
            "post",
            params,
            function (res) {
              if (res.success) {
                _this6.$message({
                  message: _this6.$t("dataset.save_success"),
                  type: "success",
                  showClose: true,
                });
                _this6.update_row_permission = false;
                _this6.resetTaskForm();
                _this6.search(_this6.last_condition, true);
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    initEnumOptions: function initEnumOptions() {
      var _this7 = this;

      // if (
      //   this.rowPermissionForm.filterType === "enum" &&
      //   (this.item.deType === 0 || this.item.deType === 5)
      // ) {
      //   this.loadingRowPermission = true;
      //   this.executeAxios(
      //     "/dataset/field/multFieldValuesForPermissions",
      //     "post",
      //     { fieldIds: [this.item.id] },
      //     function (res) {
      //       _this7.fieldOptions = _this7.optionDatas(res.data);
      //       _this7.loadingRowPermission = false;
      //     }
      //   );
      // }
    },
    optionDatas: function optionDatas(datas) {
      if (!datas) return null;
      return datas
        .filter(function (item) {
          return !!item;
        })
        .map(function (item) {
          return {
            id: item,
            text: item,
          };
        });
    },
    onFieldChange: function onFieldChange() {
      var _this8 = this;

      this.rowPermissionForm.filter = [{ term: "eq", value: "" }];
      this.rowPermissionForm.enumCheckField = [];
      this.filedList.forEach(function (filed) {
        if (filed.id === _this8.rowPermissionForm.datasetFieldId) {
          _this8.item = filed;
          _this8.initOptions(_this8.item);
          _this8.initEnumOptions();
          _this8.rowPermissionForm.enumCheckField = [];
        }
      });
    },
    handleEnter() {
      if(this.rowPermissionForm.enumCheckField.findIndex(item => item === this.inputVal) === -1) {
        this.rowPermissionForm.enumCheckField.push(this.inputVal)
        this.inputVal = ''
      }
    },
    deleteEnumCheckField(item) {
      const index = this.rowPermissionForm.enumCheckField.indexOf(item);
      if (index !== -1) {
        this.rowPermissionForm.enumCheckField.splice(index, 1);
      }
    },
    initOptions: function initOptions(filed) {
      if (filed.deType === 0 || filed.deType === 5) {
        this.options = JSON.parse(JSON.stringify(this.textOptions));
      } else if (filed.deType === 1) {
        this.options = JSON.parse(JSON.stringify(this.dateOptions));
      } else {
        this.options = JSON.parse(JSON.stringify(this.valueOptions));
      }
    },
  },
};
</script>

<style scoped>
span {
  font-size: 12px;
}
.my_table {
  overflow-y: auto;
}
.my_table .el-table-column--selection .cell {
  padding-left: 10px;
  padding-right: 14px;
}
.dialog-css .el-dialog {
  min-width: 600px;
}
.select-item {
  width: 120px;
}
.my_table table {
  width: 100% !important;
}
.custom-node-label {
  color: #ccc;
}
.enumCheckFieldList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  margin-top: 10px;
  margin-left: 46px;
}
.enumCheckFieldListItem {
  padding: 0 4px;
  background-color: #f4f4f5;
  height: 24px;
  line-height: 24px;
}
</style>
