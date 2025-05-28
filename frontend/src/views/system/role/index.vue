<template>
  <layout-content
    v-loading="$store.getters.loadingMap[$store.getters.currentPath]"
  >
    <complex-table
      highlight-current-row
      :data="tableData"
      :columns="columns"
      local-key="roleGrid"
      :search-config="searchConfig"
      @search="search"
      @sort-change="sortChange"
      :pagination-config="paginationConfig"
    >
      <!-- 工具栏 slot -->
      <template #toolbar>
        <el-button
          v-permission="['role:add']"
          icon="el-icon-circle-plus-outline"
          @click="create"
        >
          {{ $t("role.add") }}
        </el-button>
        <el-button
          @click="syncRoleToQyy"
        >
          {{ $t("role.syncRoleToQyy") }}
        </el-button>
      </template>

      <!-- 分页 slot -->
      <!-- <template #sourcepage>
        <el-pagination
          :current-page="paginationConfig.currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="paginationConfig.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationConfig.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template> -->

      <!-- 表格列 -->
      <el-table-column
        prop="name"
        :sortable="'custom'"
        :label="$t('commons.name')"
      />

      <el-table-column
        prop="roleGroup"
        :label="$t('role.roleGroup')"
        show-overflow-tooltip
      />

      <el-table-column
        prop="description"
        :label="$t('commons.description')"
        show-overflow-tooltip
      />

      <el-table-column
        prop="createTime"
        :sortable="'custom'"
        :label="$t('commons.create_time')"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{
            $options.filters.timestampFormatDate(scope.row.createTime)
          }}</span>
        </template>
      </el-table-column>

      <!-- 操作列组件 -->
      <fu-table-operations
        :buttons="buttons"
        :label="$t('commons.operating')"
        fix
      />
    </complex-table>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/business/LayoutContent";
import ComplexTable from '@/components/business/complex-table'
import { formatCondition, formatQuickCondition, addOrder, formatOrders } from '@/utils/index'
import { execute, get } from "@/api/system/dynamic";

export default {
  name: "SystemRole",
  components: {
    LayoutContent,
    ComplexTable,
  },
  props: {},
  data() {
    return {
      tableData: [],

      permission: {
        add: ["role:add"],
        edit: ["role:edit"],
        del: ["role:del"],
      },
      header: "",
      columns: [],
      buttons: [
        {
          //   label: this.$t('commons.edit'), icon: 'el-icon-edit', click: this.edit
          label: this.$t("commons.edit"),
          icon: "el-icon-edit",
          type: "primary",
          click: this.edit,
          disabled: this.btnDisabled,
          show: this.checkPermission(["role:edit"]),
        },
        {
          label: this.$t("commons.delete"),
          icon: "el-icon-delete",
          type: "danger",
          click: this.handleDelete,
          disabled: this.btnDisabled,
          show: this.checkPermission(["role:del"]),
        },
      ],
      searchConfig: {
        useQuickSearch: true,
        quickPlaceholder: this.$t("role.search_by_name"),
        components: [
          {
            field: "name",
            label: this.$t("role.role_name"),
            component: "DeComplexInput",
          },
        ],
      },
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      orderConditions: [],
      last_condition: null,
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    // handleSizeChange(val) {
    //   this.paginationConfig.pageSize = val;
    //   this.search(this.last_condition);
    // },
    // handleCurrentChange(val) {
    //   this.paginationConfig.currentPage = val;
    //   this.search(this.last_condition);
    // },
    sortChange(_ref) {
      var column = _ref.column,
        prop = _ref.prop,
        order = _ref.order;

      this.orderConditions = [];
      if (!order) {
        this.search(this.last_condition);
        return;
      }
      addOrder({ field: prop, value: order }, this.orderConditions)
      this.search(this.last_condition);
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
    create() {
      this.$router.push({ name: "system-role-form" });
    },
    edit(row) {
      this.$router.push({ name: "system-role-form", params: row });
    },
    search(condition) {
      var _this = this;

      this.last_condition = condition;
      condition = formatQuickCondition(condition, "name");
      var temp = formatCondition(condition);
      var param = temp || {};
      param['orders'] = formatOrders(this.orderConditions)
      var url =
        "/plugin/role/roleGrid/" +
        this.paginationConfig.currentPage +
        "/" +
        this.paginationConfig.pageSize;
      this.executeAxios(url, "post", param, function (response) {
        var data = response.data;
        _this.total = data.itemCount;
        _this.paginationConfig.total = data.itemCount;
        _this.tableData = data.listObject;
      });
    },
    handleDelete(row) {
      var _this2 = this;

      //   this.$confirm(this.$t('commons.confirm_delete') + ': ' + row.name + 'ï¼Ÿ', this.$t('role.tips'), {
      this.$confirm(
        this.$t("role.confirm_delete") + ": " + row.name + "?",
        this.$t("role.tips"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(function () {
          _this2.executeAxios(
            "/plugin/role/delete/" + row.roleId,
            "post",
            {},
            function (res) {
              //   this.$success(this.$t('commons.modify_success'))
              _this2.$success(_this2.$t("commons.delete_success"));
              _this2.search();
            }
          );
        })
        .catch(function () {});
    },
    btnDisabled(row) {
      // return !row.updateTime;
      // 管理员角色禁止操作，其他角色可以进行操作
      return row.roleId === 1;
    },
    syncRoleToQyy() {
      this.$confirm('确认同步角色到轻应用？', '同步角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        get("/plugin/role/syncRoleToQyy").then(res => {
          // console.log('res', res);
          if(res.success) {
            // 用户点击确定时的回调
            this.$message({
              type: 'success',
              message: res.message
            });
          }
        })
      }).catch(() => {
        // 用户点击取消时的回调
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      
    }
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
