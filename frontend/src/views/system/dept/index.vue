<template>
  <layout-content
    v-loading="$store.getters.loadingMap[$store.getters.currentPath]"
  >
    <tree-table
      :columns="columns"
      :search-config="searchConfig"
      @search="search"
    >
      <!-- 工具栏插槽 -->
      <template #toolbar>
        <el-button
          v-permission="['dept:add']"
          icon="el-icon-circle-plus-outline"
          @click="create"
        >
          {{ $t("organization.create") }}
        </el-button>
      </template>

      <!-- 表格主体 -->
      <el-table
        ref="table"
        class="de-dept-table-class"
        style="width: 100%"
        :data="tableData"
        lazy
        :load="loadExpandDatas"
        :indent="30"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="deptId"
      >
        <!-- 部门名称列 -->
        <el-table-column :label="$t('organization.name')" prop="name">
          <template #default="scope">
            <span
              class="dept-name"
              :class="{
                'indent-no-child':
                  scope.row.subCount === 0 && scope.row.pid === 0,
              }"
              :data-id="scope.row.deptId"
              @drop="endDrag"
              @dragover="allowDrop"
            >
              <span
                :id="scope.row.deptId"
                draggable="true"
                @dragstart="startDrag"
              >
                {{ scope.row.name }}
              </span>
            </span>
          </template>
        </el-table-column>

        <!-- 子组织数量列 -->
        <el-table-column
          :label="$t('organization.sub_organizations')"
          prop="subCount"
        />

        <!-- 创建时间列 -->
        <el-table-column
          prop="createTime"
          :label="$t('organization.create_time')"
        >
          <template #default="scope">
            <span>{{ scope.row.createTime | timestampFormatDate }}</span>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <fu-table-operations
          :buttons="buttons"
          :label="$t('commons.operating')"
          fix=""
        />
      </el-table>
    </tree-table>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/business/LayoutContent";
import TreeTable from "@/components/business/tree-table";
import {
  formatQuickCondition,
  formatOrders,
  formatCondition,
} from "@/utils/index.js";
import { execute } from "@/api/system/dynamic";

