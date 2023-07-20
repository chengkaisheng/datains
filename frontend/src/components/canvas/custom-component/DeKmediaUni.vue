<template>
  <div ref="myplayer" class="main-frame">
    <!-- <div :id="myPlayerKu" :ref="myPlayerKu" style="width: 100%;height: 100%;"></div> -->
    <div v-if="element.options.devId" class="main-frame">
      <iframe
        v-if="kframeShow"
        :id="'iframe'+element.id"
        :src="`/kmedia-uni/index.html?device_id=${element.options.devId}`"
        frameborder="0"
        scrolling="auto"
        class="main-frame"
      />
      <div v-if="editMode==='edit'" class="frame-mask">
        <span style="opacity: 1;">
          <span style="font-weight: bold;color: lawngreen;">{{ $t('panel.edit_web_tips') }}</span>
        </span>
      </div>
      <div v-if="screenShot" class="frame-mask" />
    </div>
  </div>
</template>
<script>
// import {default as KMediaUni} from '@/utils/kmedia-uni'
// import {default as KMedia} from '@/utils/kmedia-uni'
import bus from '@/utils/bus'
export default {
  name: 'DeKmediaUni',
  props: {
    element: {
      type: Object
    },
    editMode: {
      type: String,
      require: false,
      default: 'edit'
    },
    screenShot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      kframeShow: true,
      player: null,
      myPlayerKu: null,
      pOption: {},
      timer: null,
      defaultValue: {
        websocketUrl: 'ws://2.40.54.28',
        devId: '32050800001326000009',
        nmediaId: '',
        startTime: '2021-06-04T00:00:00',
        endTime: '2021-06-05T00:00:00'
      }
    }
  },
  watch: {
    element: {
      handler(val1, val2) {
        this.kframeShow = false
        this.$nextTick(() => {
          this.kframeShow = true
        })
      },
      deep: true
    }
  },
  created() {
    const timestamp = new Date().getTime()
    this.myPlayerKu = 'myPlayerKu' + timestamp
  },
  mounted() {
    if (!this.element.options.devId) return false
    this.pOption = this.element.options

    bus.$on('frameLinksChange-' + this.element.id, () => {
      this.kframeShow = false
      this.$nextTick(() => {
        this.kframeShow = true
      })
    })
    // this.initOptionKu(this.pOption)
  },
  beforeDestroy() {
    this.exec('loadVideo')
    this.timer && clearInterval(this.timer)
  },
  methods: {
    initOptionKu(option) {
      const MODE = KMediaUni.MODE
      this.player = new KMediaUni({
        selector: this.myPlayerKu,
        loading: true,
        showMessage: true,
        control: {
          hideControlsBar: false,
          tools: Object.values(KMediaUni.TOOLS)
        }
      })
      this.timer = setInterval(() => {
        this.loadVideo(true)
      }, 200)
    },
    loadVideo(isLive) {
      this.player.loadVideo({
        src: {
          ...defaultValue,
          ...(
            isLive
              ? {
                startTime: undefined,
                endTime: undefined
              }
              : {}
          )
        },
        autoplay: true,
        muted: true
      })
    },
    exec(cmd, ...args) {
      if (this.player && this.player[cmd]) {
        this.player[cmd](...args)
      } else {
        console.error('not find', cmd)
      }
    }
  }
}
</script>
<style scoped>
.main-frame {
  width: 100%;
  height: 100%;
}
.frame-mask {
    display: flex;
    height: 100%!important;
    width: 100% !important;
    background-color: #5c5e61;
    opacity: 0.5;
    position:absolute;
    top:0px;
    left: 0px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
