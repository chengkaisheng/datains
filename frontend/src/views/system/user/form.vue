<template>
  <layout-content :header="formType=='add' ? $t('user.create') : $t('user.modify')" back-name="system-user">
    <el-form ref="createUserForm" :model="form" :rules="rule" size="small" label-width="80px" label-position="right">
      <el-form-item label="ID" prop="username">
        <el-input v-model="form.username" :disabled="formType !== 'add'" />
      </el-form-item>
      <el-form-item :label="$t('commons.phone')" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item :label="$t('commons.nick_name')" prop="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <!-- <el-form-item :label="$t('commons.email')" prop="email">
        <el-input v-model="form.email" />
      </el-form-item> -->
      <!-- <el-form-item v-if="formType !== 'modify'" :label="$t('commons.password')" prop="password">
        <el-input v-model="form.password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item v-if="formType !== 'modify'" :label="$t('commons.confirmPassword')" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" autocomplete="off" show-password />
      </el-form-item> -->

      <el-form-item :label="$t('commons.gender')" prop="gender">
        <el-radio-group v-model="form.gender" style="width: 178px">
          <el-radio :label="$t('commons.man')">{{ $t('commons.man') }}</el-radio>
          <el-radio :label="$t('commons.woman')">{{ $t('commons.woman') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('commons.status')" prop="enabled">
        <el-radio-group v-model="form.enabled" :disabled="formType !== 'add' && form.isAdmin" style="width: 140px">
          <el-radio :label="1">{{ $t('commons.enable') }}</el-radio>
          <el-radio :label="0">{{ $t('commons.disable') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="isPluginLoaded" :label="$t('commons.organization')" prop="deptId">
        <treeselect
          ref="deptTreeSelect"
          v-model="form.deptId"
          :options="depts"
          :load-options="loadDepts"
          :auto-load-root-options="false"
          :placeholder="$t('user.choose_org')"
          :no-children-text="$t('commons.treeselect.no_children_text')"
          :no-options-text="$t('commons.treeselect.no_options_text')"
          :no-results-text="$t('commons.treeselect.no_results_text')"
          @open="filterData"
        />
      </el-form-item>
      <el-form-item v-show="isPluginLoaded" :label="$t('commons.role')" prop="roleIds">
        <el-select
          ref="roleSelect"
          v-model="form.roleIds"
          style="width: 100%"
          :disabled="formType !== 'add' && form.isAdmin"
          multiple
          :placeholder="$t('commons.please_select')"
          @remove-tag="deleteTag"
          @change="changeRole"
        >
          <el-option
            v-for="item in roles"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">{{ $t('commons.confirm') }}</el-button>
        <el-button @click="reset">{{ $t('commons.reset') }}</el-button>
      </el-form-item>
    </el-form>

  </layout-content>
</template>

<script>
import LayoutContent from '@/components/business/LayoutContent'
import { PHONE_REGEX } from '@/utils/validate'
import { getDeptTree, treeByDeptId } from '@/api/system/dept'
import { addUser, editUser, allRoles } from '@/api/system/user'
import { pluginLoaded } from '@/api/user'
export default {

  components: { LayoutContent },
  data() {
    return {
      form: {
        roles: [{
          id: ''
        }]
      },
      rule: {
        username: [
          { required: true, message: this.$t('user.input_id'), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('commons.input_limit', [1, 50]), trigger: 'blur' },
          {
            required: true,
            pattern: '^[^\u4e00-\u9fa5]+$',
            message: this.$t('user.special_characters_are_not_supported'),
            trigger: 'blur'
          },
          {
            required: true,
            validator: this.validateId,
            // message: this.$t('user.special_characters_are_not_supported'),
            trigger: 'blur'
          }
        ],
        nickName: [
          { required: true, message: this.$t('user.input_name'), trigger: 'blur' },
          { min: 2, max: 50, message: this.$t('commons.input_limit', [2, 50]), trigger: 'blur' },
          {
            required: true,
            message: this.$t('user.special_characters_are_not_supported'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            pattern: PHONE_REGEX,
            message: this.$t('user.mobile_number_format_is_incorrect'),
            trigger: 'blur'
          }
        ],
        email: [
          { required: false, message: this.$t('user.input_email'), trigger: 'blur' },
          {
            required: false,
            pattern: /^[a-zA-Z0-9_._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: this.$t('user.email_format_is_incorrect'),
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: this.$t('user.input_password'), trigger: 'blur' },
          {
            required: true,
            pattern: /^.{1,30}$/,
            message: this.$t('member.password_format_is_incorrect'),
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, message: this.$t('user.input_password'), trigger: 'blur' },
          { required: true, validator: this.repeatValidator, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: this.$t('user.input_password'), trigger: 'blur' },
          {
            required: true,
            pattern: /^.{1,30}$/,
            message: this.$t('member.password_format_is_incorrect'),
            trigger: 'blur'
          }
        ],
        roleIds: [{ required: true, message: this.$t('user.input_roles'), trigger: 'change' }],
        deptId: [],
        gender: [],
        enable: []

      },
      defaultForm: { id: null, username: null, nickName: null, gender: '男', email: null, enabled: 1, deptId: null, phone: null, roleIds: [2] },
      depts: null,
      roles: [],
      roleDatas: [],
      userRoles: [],
      formType: 'add',
      isPluginLoaded: false
    }
  },

  created() {
    if (this.$router.currentRoute.params && this.$router.currentRoute.params.id) {
      const row = this.$router.currentRoute.params
      this.edit(row)
    } else {
      this.create()
    }
    this.initRoles()
  },
  mounted() {
    this.bindKey()
  },
  destroyed() {
    this.unBindKey()
  },
  beforeCreate() {
    pluginLoaded().then(res => {
      this.isPluginLoaded = res.success && res.data
    })
  },
  methods: {
    // 校验身份证号
    validateId(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入身份证号'));  
      }
      this.checkId(value) ? callback() : callback(new Error('请输入正确的身份证号'));
    },
    checkId (val) {
      if(this.checkCode(val)) {
          let date = val.substring(6,14);
          if(this.checkDate(date)) {
              if(this.checkProv(val.substring(0,2))) {
                  return true;
              }
          }
      }
      return false;
    },
    checkCode (val) {
      let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
      let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
      let code = val.substring(17);
      if(p.test(val)) {
          let sum = 0;
          for(let i=0;i<17;i++) {
              sum += val[i]*factor[i];
          }
          if(parity[sum % 11] == code.toUpperCase()) {
              return true;
          }
      }
      return false;
    },
    checkDate (val) {
      let pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
      if(pattern.test(val)) {
          let year = val.substring(0, 4);
          let month = val.substring(4, 6);
          let date = val.substring(6, 8);
          let date2 = new Date(year+"-"+month+"-"+date);
          if(date2 && date2.getMonth() == (parseInt(month) - 1)) {
              return true;
          }
      }
      return false;
    },
    checkProv (val) {
      let pattern = /^[1-9][0-9]/;
      let provs = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门"};
      if(pattern.test(val)) {
          if(provs[val]) {
              return true;
          }
      }
      return false;
    },
    entryKey(event) {
      const keyCode = event.keyCode
      if (keyCode === 13) {
        this.save()
      }
    },
    bindKey() {
      document.addEventListener('keypress', this.entryKey)
    },
    unBindKey() {
      document.removeEventListener('keypress', this.entryKey)
    },
    repeatValidator(rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error(this.$t('member.inconsistent_passwords')))
      } else {
        callback()
      }
    },
    create() {
      this.depts = null
      this.formType = 'add'
      this.form = Object.assign({}, this.defaultForm)
      // console.log(this.form)
    },
    edit(row) {
      this.depts = null
      this.formType = 'modify'
      this.dialogVisible = true
      this.form = Object.assign({}, row)
      this.form.password = ''
      if (this.form.deptId === 0) {
        this.form.deptId = null
      }
      this.initDeptTree()
    },
    initRoles() {
      allRoles().then(res => {
        this.roles = res.data
      })
    },
    initDeptTree() {
      treeByDeptId(this.form.deptId || 0).then(res => {
        const results = res.data.map(node => {
          if (node.hasChildren && !node.children) {
            node.children = null
            // delete node.children
          }
          return node
        })
        this.depts = results
      })
    },
    // 获取弹窗内部门数据
    loadDepts({ action, parentNode, callback }) {
      if (action === 'LOAD_ROOT_OPTIONS' && !this.form.deptId) {
        const _self = this
        treeByDeptId(0).then(res => {
          const results = res.data.map(node => {
            if (node.hasChildren && !node.children) {
              node.children = null
            }
            return node
          })
          _self.depts = results
          callback()
        })
      }

      if (action === 'LOAD_CHILDREN_OPTIONS') {
        const _self = this
        getDeptTree(parentNode.id).then(res => {
          parentNode.children = res.data.map(function(obj) {
            return _self.normalizer(obj)
          })
          callback()
        })
      }
    },
    normalizer(node) {
      if (node.hasChildren) {
        node.children = null
      }
      return {
        id: node.deptId,
        label: node.name,
        children: node.children
      }
    },
    deleteTag(value) {
      this.userRoles.forEach(function(data, index) {
        if (data.id === value) {
          this.userRoles.splice(index, value)
        }
      }.bind(this))
    },
    changeRole(value) {
      this.userRoles = []
      value.forEach(function(data, index) {
        const role = { id: data }
        this.userRoles.push(role)
      }.bind(this))
    },
    reset() {
      this.$refs.createUserForm.resetFields()
    },
    save() {
      this.$refs.createUserForm.validate(valid => {
        if (valid) {
          // !this.form.deptId && (this.form.deptId = 0)
          const method = this.formType === 'add' ? addUser : editUser
          method(this.form).then(res => {
            this.$success(this.$t('commons.save_success'))
            this.backToList()
          })
        } else {
          return false
        }
      })
    },
    backToList() {
      this.$router.push({ name: 'system-user' })
    },
    filterData(instanceId) {
      this.$refs.roleSelect && this.$refs.roleSelect.blur && this.$refs.roleSelect.blur()
      if (!this.depts) {
        return
      }
      const results = this.depts.map(node => {
        if (node.hasChildren) {
          node.children = null
        }
        return node
      })
      this.depts = results
    }
  }
}
</script>
