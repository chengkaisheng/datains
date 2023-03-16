<template>
  <div style="width: 100%;display: flex;justify-content: center;">
    <el-card class="box-card about-card">
      <div slot="header" class="clearfix license-header">
        <!-- <img src="@/assets/DataIns-white.png" alt="" width="300"> -->
      </div>
      <div class="license-content">
        <div v-if="license.status === 'Fail'">{{ $t('about.invalid_license') }}</div>
        <div v-if="license.status !== 'Fail'">
          <el-alert
            v-if="license.status === 'valid' && dateDecide"
            :title="`您的授权将在 ${manyDays} 后的 ${license.expired} 过期，为了不影响使用，请及时续费!`"
            type="info"
            show-icon
            style="margin-bottom: 10px;"
            :closable="false">
          </el-alert>
          <el-alert
            v-if="license.status === 'expired'"
            title="您的授权已将过期，请及时续费!"
            type="error"
            show-icon
            style="margin-bottom: 10px;"
            :closable="false">
          </el-alert>
          <el-row>
            <el-col class="col_box">
              <el-col :span="10" class="box_title">{{ $t('about.auth_to') }}：</el-col>
              <el-col :span="14">{{ license.corporation }}</el-col>
            </el-col>
            <el-col class="col_box">
              <el-col :span="10" class="box_title">{{ $t('about.expiration_time') }}：</el-col>
              <el-col :span="14">
                <label v-if="license.status === 'expired'" style="color: red">{{ license.expired }} {{ $t('about.expirationed') }}</label>
                <label v-if="license.status === 'valid'">{{ license.expired }}</label>
              </el-col>
            </el-col>
            <el-col class="col_box">
              <el-col :span="10" class="box_title">{{ $t('about.auth_num') }}：</el-col>
              <el-col :span="14">{{ license.count }}</el-col>
            </el-col>
            <el-col class="col_box">
              <el-col :span="10" class="box_title">{{ $t('about.version') }}：</el-col>
              <el-col :span="14">
                <span v-if="license.edition">
                  <span v-if="license.edition === 'Standard'">{{ $t('about.standard') }}</span>
                  <span v-if="license.edition === 'Enterprise'">{{ $t('about.enterprise') }}</span>
                </span>
              </el-col>
            </el-col>
            <el-col class="col_box">
              <el-col :span="10" class="box_title">{{ $t('about.version_num') }}：</el-col>
              <el-col :span="14">{{ build }}</el-col>
            </el-col>
          </el-row>
        </div>

        <div class="md-padding" />
        <div v-if="user.isAdmin" layout="row" layout-align="space-between center" class="lic_rooter">
          <el-upload
            action=""
            :multiple="false"
            :show-file-list="false"
            :file-list="fileList"
            accept=".key"
            name="file"
            :before-upload="beforeUpload"
          >
            <a class="md-primary pointer">{{ $t('about.update_license') }}</a>

          </el-upload>

          <a class="md-primary pointer" @click="support">{{ $t('about.suport') }}</a>

        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { validate, buildVersion, updateInfo } from '@/api/system/about'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      license: {},
      version: null,
      build: null,
      licenseKey: '',
      fileList: [],
      oldLic: {},
      headers: { Authorization: getToken() }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    manyDays() {
      let num = Math.ceil((new Date(this.license.expired).getTime() - new Date().getTime()) / (1000*3600*24))
      // console.log('几天',num)
      return num +'天'
    },
    dateDecide(){
      if(this.license.expired) {
        if((new Date(this.license.expired+' 00:00:00').getTime() - new Date().getTime()) > 1000*3600*24*7) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('app/toggleSideBarHide', true)
    })
  },
  created() {
    this.$store.dispatch('app/toggleSideBarHide', true)
    this.initVersion()
    this.getLicenseInfo()
  },
  methods: {
    initVersion() {
      buildVersion().then(res => {
        this.build = res.data
      })
    },
    getLicenseInfo() {
    //   validate({}).then(res => {
    //     this.license = this.getLicense(res.data)
    //     console.log(this.license)
    //   })
      this.validateHandler({}, res => {
        console.log('res.data',res.data)
        this.license = this.getLicense(res.data)
        this.oldLic = this.getLicense(res.data)
      })
    },
    validateHandler(param, success) {
      validate(param).then(success)
    },
    getLicense(result) {
      return {
        status: result.status,
        corporation: result.license ? result.license.corporation : '',
        expired: result.license ? result.license.expired : '',
        count: result.license ? result.license.count : '',
        version: result.license ? result.license.version : '',
        edition: result.license ? result.license.edition : ''
      }
    },
    importLic(file) {
      const reader = new FileReader()
      reader.onload = function(e) {
        this.licenseKey = e.target.result
        this.validateHandler({ license: this.licenseKey }, response => {
          this.updateLicense = this.getLicense(response.data)
          this.update()
        })
      }.bind(this)
      reader.readAsText(file)
    },
    update() {
      const param = { license: this.licenseKey }
      updateInfo(param).then(response => {
        if (response.data.status === 'valid') {
          this.$success(this.$t('about.update_success'))
          this.license = this.getLicense(response.data)
          // console.log('license数据',this.license)
          if(this.oldLic.status === 'expired') {
            setTimeout(() => {
              this.logOut()
            },100)
          }
        } else {
          this.$warning(response.data.message)
        }
      })
    },
    async logOut() {
      localStorage.clear()
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    support() {
      const url = 'http://mivicelab.com/'
      window.open(url, '_blank')
    },
    beforeUpload(file) {
      this.importLic(file)
      return false
    }

  }
}
</script>

<style lang="scss" scoped>
    .about-card {
        background: inherit;
        margin-top: 5%;
        flex-direction: row;
        width: 640px;
        min-width: 640px;
        height: 450px;
        position: relative;
        >>>div.el-card__header {
            padding: 0;
        }
    }
    .license-header {
        height: 100px;
        background-image: url('../../../assets/license_header.png');
        text-align: center;
        padding: 20px 0;
        background-size: 100% 100%;
    }

    .license-content {
        font-size: 16px;
        padding: 0px 20px;
        
        .col_box {
          margin-bottom: 10px;

          .box_title {
            text-align: right;
            padding-right: 5px;
            font-weight: bold;
          }
        }

        // >>>table {
        //     width: 100%;
        // }
        // >>>th {
        //     text-align: left;
        //     width: 45%;
        // }
        // >>>td {
        //     display: table-cell;
        //     vertical-align: inherit;
        // }
    }
    .md-padding {
        padding: 10px;
    }
    .lic_rooter {
        flex-direction: row;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        align-content: center;
        max-width: 100%;
        justify-content: space-between;

        >>>a{
            color: rgb(10,123,224);
            cursor: pointer;
        }
    }
</style>
