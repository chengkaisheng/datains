<template>
  <div id="app" ref="containerS">
    <router-view />
    <plugin-com v-show="false" ref="de-theme" component-name="ThemeSetting" />
  </div>
</template>

<script>
import PluginCom from '@/views/system/plugin/PluginCom'
import Watermark from '@/utils/waterMark'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'App',
  components: { PluginCom },
  beforeCreate() {

  },
  watch: {
    $route(to, from) {
      let username = String(this.user.username).slice(-8)
      const nameS = this.user.nickName + '\n' + username + '\n' + moment().format('YYYYMMDD')
      this.$nextTick(function() {
        Watermark.set(nameS, this.$refs.containerS)
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    const attachParams = this.getQueryVariable('attachParams')
    console.log('attachParams,,,',attachParams)
    localStorage.setItem('permissionId',attachParams)
    let username = String(this.user.username).slice(-8)
    const nameS = this.user.nickName + '\n' + username + '\n' + moment().format('YYYYMMDD')
    this.$nextTick(function() {
      Watermark.set(nameS, this.$refs.containerS)
    })
  },
  methods: {
    // 使用utils中的getQueryVariable函数，避免重复代码
    getQueryVariable(variable) {
      return this.$utils.getQueryVariable(variable)
    }
  }
}
</script>

