<template>
  <div ref="myplayer" class="main-frame">
    <!-- <div :id="myPlayerKu" :ref="myPlayerKu" style="width: 100%;height: 100%;"></div> -->
    <!-- <div v-if="element.options.devId" class="main-frame">
      <iframe v-if="kframeShow" :id="'iframe'+element.id" :src="`./static/kmediauni/index.html?device_id=${element.options.devId}`" frameborder="0" scrolling="auto" class="main-frame"></iframe>
    </div> -->
  </div>
</template>
<script>
// import {default as KMediaUni} from '@/utils/kmedia-uni'
// import {default as KMedia} from '@/utils/kmedia-uni'
export default {
  name: 'DeKmediaUni',
  props: {
    element: {
      type: Object
    },
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
      },
    }
  },
  created() {
    let timestamp = new Date().getTime()
    this.myPlayerKu = 'myPlayerKu'+timestamp
  },
  mounted() {
    if(!this.element.options.devId) return false
    this.pOption = this.element.options
    // this.initOptionKu(this.pOption)
  },
  methods: {
    initOptionKu(option) {
      console.log('这个值，，，',option)
      const MODE = KMediaUni.MODE
      this.player = new KMediaUni({
        selector: this.myPlayerKu,
        loading: true,
        showMessage: true,
        control: {
          hideControlsBar: false,
          tools: Object.values(KMediaUni.TOOLS)
        }
      });
      this.timer = setInterval(() => {
        this.loadVideo(true)
      }, 200);
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
        autoplay:true
      });
    },
    exec(cmd,...args){
      if(this.player && this.player[cmd]) {
        this.player[cmd](...args);
      }else {
        console.error('not find', cmd)
      }
    },
  },
  beforeDestroy() {
    this.exec('loadVideo')
    this.timer && clearInterval(this.timer)
  }
}
</script>
<style scoped>
.main-frame {
  width: 100%;
  height: 100%;
}
</style>