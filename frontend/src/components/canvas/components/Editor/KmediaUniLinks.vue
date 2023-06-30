<template>
  <el-popover
    ref="popover"
    width="400"
    trigger="click"
  >
    <el-row style="margin-top: 20px;">
      <el-form ref="form" size="mini" label-width="70px">
        <el-form-item label="devId：">
          <el-input v-model="kmediaLinks.devId" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ $t('panel.confirm') }}</el-button>
          <el-button @click="onClose">{{ $t('panel.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <i slot="reference" class="icon iconfont icon-chaolianjie" />
  </el-popover>
</template>
<script>
import { mapState } from 'vuex'
import { deepCopy } from '@/components/canvas/utils/utils'
import bus from '@/utils/bus'

export default {
  props: {
    linkInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      kmediaLinks: {}
    }
  },
  computed: {
    ...mapState([
      'curComponent'
    ])
  },
  watch: {
    linkInfo: {
      handler: function() {
        this.init()
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.kmediaLinks = deepCopy(this.linkInfo)
    },
    onSubmit() {
      this.curComponent.options = this.kmediaLinks
      this.$store.state.styleChangeTimes++
      bus.$emit('kmediauniLinksChange-' + this.curComponent.id)
      this.popoverClose()
    },
    onClose() {
      this.$emit('close')
      this.popoverClose()
    },
    popoverClose() {
      this.$refs.popover.showPopper = false
    }
  }
}
</script>
<style scoped>

</style>
