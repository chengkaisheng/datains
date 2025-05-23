<template>
  <layout-content
    v-loading="$store.getters.loadingMap[$store.getters.currentPath]"
    :header="header"
    :back-name="backName"
  >
    <el-form
      ref="roleForm"
      :model="form"
      :rules="rule"
      size="small"
      label-width="auto"
      label-position="right"
    >
      <!-- 名称 -->
      <el-form-item :label="$t('role.name')" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- 分组 -->
      <el-form-item :label="$t('role.roleGroup')" prop="roleGroup">
        <el-input v-model="form.roleGroup" />
      </el-form-item>
      <!-- 描述 -->
      <el-form-item :label="$t('role.description')" prop="description">
        <el-input type="textarea" v-model="form.description" />
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
import store from '@/store'

export default {
  name: "SystemRoleForm",
  components: {
    LayoutContent,
  },
  data() {
    return {
      header: "",
      backName: "",
      defaultForm: { name: null, roleGroup: null, description: null },
      form: {},
      rule: {
        name: [
          {
            required: true,
            message: this.$t("role.input_name"),
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: this.$t("commons.input_limit", [1, 50]),
            trigger: "blur",
          },
        ],
        roleGroup: [
          {
            required: true,
            message: this.$t("role.roleGroup_name"),
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
      roles: null,

      formType: "add",
      pLabel: this.$t("role.root_org"),
      page: 1,
      size: 100,
      managerOptions: [],
      loading: false,
      params: {},
    };
  },
  created() {
    // 获取角色信息
    this.getRoleById()
    if (
      this.$router.currentRoute.params &&
      this.$router.currentRoute.params.roleId
    ) {
      var row = this.$router.currentRoute.params;
      this.edit(row);
    } else {
      this.create();
    }
    this.setLoyoutInfo();
  },
  mounted() {
    this.bindKey();
  },
  destroyed() {
    this.unBindKey();
  },

  methods: {
    getRoleById() {
      let _this = this
      const roleIdList = store.getters.roles.map(item => item.id)
      // 如果是管理员就不进行 分组默认赋值
      if(roleIdList.length > 0 && roleIdList.findIndex(item => item === 1) === -1) {
        this.executeAxios(`/plugin/role/getRoleById/${roleIdList[0]}`, "get", {}, function (res) {
          console.log('res', res);
          
          if(res && res.data && res.data.roleGroup) {
            _this.form.roleGroup = res.data.roleGroup
          }
        });
      }
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
          ? this.$t("role.add")
          : this.$t("role.modify");
      this.backName = "system-role";
    },
    create() {
      this.formType = "add";
      this.form = Object.assign({}, this.defaultForm);
    },
    edit(row) {
      row.leaderId = null;
      this.formType = "modify";
      this.form = Object.assign({}, row);
    },
    reset() {
      if (this.formType !== "add") {
        var row = this.$router.currentRoute.params;
        this.edit(row);
      } else {
        this.$refs.roleForm.resetFields();
      }
    },
    save() {
      var _this2 = this;

      this.$refs.roleForm.validate(function (valid) {
        if (valid) {
          var url =
            _this2.formType === "add"
              ? "/plugin/role/create"
              : "/plugin/role/update";
          _this2.executeAxios(url, "post", _this2.form, function (res) {
            if (res.data && res.data === -2) {
              var msg =
                _this2.pLabel +
                _this2.$t("role.name_exist_pre") +
                _this2.form.name +
                _this2.$t("role.name_exist_suf");
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
      this.$router.push({ name: "system-role" });
    },
  },
};
</script>
