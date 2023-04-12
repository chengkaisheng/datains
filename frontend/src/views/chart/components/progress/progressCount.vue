<template>
    <div ref="chartContainer" style="padding: 0;width: 100%;height: 100%;overflow: hidden;">
      <view-track-bar
        ref="viewTrack"
        :track-menu="trackMenu"
        class="track-bar"
        :style="trackBarStyleTime"
        @trackClick="trackClick"
      />
      <span v-if="chart.type" v-show="title_show" ref="title" :style="title_class" style="cursor: default;display: block;">
        {{ chart.title }}
      </span>
      <div v-if="chart.data && show_Prog" :id="chartId" style="width: 100%;overflow: auto;" :style="box_chart">
        <el-row class="prog_box">
          <el-col v-for="item in progressData" :key="item.value" :style="{marginBottom: colMargin}">
            <el-col :span="progStyle.position === 'top'? 24 : 6" :style="{fontSize: progStyle.fontSize,color: progStyle.color,fontFamily: progStyle.fontFamily}">
              <div class="prog_title" :title="item.name">{{item.name}}</div>
            </el-col>
            <el-col :span="progStyle.position === 'top'? 24 : 18">
              <el-progress :text-inside="progStyle.inside" :color="item.color" 
                :stroke-width="progStyle.strokeWidth" :percentage="item.value>100?100:item.value" 
              :format="formatValue(item.value)" :style="labelStyle">
              </el-progress>
              <el-col :style="{marginTop: dataMargin}">
                <el-col :span="11" style="text-align: left;" :style="dataStyle" class="prog_filed" :title="item.filed1">
                  {{item.filed1}}
                </el-col>
                <el-col :span="11" style="text-align: right;" :style="dataStyle" class="prog_filed" :title="item.filed2">
                  {{item.filed2}}
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import {
    uuid
  } from 'vue-uuid'
  import { hexColorToRGBA } from '@/views/chart/chart/util'
  import ViewTrackBar from '@/components/canvas/components/Editor/ViewTrackBar'
  
  export default {
    name: 'progressCount',
    components: {
      ViewTrackBar
    },
    props: {
      element: {
        type: Object,
        required: true
      },
      chart: {
        type: Object,
        required: true
      },
      filter: {
        type: Object,
        required: false,
        default: function() {
          return {}
        }
      },
      trackMenu: {
        type: Array,
        required: false,
        default: function() {
          return ['drill']
        }
      },
      searchCount: {
        type: Number,
        required: false,
        default: 0
      },
      terminalType: {
        type: String,
        default: 'pc'
      }
    },
    data() {
      return {
        chartId: uuid.v1(),
        cleWidth: 80,
        mgHeight: '0px',
        trackBarStyle: {
          position: 'absolute',
          left: '0px',
          top: '0px'
        },
        borderRadius: '0px',
        title_show: true,
        title_class: {
          margin: '0 0',
          width: '100%',
          fontSize: '18px',
          color: '#303133',
          textAlign: 'left',
          fontStyle: 'normal',
          fontWeight: 'normal',
          background: hexColorToRGBA('#ffffff', 0),
          fontFamily:  ''
        },
        chartHeight: '100%',
        show_Prog: false,
        // progressData: {
        //   name: '',
        //   value: '',
        // },
        progressData: [],
        customColor: '#409eff',
        progStyle: {
          fontSize: '14px',
          color: '#000000',
          fontFamily: '',
          inside: true,
          strokeWidth: 20,
          position: 'top'
        },
        labelStyle: {
          color: '#000000',
          fontSize: '14px',
        },
        box_chart: { 
          borderRadius: '0px',
          height: 'calc(100% - 30px)',
        },
        progressLevel: 5,
        dataStyle: {
          color: '#000000',
          fontSize: '14px',
        },
        dataMargin: '0px',
        colMargin: '10px',
      }
    },
    computed: {
      trackBarStyleTime() {
        return this.trackBarStyle
      },
      ...mapState([
        'canvasStyleData',
      ])
    },
    watch: {
      chart: {
        handler(newVal,oldVal){
          this.preDraw()
        },
        deep: true
      }
    },
    mounted() {
      this.preDraw()
    },
    methods: {
      chartResize() {
        this.calcHeightDelay()
      },
      trackClick(trackAction) {
        const param = this.pointParam
        if (!param || !param.data || !param.data.dimensionList) {
          // 地图提示没有关联字段 其他没有维度信息的 直接返回
          if (this.chart.type === 'map') {
            this.$warning(this.$t('panel.no_drill_field'))
          }
          return
        }
        const linkageParam = {
          option: 'linkage',
          viewId: this.chart.id,
          dimensionList: this.pointParam.data.dimensionList,
          quotaList: this.pointParam.data.quotaList
        }
        const jumpParam = {
          option: 'jump',
          viewId: this.chart.id,
          dimensionList: this.pointParam.data.dimensionList,
          quotaList: this.pointParam.data.quotaList
        }
        switch (trackAction) {
          case 'drill':
            this.$emit('onChartClick', this.pointParam)
            break
          case 'linkage':
            this.$store.commit('addViewTrackFilter', linkageParam)
            break
          case 'jump':
            this.$emit('onJumpClick', jumpParam)
            break
          default:
            break
        }
      },
      preDraw() {
        this.initTitle()
        this.calcHeightDelay()
        new Promise((resolve) => { resolve() }).then(() => {
          this.drawView()
        })
      },
  
      drawView() {
        const chart = this.chart
        console.log('chart数据',chart)
        const xaxis = JSON.parse(chart.xaxis)
        let fed = []
        xaxis.map(item => {
          if(item.checked){
            fed.push(item.id)
          }
        })
        console.log('feddd',fed)

        if(chart.data) {
          if(chart.data.fields.length && chart.data.series.length === 2) {
            this.show_Prog = true
          }else {
            this.show_Prog = false
            return
          }
          if(chart.data.series.length === 2) {
            const data1 = chart.data.series[0].data
            const name1 = chart.data.series[0].name
            const data2 = chart.data.series[1].data
            const name2 = chart.data.series[1].name
            const customAttr = JSON.parse(chart.customAttr)
            this.progressLevel = customAttr.color.progressLevel? customAttr.color.progressLevel : 5

            let arr1 = []
            for(let i=0;i<data1.length;i++) {
              let obj = data1[i]
              let a = ""
              let b = ""
              if(fed.length === 2) {
                a = obj.dimensionList[0].value
                b = '/'+obj.dimensionList[1].value
              } else if (fed.length === 1) {
                if(fed.indexOf(obj.dimensionList[0].id) !== -1) {
                  a = obj.dimensionList[0].value
                  b = ''
                } else {
                  a = ''
                  b = obj.dimensionList[1].value
                }
              }
              arr1.push({
                name: a+''+b,
                value: obj.value,
              })
            }
            let arr2 = []
            for(let i=0;i<data2.length;i++) {
              let obj = data2[i]
              arr2.push({
                value: obj.value,
              })
            }
            let colors = []
            for(let k=0;k<this.progressLevel;k++) {
              colors.push({
                color: hexColorToRGBA(customAttr.color.colors[k],customAttr.color.alpha),
                percentage: parseInt(100/this.progressLevel)*(1+k)
              })
            }
            // console.log(arr1,arr2,colors)
            let arr = []
            for(let j=0;j<arr2.length;j++) {
              let v = 0
              if(parseFloat(arr2[j].value) <= 0) {
                if(parseFloat(arr1[j].value) <= 0 ) {
                  v = 0
                } else {
                  v = (parseFloat(arr1[j].value)*100).toFixed(2)
                }
              } else {
                v =  parseFloat(
                  ((parseFloat(arr1[j].value)/parseFloat(arr2[j].value))*100
                ).toFixed(2))
              }
              
              let obj = {
                name: arr1[j].name,
                value: v,
                filed1: name1+': '+arr1[j].value,
                filed2: name2+': '+arr2[j].value,
                color: colors,
              }
              arr.push(obj)
            }
            this.progressData = arr
            console.log('progressData,,,',this.progressData)
          }
        }
      },
  
      // title and bg
      initTitle() {
        if (this.chart.customStyle) {
          const customStyle = JSON.parse(this.chart.customStyle)
          // console.log('customStyle,progress',customStyle)
          if (customStyle.text) {
            this.title_show = customStyle.text.show
            // this.title_class.fontSize = customStyle.text.fontSize + 'px'
            this.title_class.color = customStyle.text.color
            this.title_class.textAlign = customStyle.text.hPosition
            this.title_class.fontStyle = customStyle.text.isItalic ? 'italic' : 'normal'
            this.title_class.fontWeight = customStyle.text.isBolder ? 'bold' : 'normal'
            this.title_class.fontFamily = customStyle.text.fontFamily? customStyle.text.fontFamily 
              : this.canvasStyleData.fontFamily? this.canvasStyleData.fontFamily : ''
  
            if (this.$refs.title) {
              this.$refs.title.style.fontSize = customStyle.text.fontSize + 'px'
            }

            if(this.title_show) {
              const height = this.$refs.title.offsetHeight
              // console.log('高度',height)
              this.box_chart.height = `calc(100% - ${height}px)`
            } else {
              this.box_chart.height = '100%'
            }
          }
          if (customStyle.background) {
            this.title_class.background = hexColorToRGBA(customStyle.background.color, customStyle.background.alpha)
            this.borderRadius = (customStyle.background.borderRadius || 0) + 'px'
            this.box_chart.borderRadius = (customStyle.background.borderRadius || 0) + 'px'
          }
        }
  
        if (this.chart.customAttr) {
          const customAttr = JSON.parse(this.chart.customAttr)
          // console.log('customAttr,progress',customAttr)
  
          this.progStyle.fontSize = customAttr.label.progressFontSize + 'px'
          this.progStyle.color = customAttr.label.progressFontColor
          this.progStyle.fontFamily =  this.canvasStyleData.fontFamily
          this.progStyle.inside = customAttr.label.progressInside !== undefined? customAttr.label.progressInside : true
          this.progStyle.strokeWidth = customAttr.label.strokeWidth !== undefined? customAttr.label.strokeWidth : 20
          this.progStyle.position = customAttr.label.progressPosition !== undefined? customAttr.label.progressPosition : 'top'
          // this.customColor = customAttr.color.colors[0]
          this.labelStyle.color = customAttr.label.progressLabelColor? customAttr.label.progressLabelColor : '#000000'
          this.labelStyle.fontSize = customAttr.label.progressValueSize !== undefined? customAttr.label.progressValueSize + 'px' : '14px'
          this.dataStyle.color = customAttr.label.progressDataColor? customAttr.label.progressDataColor : '#000000'
          this.dataStyle.fontSize = customAttr.label.progressDataFontSize? customAttr.label.progressDataFontSize +'px': '14px'
          this.dataMargin = customAttr.label.dataMargin? customAttr.label.dataMargin+'px' : '0px'
          this.colMargin = customAttr.label.strokeMargin? customAttr.label.strokeMargin+'px' : '10px'
        }
      },
  
      calcHeightRightNow() {
        this.$nextTick(() => {
          if (this.$refs.chartContainer) {
            const currentHeight = this.$refs.chartContainer.offsetHeight
            if (this.$refs.title) {
              const titleHeight = this.$refs.title.offsetHeight
              this.chartHeight = (currentHeight - titleHeight) + 'px'
            }
          }
        })
      },
      calcHeightDelay() {
        this.calcHeightRightNow()
        setTimeout(() => {
          this.calcHeightRightNow()
        }, 100)
      },
      formatValue(value) {
        return () => {
          return value + '%'
        }
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .prog_box {
    margin: 0px;
    width: 100%;
    height: 100%;
    padding-top: 5px;
    // overflow: hidden;
  }
  
.prog_box ::v-deep .el-progress-bar {
  width: 90%;
}
  .prog_box ::v-deep .el-progress__text {
    color: inherit !important;
    font-size: inherit !important;
    margin-left: 10px;
  }
  .prog_box ::v-deep .el-progress-bar__innerText {
    color: inherit !important;
    font-size: inherit !important;
  }
  
  .prog_title {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .prog_filed {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  </style>