export default {
  name: "SystemDept",
  components: {
    LayoutContent,
    TreeTable,
  },
  props: {},
  data() {
    return {
      depts: null,
      tableData: [],
      maps: new Map(),
      permission: {
        add: ["dept:add"],
        edit: ["dept:edit"],
        del: ["dept:del"],
      },
      header: "",
      columns: [],
      buttons: [
        {
          label: this.$t("commons.edit"),
          icon: "el-icon-edit",
          type: "primary",
          click: this.edit,
          show: this.checkPermission(["dept:edit"]),
        },
        {
          label: this.$t("commons.delete"),
          icon: "el-icon-delete",
          type: "danger",
          click: this._handleDelete,
          disabled: this.btnDisabled,
          show: this.checkPermission(["dept:del"]),
        },
      ],
      searchConfig: {
        useQuickSearch: true,
        quickPlaceholder: this.$t("organization.search_by_name"),
        components: [
          {
            field: "name",
            label: this.$t("organization.name"),
            component: "DeComplexInput",
          },
        ],
      },

      defaultCondition: {
        field: "pid",
        operator: "eq",
        value: 0,
      },
    };
  },
  mounted() {
    this.form = Object.assign({}, this.defaultForm);
    this.search();
    console.log("dept tree has inited");
  },

  methods: {
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
    create() {
      this.$router.push({ name: "system-dept-form" });
    },
    edit(row) {
      this.$router.push({ name: "system-dept-form", params: row });
    },

    search(condition) {
      var _this = this;

      condition = formatQuickCondition(condition, "name");
      var conditionExist = false;
      var temp = formatCondition(condition);
      this.tableData = [];
      var param = {};
      if (temp && temp.conditions && temp.conditions.length !== 0) {
        conditionExist = true;
        param = temp;
      } else {
        param = { conditions: [this.defaultCondition] };
      }
      this.executeAxios("/plugin/dept/search", "post", param, function (res) {
        var data = res.data;
        data = data.map(function (obj) {
          if (obj.subCount > 0) {
            obj.hasChildren = true;
          }
          return obj;
        });

        if (conditionExist) {
          data = data.map(function (node) {
            delete node.hasChildren;
            return node;
          });
          _this.tableData = _this.buildTree(data);
          _this.$nextTick(function () {
            data.forEach(function (node) {
              _this.$refs.table.toggleRowExpansion(node, true);
            });
          });
        } else {
          _this.tableData = data;
        }

        _this.depts = null;
      });
    },
    buildTree(arrs) {
      var idMapping = arrs.reduce(function (acc, el, i) {
        acc[el.deptId] = i;
        return acc;
      }, {});
      var roots = [];
      arrs.forEach(function (el) {
        if (el.pid === null || el.pid === 0) {
          roots.push(el);
          return;
        }
        var parentEl = arrs[idMapping[el.pid]];
        parentEl.children = [].concat(Array.from(parentEl.children || []), [
          el,
        ]);
      });
      return roots;
    },

    loadExpandDatas(row, treeNode, resolve) {
      var _this2 = this;

      this.executeAxios(
        "/plugin/dept/childNodes/" + row.deptId,
        "post",
        {},
        function (res) {
          var data = res.data;
          data = data.map(function (obj) {
            if (obj.subCount > 0) {
              obj.hasChildren = true;
            }
            return obj;
          });
          _this2.maps.set(row.deptId, {
            row: row,
            treeNode: treeNode,
            resolve: resolve,
          });
          resolve && resolve(data);
        }
      );
    },
    _handleDelete(organization) {
      var _this3 = this;

      this.$confirm(this.$t("organization.delete_confirm"), "", {
        confirmButtonText: this.$t("commons.confirm"),
        cancelButtonText: this.$t("commons.cancel"),
        type: "warning",
      })
        .then(function () {
          var requests = [
            { deptId: organization.deptId, pid: organization.pid },
          ];
          _this3.executeAxios(
            "/plugin/dept/delete",
            "post",
            requests,
            function (res) {
              _this3.$success(_this3.$t("commons.delete_success"));
              _this3.search();
              _this3.reloadByPid(organization.pid);
            }
          );
        })
        .catch(function () {
          _this3.$message({
            type: "info",
            message: _this3.$t("commons.delete_cancelled"),
          });
        });
    },
    reloadByPid(pid) {
      if (pid !== 0 && this.maps.get(pid)) {
        var _maps$get = this.maps.get(pid),
          row = _maps$get.row,
          treeNode = _maps$get.treeNode,
          resolve = _maps$get.resolve;

        this.$set(this.$refs.table.store.states.lazyTreeNodeMap, pid, []);
        this.loadExpandDatas(row, treeNode, resolve);
      }
    },
    btnDisabled(row) {
      return row.deptId === 1 || row.subCount > 0;
    },
    startDrag(ev) {
      ev.dataTransfer.setData("sourceId", ev.target.id);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    endDrag(ev) {
      ev.preventDefault();
      var targetId = ev.target.id;
      var sourceId = ev.dataTransfer.getData("sourceId");

      this.nodeMoveHandler(sourceId, targetId);
    },
    nodeMoveHandler(resourceId, targetId) {
      var _this4 = this;

      if (!resourceId || !targetId) return;
      resourceId = parseInt(resourceId);
      targetId = parseInt(targetId);
      var parent = this.getParent(resourceId);
      var pid = parent ? parent.id || parent.deptId : null;
      //   if (!pid) {
      //     return
      //   }
      // console.log('pid = ' + pid + ', targetId = ' + targetId)
      if (this.isParentNoChange(pid, targetId)) {
        this.$warning(this.$t("dept.can_not_move_change_sort"));
        return;
      }

      if (this.isParent2Children(resourceId, targetId)) {
        this.$warning(this.$t("dept.can_not_move_parent_to_children"));
        return;
      }
      var param = {
        resourceId: resourceId,
        targetId: targetId,
      };
      this.executeAxios("/plugin/dept/move", "post", param, function (res) {
        _this4.$success(_this4.$t("dept.move_success"));
        _this4.search();
        _this4.reloadByPid(targetId);
        if (pid) {
          _this4.reloadByPid(pid);
        }
      });
    },

    isParent2Children(resourceId, targetId) {
      var currentId = targetId;
      while (currentId) {
        if (resourceId === currentId) {
          return true;
        }
        var parent = void 0;
        if ((parent = this.getParent(currentId)) === null) {
          return false;
        }
        currentId = parent.id || parent.deptId;
      }
    },

    isParentNoChange(pid, targetId) {
      return pid === targetId;
    },

    getParent(id) {
      var currentNode = this.getNodeWithId(id);
      if (!currentNode || !currentNode.pid) {
        return null;
      }
      return this.getNodeWithId(currentNode.pid);
    },
    getNodeWithId(id) {
      for (var index = 0; index < this.tableData.length; index++) {
        var element = this.tableData[index];
        if ((element.id || element.deptId) === id) {
          return element;
        }
      }
      var lazyTreeNodeMap = this.$refs.table.store.states.lazyTreeNodeMap;
      for (var key in lazyTreeNodeMap) {
        if (Object.hasOwnProperty.call(lazyTreeNodeMap, key)) {
          var childNodes = lazyTreeNodeMap[key];
          for (var i = 0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if ((node.id || node.deptId) === id) {
              return node;
            }
          }
        }
      }
      return null;
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
  font-size: 14px;
}
.custom-node-auth-label {
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
