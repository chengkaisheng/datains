<template>
  <layout-content
    v-loading="$store.getters.loadingMap[$store.getters.currentPath]"
    :header="header"
    :back-name="backName"
  >
    <el-form
      ref="deptForm"
      :model="form"
      :rules="rule"
      size="small"
      label-width="auto"
      label-position="right"
    >
      <!-- 部门名称 -->
      <el-form-item :label="$t('organization.name')" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <!-- 部门排序 -->
      <el-form-item :label="$t('organization.sort')" prop="deptSort">
        <el-input-number
          v-model="form.deptSort"
          :min="0"
          :max="999"
          controls-position="right"
        />
      </el-form-item>

      <!-- 是否顶级部门 -->
      <el-form-item :label="$t('organization.top_org')" prop="top">
        <el-radio-group v-model="form.top" @change="topChange">
          <el-radio :label="true">
            {{ $t("commons.yes") }}
          </el-radio>
          <el-radio :label="false">
            {{ $t("commons.no") }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 上级部门选择 (非顶级部门时显示) -->
      <el-form-item
        v-if="!form.top"
        :label="$t('organization.parent_org')"
        prop="pid"
      >
        <treeselect
          ref="treeSelect"
          v-model="form.pid"
          :auto-load-root-options="false"
          :load-options="loadDepts"
          :options="depts"
          :placeholder="$t('organization.select_parent_org')"
          @select="nodeChange"
        />
      </el-form-item>

      <!-- 组织负责人 -->
      <el-form-item :label="$t('organization.manager_org')" prop="manager">
        <el-select
          :placeholder="$t('organization.select_manager')"
          v-model="form.leaderId"
          clearable
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading"
          @focus="getManagerOptions"
        >
          <el-option
            v-for="item in managerOptions"
            :key="item.id"
            :label="`${item.nickName}（${item.username}）`"
            :value="item.id"
            :disabled="item.enabled === 0"
          />
        </el-select>
      </el-form-item>

      <!-- 表单按钮 -->
      <el-form-item>
        <el-button type="primary" @click="save">
          {{ $t("commons.save") }}
        </el-button>
        <el-button @click="reset">
          {{ $t("commons.reset") }}
        </el-button>
      </el-form-item>
    </el-form>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/business/LayoutContent";
import { execute } from "@/api/system/dynamic";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { userLists } from "@/api/system/user";

export default {
  name: "SystemDeptForm",
  components: {
    Treeselect,
    LayoutContent,
  },
  data() {
    return {
      header: "",
      backName: "",
      defaultForm: { deptId: null, top: true, pid: null, leaderId: null },
      maps: new Map(),
      form: {},
      rule: {
        name: [
          {
            required: true,
            message: this.$t("organization.input_name"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 25,
            message: this.$t("commons.input_limit", [2, 25]),
            trigger: "blur",
          },
        ],
        description: [
          {
            max: 50,
            message: this.$t("commons.input_limit", [0, 50]),
            trigger: "blur",
          },
        ],
      },
      depts: null,

      formType: "add",
      pLabel: this.$t("dept.root_org"),
      page: 1,
      size: 100,
      managerOptions: [],
      loading: false,
      params: {},
    };
  },
  created() {
    if (
      this.$router.currentRoute.params &&
      this.$router.currentRoute.params.deptId
    ) {
      var row = this.$router.currentRoute.params;
      this.edit(row);
      // 获取组织负责人
      this.getLeaderId();
    } else {
      this.create();
    }
    this.setLoyoutInfo();
    // 获取用户
    this.getManagerOptions();
  },
  mounted() {
    this.bindKey();
  },
  destroyed() {
    this.unBindKey();
  },

  methods: {
    getLeaderId() {
      this.executeAxios(`/plugin/dept/getDeptLeader/${this.$router.currentRoute.params.deptId}`, "get", {}, (res) => {
        if(res && res.data && res.data.length > 0) {
          this.form.leaderId = res.data[0].userId;
        }
      });
    },
    getManagerOptions() {
      this.loading = true;
      userLists(this.page, this.size, {}).then((response) => {
        this.managerOptions = response.data.listObject;
        this.loading = false;
      });
    },
    remoteMethod(query) {
      this.loading = true;
      this.params = {
        conditions: [
          {
            field: "nick_name",
            operator: "like",
            value: query,
          },
        ],
        orders: [],
      };
      userLists(this.page, this.size, this.params).then((response) => {
        this.managerOptions = response.data.listObject;
        this.loading = false;
      });
    },
    entryKey(event) {
      var keyCode = event.keyCode;
      if (keyCode === 13) {
        this.save();
      }
    },
    bindKey() {
      document.addEventListener("keypress", this.entryKey);
    },
    unBindKey() {
      document.removeEventListener("keypress", this.entryKey);
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
    setLoyoutInfo() {
      this.header =
        this.formType === "add"
          ? this.$t("organization.create")
          : this.$t("organization.modify");
      this.backName = "system-dept";
    },
    create() {
      this.formType = "add";
      this.form = Object.assign({}, this.defaultForm);
    },
    edit(row) {
      row.leaderId = null;
      this.formType = "modify";
      this.form = Object.assign({}, row);
      this.initDeptTree();
    },
    initDeptTree() {
      var _this = this;

      this.executeAxios(
        "/plugin/dept/nodesByDeptId/" + (this.form.pid || 0),
        "post",
        {},
        function (res) {
          var results = res.data.map(function (node) {
            if (node.hasChildren && !node.children) {
              node.children = null;
            }
            return node;
          });
          _this.depts = results;
        }
      );
    },

    loadDepts(_ref) {
      var action = _ref.action,
        parentNode = _ref.parentNode,
        callback = _ref.callback;

      if (action === "LOAD_ROOT_OPTIONS" && !this.form.pid) {
        var _self = this;
        this.executeAxios(
          "/plugin/dept/nodesByDeptId/" + 0,
          "post",
          {},
          function (res) {
            var results = res.data.map(function (node) {
              if (node.hasChildren && !node.children) {
                node.children = null;
              }
              return node;
            });
            _self.depts = _self.excludeSelf(results);
            callback();
          }
        );
      }

      if (action === "LOAD_CHILDREN_OPTIONS") {
        var _self2 = this;
        this.executeAxios(
          "/plugin/dept/childNodes/" + parentNode.id,
          "post",
          {},
          function (res) {
            var kids = res.data.map(function (obj) {
              return _self2.normalizer(obj);
            });

            parentNode.children = _self2.excludeSelf(kids);
            callback();
          }
        );
      }
    },
    normalizer(node) {
      if (node.hasChildren) {
        node.children = null;
      }
      return {
        id: node.deptId,
        label: node.name,
        children: node.children,
      };
    },
    topChange(value) {
      if (!value) {
        this.form.pid = null;
        this.depts = null;
        this.pLabel = this.$t("dept.root_org");
      }
    },
    reset() {
      if (this.formType !== "add") {
        var row = this.$router.currentRoute.params;
        this.edit(row);
      } else {
        this.$refs.deptForm.resetFields();
      }
    },
    save() {
      var _this2 = this;

      this.$refs.deptForm.validate(function (valid) {
        if (valid) {
          var url =
            _this2.formType === "add"
              ? "/plugin/dept/create"
              : "/plugin/dept/update";
          _this2.executeAxios(url, "post", _this2.form, function (res) {
            if (res.data && res.data === -2) {
              var msg =
                _this2.pLabel +
                _this2.$t("dept.name_exist_pre") +
                _this2.form.name +
                _this2.$t("dept.name_exist_suf");
              _this2.$warning(msg);
              return;
            }
            _this2.$success(_this2.$t("commons.save_success"));
            _this2.backToList();
          });
        } else {
          return false;
        }
      });
    },
    backToList() {
      this.$router.push({ name: "system-dept" });
    },
    excludeSelf(nodes) {
      var _this3 = this;

      if (this.formType !== "modify") return nodes;
      nodes.forEach(function (node) {
        return node.id === _this3.form.deptId && (node.isDisabled = true);
      });
      return nodes;
    },
    nodeChange(node, instanceId) {
      if (node.label) {
        this.pLabel = node.label;
      }
      // console.log(node)
      console.log(instanceId);
    },
  },
};
</script>
