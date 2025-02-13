<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-col v-loading="loading" class="tree-main">
    <el-row v-if="showExtent" class="tree-head">
      <span style="float: left; padding-left: 10px">{{ dataInfo.head }}</span>
      <span
        v-for="auth in defaultAuthDetails"
        :key="auth.privilegeName"
        class="auth-span"
      >
        {{ auth.privilegeName }}
      </span>
    </el-row>
    <el-row style="margin-top: 5px">
      <el-tree
        :props="defaultProps"
        :load="loadNodes"
        :data="treeData"
        :node-key="defaultProps.id"
        :highlight-current="highlightCurrent"
        :default-expanded-keys="expandedKey"
        lazy
        @node-click="nodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <!-- <span>
            <span style="margin-left: 6px" v-html="data.name" />
          </span> -->
          <!-- 文件夹图标 -->
          <span v-if="data.nodeType === 'spine'">
            <i class="el-icon-folder"></i>
          </span>

          <!-- 节点名称 -->
          <span class="auth-span-father">
            <span class="auth-span-inner" v-html="data.name"></span>
          </span>

          <span v-if="showExtent" @click.stop>
            <!-- <div v-if="authDetails[data.id]">
              <span v-for="auth in authDetails[data.id]" :key="auth.privilegeType" class="auth-span">
                <a href="javascript:;" @click="clickAuth(node,data,auth)">
                  <svg-icon style="width: 25px;height: 25px" :icon-class="auth.privilegeValue===1?'lock_open':'lock_closed'" />
                </a>
              </span>
            </div>
            <div v-else>
              <span v-for="auth in defaultAuthDetails" :key="auth.privilegeType" class="auth-span">
                <a href="javascript:;" @click="clickAuth(node,data,auth)">
                  <svg-icon style="width: 25px;height: 25px" :icon-class="auth.privilegeValue===1?'lock_open':'lock_closed'" />
                </a>
              </span>
            </div> -->
            <!-- 有权限详情时显示 -->
            <div v-if="authDetails[data.id]">
              <span
                v-for="auth in authDetails[data.id]"
                :key="auth.privilegeType"
                class="auth-span"
              >
                <!-- 非数据集权限显示锁定图标 -->
                <a
                  v-show="auth.privilegeType !== 20"
                  href="javascript:;"
                  @click="clickAuth(node, data, auth)"
                >
                  <svg-icon
                    style="width: 25px; height: 25px"
                    :icon-class="
                      auth.privilegeValue === 1 ? 'lock_open' : 'lock_closed'
                    "
                  />
                </a>

                <!-- 数据集权限且非分组时显示编辑按钮 -->
                <el-button
                  v-show="
                    auth.privilegeType === 20 &&
                    data.modelInnerType !== 'group' &&
                    auth.privilegeValue === 1
                  "
                  size="mini"
                  circle
                  type="text"
                  icon="el-icon-edit"
                  @click="showRowPermission(auth)"
                />

                <!-- 数据集权限且非分组且无权限时显示空白 -->
                <div
                  v-show="
                    auth.privilegeType === 20 &&
                    data.modelInnerType !== 'group' &&
                    auth.privilegeValue !== 1
                  "
                >
                  &nbsp;&nbsp;
                </div>

                <!-- 数据集权限且为分组时显示空白 -->
                <div
                  v-show="
                    auth.privilegeType === 20 && data.modelInnerType === 'group'
                  "
                >
                  &nbsp;&nbsp;
                </div>
              </span>
            </div>

            <!-- 无权限详情时显示默认权限 -->
            <div v-else>
              <span
                v-for="auth in defaultAuthDetails"
                :key="auth.privilegeType"
                class="auth-span"
              >
                <a
                  v-show="auth.privilegeType !== 20"
                  href="javascript:;"
                  @click="clickAuth(node, data, auth)"
                >
                  <svg-icon
                    style="width: 25px; height: 25px"
                    :icon-class="
                      auth.privilegeValue === 1 ? 'lock_open' : 'lock_closed'
                    "
                  />
                </a>
                <div v-show="auth.privilegeType === 20">&nbsp;&nbsp;</div>
              </span>
            </div>
          </span>
        </span>
      </el-tree>
    </el-row>

    <!-- 行列权限设置对话框 -->
    <el-dialog
      v-dialogDrag
      class="dialog-css"
      :title="$t('dataset.row_column_permissions')"
      :visible="show_row_column_permission"
      :before-close="handleCloseRowColumnPermissionDialog"
      width="50%"
    >
      <el-tabs v-model="datasetPermissionsTabActive">
        <!-- 行权限设置 -->
        <el-tab-pane
          :label="$t('dataset.row_permissions')"
          name="RowPermissions"
        >
          <el-row>
            <el-button
              icon="el-icon-plus"
              size="mini"
              @click="addRowPermission()"
            >
              {{ $t("dataset.row_permission.add") }}
            </el-button>
          </el-row>

          <el-row style="margin-top: 10px">
            <el-table
              v-loading="loadingRowPermission"
              style="width: 100%"
              :data="rowPermissionData"
              :height="240"
              border
              size="mini"
              element-loading-spinner="el-icon-loading"
            >
              <!-- 字段名称列 -->
              <el-table-column
                prop="fieldName"
                :label="$t('dataset.field_name')"
                width="180"
              />

              <!-- 权限值列 -->
              <el-table-column
                prop="filterDTO"
                :label="$t('dataset.row_permission.value')"
              >
                <template #default="scope">
                  <el-table
                    :data="scope.row.filterDTO"
                    style="width: 100%"
                    :show-header="false"
                  >
                    <!-- 条件列 -->
                    <el-table-column prop="term" width="100">
                      <template #default="scope">
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
                    <!-- 值列 -->
                    <el-table-column prop="value" show-overflow-tooltip />
                  </el-table>
                </template>
              </el-table-column>

              <!-- 操作列 -->
              <el-table-column :label="$t('dataset.operate')" width="180">
                <template #default="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="addRowPermission(scope.row)"
                  />
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteRowPermission(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>

        <!-- 列权限设置 -->
        <el-tab-pane
          :label="$t('dataset.column_permissions')"
          name="ColumnPermissions"
        >
          <el-col>
            <el-form
              ref="columnPermissionForm"
              :model="columnPermissionForm"
              :rules="rule"
              label-width="100px"
            >
              <!-- 启用开关 -->
              <el-form-item>
                <el-switch
                  v-model="columnPermissionForm.permissions.enable"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :inactive-text="$t('dataset.column_permission.disable')"
                  :active-text="$t('dataset.column_permission.enable')"
                />
              </el-form-item>

              <!-- 列权限表格 -->
              <el-form-item>
                <el-table
                  ref="multipleTable"
                  class="my_table"
                  :data="columnPermissionForm.permissions.columns"
                  :max-height="300"
                  :height="300"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" />
                  <el-table-column
                    prop="name"
                    :label="$t('dataset.field_name')"
                    width="150"
                    show-overflow-tooltip
                  />
                  <el-table-column :label="$t('commons.operating')" width="220">
                    <template #default="scope">
                      <el-radio
                        v-model="scope.row.opt"
                        :disabled="!scope.row.selected"
                        label="Prohibit"
                      >
                        {{ $t("dataset.column_permission.prohibit") }}
                      </el-radio>
                      <el-radio
                        v-model="scope.row.opt"
                        :disabled="!scope.row.selected"
                        label="Desensitization"
                      >
                        {{ $t("dataset.column_permission.desensitization") }}
                      </el-radio>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>

              <!-- 保存按钮 -->
              <el-form-item>
                <el-button
                  type="primary"
                  size="mini"
                  @click="saveColumnPermission"
                >
                  {{ $t("dataset.confirm") }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 主对话框 -->
    <el-dialog
      v-dialogDrag
      class="dialog-css"
      :title="update_row_permission_dialog_title"
      :visible="update_row_permission"
      :show-close="false"
      width="50%"
      append-to-body
    >
      <el-col>
        <!-- 行权限表单 -->
        <el-form
          ref="rowPermissionForm"
          :form="rowPermissionForm"
          :model="rowPermissionForm"
          :rules="rule"
          label-width="100px"
        >
          <!-- 字段名称选择 -->
          <el-form-item :label="$t('dataset.field_name')" prop="datasetFieldId">
            <el-select
              v-model="rowPermissionForm.datasetFieldId"
              @change="onFieldChange"
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
              <!-- 字符串或枚举类型的过滤器选择 -->
              <div v-if="item.deType === 0 || item.deType === 5">
                <el-radio-group
                  v-model="rowPermissionForm.filterType"
                  size="mini"
                  style="margin-bottom: 10px"
                  @change="initEnumOptions"
                >
                  <el-radio label="logic">{{ $t("chart.logic_exp") }}</el-radio>
                  <el-radio label="enum">{{ $t("chart.enum_exp") }}</el-radio>
                </el-radio-group>
              </div>

              <!-- 逻辑过滤器 -->
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
                  <!-- 添加过滤器按钮 -->
                  <el-button
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    style="margin-bottom: 10px"
                    @click="addFilter"
                  />

                  <!-- 逻辑运算符选择 -->
                  <el-radio-group
                    v-show="
                      rowPermissionForm.filter &&
                      rowPermissionForm.filter.length > 1
                    "
                    v-model="rowPermissionForm.logic"
                    size="mini"
                    style="margin-left: 10px"
                  >
                    <el-radio-button label="and">{{
                      $t("chart.and")
                    }}</el-radio-button>
                    <el-radio-button label="or">{{
                      $t("chart.or")
                    }}</el-radio-button>
                  </el-radio-group>
                </div>

                <!-- 过滤器列表 -->
                <div style="max-height: 50vh; overflow-y: auto">
                  <el-row
                    v-for="(f, index) in rowPermissionForm.filter"
                    :key="index"
                    class="filter-item"
                  >
                    <!-- 条件选择 -->
                    <el-col :span="8">
                      <el-select v-model="f.term" size="mini">
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

                    <!-- 值输入 -->
                    <el-col :span="6">
                      <el-input
                        v-show="
                          !f.term.includes('null') && !f.term.includes('empty')
                        "
                        v-model="f.value"
                        class="value-item"
                        :placeholder="$t('chart.condition')"
                        size="mini"
                        clearable
                      />
                    </el-col>

                    <!-- 删除按钮 -->
                    <el-col :span="6">
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        circle
                        style="float: right"
                        @click="removeFilter(index)"
                      />
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 枚举过滤器 -->
              <div
                v-if="
                  (item.deType === 0 || item.deType === 5) &&
                  rowPermissionForm.filterType === 'enum'
                "
              >
                <span style="margin-right: 10px">{{
                  $t("chart.filter_exp")
                }}</span>
                <el-select
                  v-model="rowPermissionForm.enumCheckField"
                  filterable
                  collapse-tags
                  multiple
                  :placeholder="$t('chart.pls_slc')"
                  size="mini"
                >
                  <el-option
                    v-for="field in fieldOptions"
                    :key="field.id"
                    :label="field.text"
                    :value="field.id"
                  />
                </el-select>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 对话框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDialog">
          {{ $t("dataset.cancel") }}
        </el-button>
        <el-button type="primary" size="mini" @click="save">
          {{ $t("dataset.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import log from "video.js/es5/utils/log";
// import { authChange, authDetails, authDetailsModel, authModel } from '@/api/system/sysAuth'
// import { execute } from '@/de-base/api/de-api'
import { execute } from "@/api/system/dynamic";
export default {
  name: "LazyTree",
  components: {},
  props: {
    filterText: {
      type: String,
      required: false,
      default: "",
    },
    authCondition: {
      type: Object,
      required: false,
    },
    dataInfo: {
      type: Object,
      required: true,
    },
    activeName: {
      type: String,
      required: true,
    },
    attachActiveName: String,
    defaultProps: {
      type: Object,
      required: false,
      default: function () {
        return {
          children: "children",
          label: "name",
          id: "id",
          parentId: "pid",
          isLeaf: "leaf",
        };
      },
    },
    showExtent: Boolean,
    highlightCurrent: Boolean,
  },
  data() {
    return {
      loading: false,
      treeData: [],
      changeIndex: 0,
      timeMachine: null,
      expandedKey: [], // 展开节点 搜索时默认展开父级节点
      defaultCondition: {
        // pid 是0的时候 查询的是顶级的节点
        pid: "0",
      },
      authDetails: {},
      defaultAuthDetails: [],
      searchStatus: false, // 当前是否在搜索状态 （搜索状态 展开不加载子节点）
      // 当前已经加载的节点ID 备用（当前把当前authTarget的所有授权加载进来）
      loadedNodeIds: new Set(),
      show_row_column_permission: false,
      rowPermissionData: [],
      loadingRowPermission: false,
      update_row_permission_dialog_title: "",
      update_row_permission: false,
      filedList: [],
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
      fieldOptions: [],
      item: {},
      authDetail: {},
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
      rule: {
        datasetFieldId: [
          {
            required: true,
            message: this.$t("dataset.row_permission.please_select_field"),
            trigger: "blur",
          },
        ],
      },
      datasetPermissionsTabActive: "RowPermissions",
      defaultColumnPermissionForm: {
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
    };
  },
  computed: {},
  watch: {
    filterText(val) {
      this.expandedKey = [];
      if (val && val.length > 0) {
        this.searchStatus = true;
      }
      // 当组件名和 activeName 相等时 才进行查询
      if (this.dataInfo.authType === this.activeName) {
        this.destroyTimeMachine();
        this.changeIndex++;
        this.filterNode(this.changeIndex);
      }
    },
    authCondition: {
      handler(newVal, oldVla) {
        this.loadAuth();
      },
      deep: true,
    },
    activeName: {
      handler(newVal, oldVla) {
        this.loadAuth();
      },
      deep: true,
    },
    attachActiveName: {
      handler(newVal, oldVla) {
        this.authDetails = {};
      },
      deep: true,
    },
  },
  created() {
    // 初始化授权模板
    if (this.showExtent) {
      this.executeAxios(
        "/plugin/auth/authDetailsModel/" + this.dataInfo.authType,
        "get",
        {},
        (res) => {
          this.defaultAuthDetails = res.data;
        }
      );
      //   authDetailsModel(this.dataInfo.authType).then(res => {
      //     this.defaultAuthDetails = res.data
      //   })
      this.loadAuth();
    }
  },
  methods: {
    executeAxios(url, type, data, callBack) {
      const param = {
        url: url,
        type: type,
        data: data,
        callBack: callBack,
      };
      this.$emit("execute-axios", param);
      // if (process.env.NODE_ENV === 'development') {
      //   execute(param).then(res => {
      //     if (param.callBack) {
      //       param.callBack(res)
      //     }
      //   }).catch(e => {
      //     if (param.error) {
      //       param.error(e)
      //     }
      //   })
      // }
    },
    loadAuth() {
      if (this.authCondition && this.showExtent) {
        let authQueryCondition = {};
        if (this.dataInfo.direction === "source") {
          // 当前为授权数据 获取当前authTarget 的授权信息 authSource
          authQueryCondition = {
            authTarget: this.authCondition.id,
            authTargetType: this.authCondition.type,
            authSourceType: this.dataInfo.authType,
          };
        } else {
          authQueryCondition = {
            authSource: this.authCondition.id,
            authSourceType: this.authCondition.type,
          };
        }
        this.executeAxios(
          "/plugin/auth/authDetails",
          "post",
          authQueryCondition,
          (res) => {
            this.authDetails = res.data;
          }
        );
        // authDetails(authQueryCondition).then(res => {
        //   this.authDetails = res.data
        // })
      }
    },
    loadNodes(node, resolve) {
      if (!this.searchStatus) {
        if (node.level === 0) {
          const queryCondition = {
            modelType: this.dataInfo.authType,
            ...this.defaultCondition,
          };
          this.executeAxios(
            "/plugin/auth/authModels",
            "post",
            queryCondition,
            (res) => {
              const data = res.data;
              resolve(data);
            }
          );
          //   authModel(queryCondition).then(res => {
          //     const data = res.data
          //     resolve(data)
          //   })
        } else {
          const queryCondition = {
            modelType: this.dataInfo.authType,
          };
          queryCondition[this.defaultProps.parentId] =
            node.data[this.defaultProps.id];
          this.executeAxios(
            "/plugin/auth/authModels",
            "post",
            queryCondition,
            (res) => {
              const data = res.data;
              resolve(data);
            }
          );
          //   authModel(queryCondition).then(res => {
          //     const data = res.data
          //     resolve(data)
          //   })
        }
      } else {
        resolve(node.data.children);
      }
    },
    filterNode(index) {
      this.timeMachine = setTimeout(() => {
        if (index === this.changeIndex) {
          const queryCondition = {
            withExtend: "parent",
            modelType: this.dataInfo.authType,
          };
          queryCondition[this.defaultProps.label] = this.filterText;
          this.executeAxios(
            "/plugin/auth/authModels",
            "post",
            queryCondition,
            (res) => {
              // 高亮显示
              this.highlights(res.data);
              this.treeData = this.buildTree(res.data);
              // 恢复searchStatus 状态 可以允许继续展开父级
              this.$nextTick(() => (this.searchStatus = false));
            }
          );
          //   authModel(queryCondition).then(res => {
          //     // 高亮显示
          //     this.highlights(res.data)
          //     this.treeData = this.buildTree(res.data)
          //     // 恢复searchStatus 状态 可以允许继续展开父级
          //     this.$nextTick(() => (this.searchStatus = false))
          //   })
        }
        this.destroyTimeMachine();
      }, 1500);
    },
    nodeClick(data, node) {
      this.$emit("nodeClick", { id: data.id, type: this.dataInfo.authType });
    },
    destroyTimeMachine() {
      this.timeMachine && clearTimeout(this.timeMachine);
      this.timeMachine = null;
    },
    buildTree(arrs) {
      const idMapping = arrs.reduce((acc, el, i) => {
        acc[el[this.defaultProps.id]] = i;
        return acc;
      }, {});
      const roots = [];
      arrs.forEach((el) => {
        // 判断根节点 ###
        if (
          el[this.defaultProps.parentId] === null ||
          el[this.defaultProps.parentId] === 0 ||
          el[this.defaultProps.parentId] === "0"
        ) {
          roots.push(el);
          return;
        }
        // 用映射表找到父元素
        const parentEl = arrs[idMapping[el[this.defaultProps.parentId]]];
        // 把当前元素添加到父元素的`children`数组中
        parentEl.children = [...(parentEl.children || []), el];

        // 设置展开节点 如果没有子节点则不进行展开
        if (parentEl.children.length > 0) {
          this.expandedKey.push(parentEl[this.defaultProps.id]);
        }
      });
      return roots;
    },
    // 权限修改
    async clickAuth(node, data, auth) {
      let authChangeCondition = this.getAuthChangeCondition(data, auth);

      if (!node.isLeaf) {
        this.loading = true;
        try {
          // 获取所有子节点
          const allChildren = await this.getChildrenNodes(node);

          const list = [authChangeCondition];
          allChildren.forEach((item) => {
            let auth1 = null;
            if (this.authDetails[item.id]) {
              auth1 = this.authDetails[item.id].find((authDetail) => {
                if (authDetail.privilegeExtend && auth.privilegeExtend) {
                  return authDetail.privilegeExtend === auth.privilegeExtend;
                } else {
                  return authDetail.privilegeName === auth.privilegeName;
                }
              });
            } else {
              auth1 = this.defaultAuthDetails.find((authDetail) => {
                if (authDetail.privilegeExtend && auth.privilegeExtend) {
                  return authDetail.privilegeExtend === auth.privilegeExtend;
                } else {
                  return auth.privilegeName.includes(
                    authDetail.privilegeExtend
                  );
                }
              });
            }
            auth1.privilegeValue = auth.privilegeValue;
            list.push(this.getAuthChangeCondition(item, auth1));
          });

          // 批量更新权限
          this.executeAxios(
            "/plugin/auth/authChangeBatch",
            "post",
            { auths: list },
            (res) => {
              this.loadAuth();
              this.loading = false;
            }
          );
        } catch (error) {
          console.error("获取子节点失败:", error);
          this.loading = false;
        }
      } else {
        this.loading = true;
        this.executeAxios(
          "/plugin/auth/authChange",
          "post",
          authChangeCondition,
          (res) => {
            // 重新加载权限
            this.loadAuth();
            this.loading = false;
          }
        );
      }
    },
    // 需要层层获取子节点
    async getChildrenNodes(node) {
      if (node.isLeaf) return [];

      const queryCondition = {
        modelType: this.dataInfo.authType,
      };
      queryCondition[this.defaultProps.parentId] =
        node.data[this.defaultProps.id];

      // 使用Promise包装axios调用
      const getNodes = () => {
        return new Promise((resolve) => {
          this.executeAxios(
            "/plugin/auth/authModels",
            "post",
            queryCondition,
            (res) => {
              resolve(res.data || []);
            }
          );
        });
      };

      // 获取当前节点的直接子节点
      const children = await getNodes();

      // 递归获取每个子节点的子节点
      const childrenPromises = children.map(async (child) => {
        if (!child[this.defaultProps.isLeaf]) {
          // 为每个非叶子节点递归调用
          const grandChildren = await this.getChildrenNodes({
            isLeaf: child[this.defaultProps.isLeaf],
            data: child,
          });
          return [...grandChildren];
        }
        return [];
      });

      // 等待所有子节点的递归调用完成
      const allChildren = await Promise.all(childrenPromises);

      // 合并所有结果
      return [...children, ...allChildren.flat()];
    },
    getAuthChangeCondition(data, auth) {
      let authChangeCondition = {};
      if (this.dataInfo.direction === "source") {
        // 当前为授权数据
        authChangeCondition = {
          authSource: data.id,
          authSourceType: this.dataInfo.authType,
          authTarget: this.authCondition.id,
          authTargetType: this.authCondition.type,
          authDetail: auth,
        };
      } else {
        authChangeCondition = {
          authTarget: data.id,
          authTargetType: this.dataInfo.authType,
          authSource: this.authCondition.id,
          authSourceType: this.authCondition.type,
          authDetail: auth,
        };
      }
      return authChangeCondition;
    },
    // 高亮显示搜索内容
    highlights(data) {
      if (data && this.filterText && this.filterText.length > 0) {
        const replaceReg = new RegExp(this.filterText, "g"); // 匹配关键字正则
        const replaceString =
          '<span style="color: #faaa39">' + this.filterText + "</span>"; // 高亮替换v-html值
        data.forEach((item) => {
          item.name = item.name.replace(replaceReg, replaceString); // 开始替换
        });
      }
    },
    showRowPermission(auth) {
      this.rowPermissionData = [];
      this.authDetail = auth;
      this.show_row_column_permission = true;
      this.fetchFiledList(auth);
    },
    listRowPermissions(auth) {
      var _this6 = this;

      auth.datasetId = auth.authSource;
      auth.authTargetId = auth.authTarget;
      this.loadingRowPermission = true;
      this.executeAxios(
        "/plugin/dataset/rowPermissions/list",
        "post",
        auth,
        function (res) {
          _this6.rowPermissionData = res.data;
          _this6.rowPermissionData.forEach(function (item) {
            item.filter = JSON.parse(item.filter);
            if (item.filterType === "enum") {
              item.filterDTO = [];
              item.filterDTO.push({ term: "enum", value: item.enumCheckField });
            } else {
              item.filterDTO = item.filter;
            }
            if (item.enumCheckField.length > 0) {
              item.enumCheckField = item.enumCheckField.split(",");
            } else {
              item.enumCheckField = [];
            }
          });
          _this6.loadingRowPermission = false;
        }
      );
    },
    listColumnPermissions(auth) {
      var _this7 = this;

      auth.datasetId = auth.authSource;
      auth.authTargetId = auth.authTarget;
      this.loadingRowPermission = true;
      this.executeAxios(
        "/plugin/dataset/columnPermissions/list",
        "post",
        auth,
        function (res) {
          var columnPermission = res.data;
          if (columnPermission.length > 0) {
            _this7.columnPermissionForm = Object.assign(
              {},
              JSON.parse(JSON.stringify(columnPermission[0]))
            );
            _this7.columnPermissionForm.permissions = JSON.parse(
              _this7.columnPermissionForm.permissions
            );
            var columnsPermissions =
              _this7.columnPermissionForm.permissions.columns;
            _this7.columnPermissionForm.permissions.columns = [];
            var rows = [];
            for (var i = 0; i < _this7.filedList.length; i++) {
              var item = {
                id: _this7.filedList[i].id,
                name: _this7.filedList[i].name,
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
              _this7.columnPermissionForm.permissions.columns.push(item);
            }
            _this7.toggleSelection(rows);
          } else {
            _this7.columnPermissionForm = JSON.parse(
              JSON.stringify(_this7.defaultColumnPermissionForm)
            );
            _this7.columnPermissionForm.authTargetId =
              _this7.authDetail.authTarget;
            _this7.columnPermissionForm.authTargetType =
              _this7.authDetail.authTargetType;
            _this7.columnPermissionForm.datasetId =
              _this7.authDetail.authSource;
            _this7.filedList.forEach(function (filed) {
              _this7.columnPermissionForm.permissions.columns.push({
                id: filed.id,
                name: filed.name,
                opt: "Prohibit",
              });
            });
          }
        }
      );
    },
    toggleSelection(rows) {
      var _this8 = this;

      if (rows) {
        rows.forEach(function (row) {
          _this8.$nextTick(function () {
            _this8.$refs.multipleTable.toggleRowSelection(row);
          });
        });
      }
    },
    addRowPermission(rowPermissionObj) {
      var _this9 = this;

      if (!rowPermissionObj) {
        // add
        this.rowPermissionForm = JSON.parse(JSON.stringify(this.defaultForm));
        this.rowPermissionForm.authTargetId = this.authDetail.authTarget;
        this.rowPermissionForm.authTargetType = this.authDetail.authTargetType;
        this.rowPermissionForm.datasetId = this.authDetail.authSource;
        this.update_row_permission_dialog_title = this.$t(
          "dataset.row_permission.add"
        );
      } else {
        // update
        this.rowPermissionForm = Object.assign(
          {},
          JSON.parse(JSON.stringify(rowPermissionObj))
        );
        this.filedList.forEach(function (filed) {
          if (filed.id === _this9.rowPermissionForm.datasetFieldId) {
            _this9.initOptions(filed);
            _this9.item = filed;
            if (_this9.rowPermissionForm.filterType === "enum") {
              _this9.initEnumOptions();
            }
          }
        });
        this.update_row_permission_dialog_title = this.$t(
          "dataset.row_permission.edit"
        );
      }
      this.update_row_permission = true;
    },
    fetchFiledList(auth) {
      var _this10 = this;

      this.filedList = [];
      this.executeAxios(
        "dataset/field/listForPermissionSeting/" + auth.authSource,
        "post",
        {},
        function (res) {
          _this10.filedList = res.data;
          _this10.listRowPermissions(auth);
          _this10.listColumnPermissions(auth);
        }
      );
    },
    deleteRowPermission(item) {
      var _this11 = this;

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
          _this11.executeAxios(
            "plugin/dataset/rowPermissions/delete/" + item.id,
            "post",
            {},
            function (res) {
              _this11.$message({
                message: _this11.$t("dataset.delete_success"),
                type: "success",
                showClose: true,
              });
              _this11.listRowPermissions(_this11.authDetail);
            }
          );
        })
        .catch(function () {});
    },
    save() {
      var _this12 = this;

      this.$refs.rowPermissionForm.validate(function (valid) {
        if (valid) {
          if (_this12.rowPermissionForm.filterType === "logic") {
            for (var i = 0; i < _this12.rowPermissionForm.filter.length; i++) {
              var f = _this12.rowPermissionForm.filter[i];
              if (
                !f.term.includes("null") &&
                !f.term.includes("empty") &&
                (!f.value || f.value === "")
              ) {
                _this12.$message({
                  message: _this12.$t("chart.filter_value_can_null"),
                  type: "error",
                  showClose: true,
                });
                return;
              }
            }
          }
          var params = JSON.parse(JSON.stringify(_this12.rowPermissionForm));
          params.filter = JSON.stringify(params.filter);
          params.enumCheckField = params.enumCheckField.join(",");
          _this12.executeAxios(
            "plugin/dataset/rowPermissions/save",
            "post",
            params,
            function (res) {
              if (res.success) {
                _this12.$message({
                  message: _this12.$t("dataset.save_success"),
                  type: "success",
                  showClose: true,
                });
                _this12.update_row_permission = false;
                _this12.listRowPermissions(_this12.authDetail);
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    closeDialog() {
      this.update_row_permission = false;
      this.rowPermissionForm = {};
    },
    addFilter() {
      this.rowPermissionForm.filter.push({
        term: "eq",
        value: "",
      });
    },
    removeFilter(index) {
      this.rowPermissionForm.filter.splice(index, 1);
    },
    onFieldChange() {
      var _this13 = this;

      this.filedList.forEach(function (filed) {
        if (filed.id === _this13.rowPermissionForm.datasetFieldId) {
          _this13.item = filed;
          _this13.initOptions(_this13.item);
          _this13.initEnumOptions();
          _this13.rowPermissionForm.enumCheckField = [];
        }
      });
    },
    initOptions(filed) {
      if (filed.deType === 0 || filed.deType === 5) {
        this.options = JSON.parse(JSON.stringify(this.textOptions));
      } else if (filed.deType === 1) {
        this.options = JSON.parse(JSON.stringify(this.dateOptions));
      } else {
        this.options = JSON.parse(JSON.stringify(this.valueOptions));
      }
    },
    initEnumOptions() {
      var _this14 = this;

      // æŸ¥æ‰¾æžšä¸¾å€¼
      if (
        this.rowPermissionForm.filterType === "enum" &&
        (this.item.deType === 0 || this.item.deType === 5)
      ) {
        this.loadingRowPermission = true;
        this.executeAxios(
          "dataset/field/multFieldValues",
          "post",
          { fieldIds: [this.item.id] },
          function (res) {
            _this14.fieldOptions = _this14.optionDatas(res.data);
            _this14.loadingRowPermission = false;
          }
        );
      }
    },
    optionDatas(datas) {
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
    saveColumnPermission() {
      var _this15 = this;

      this.$refs.columnPermissionForm.validate(function (valid) {
        if (valid) {
          var params = JSON.parse(JSON.stringify(_this15.columnPermissionForm));
          params.permissions = JSON.stringify(params.permissions);
          _this15.executeAxios(
            "/plugin/dataset/columnPermissions/save",
            "post",
            params,
            function (res) {
              if (res.success) {
                _this15.columnPermissionForm.id = res.data.id;
                _this15.$message({
                  message: _this15.$t("dataset.save_success"),
                  type: "success",
                  showClose: true,
                });
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    handleCloseRowColumnPermissionDialog() {
      this.show_row_column_permission = false;
      this.columnPermissionForm = JSON.parse(
        JSON.stringify(this.defaultColumnPermissionForm)
      );
    },
  },
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 8px;
}
.tree-main {
  height: calc(100vh - 210px);
  border: 1px solid #e6e6e6;
  overflow-y: auto;
}
.blackTheme .tree-main {
  border-color: var(--TableBorderColor) !important;
}
/* .tree-head{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #f7f8fa;
    font-size: 12px;
    color: #3d4d66 ;
  } */

.tree-head {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid var(--TableBorderColor, #e6e6e6);
  background-color: var(--SiderBG, #f7f8fa);
  font-size: 12px;
  color: var(--TableColor, #3d4d66);
}

.auth-span {
  float: right;
  width: 50px;
  margin-right: 30px;
}
.highlights-text {
  color: #faaa39 !important;
}
.auth-span-father {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 0%;
  flex: 1 1 0%;
  width: 0px;
}
.auth-span-inner {
  margin-left: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
