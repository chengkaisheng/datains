// import { hexColorToRGBA } from '@/views/chart/chart/util'
import { componentStyle } from '../common/common'

export function baseMapOption(chart_option, chart) {
  console.log('mapppppppppppppppp',chart_option,chart)
  // 处理shape attr
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.color = customAttr.color.colors
    }
    // tooltip
    if (customAttr.tooltip) {
      const tooltip = JSON.parse(JSON.stringify(customAttr.tooltip))
      const reg = new RegExp('\n', 'g')
      const text = tooltip.formatter.replace(reg, '<br/>')
      tooltip.formatter = function(params) {
        const a = params.seriesName
        const b = params.name
        const c = params.value ? params.value : ''
        return text.replace(new RegExp('{a}', 'g'), a).replace(new RegExp('{b}', 'g'), b).replace(new RegExp('{c}', 'g'), c)
      }
      chart_option.tooltip = tooltip
    }
  }
  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title
    if (chart.data.series && chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      // label
      if (customAttr.label) {
        const text = customAttr.label.formatter
        chart_option.series[0].label = customAttr.label
        chart_option.series[0].label.formatter = function(params) {
          const a = params.seriesName
          const b = params.name
          const c = params.value ? params.value : ''
          return text.replace(new RegExp('{a}', 'g'), a).replace(new RegExp('{b}', 'g'), b).replace(new RegExp('{c}', 'g'), c)
        }
        chart_option.series[0].labelLine = customAttr.label.labelLine
      }
      // visualMap
      const valueArr = chart.data.series[0].data
      if (valueArr && valueArr.length > 0) {
        const values = []
        valueArr.forEach(function(ele) {
          values.push(ele.value)
        })
        chart_option.visualMap.min = Math.min(...values)
        chart_option.visualMap.max = Math.max(...values)
        if (chart_option.visualMap.min === chart_option.visualMap.max) {
          chart_option.visualMap.min = 0
        }
      } else {
        chart_option.visualMap.min = 0
        chart_option.visualMap.max = 0
      }
      if (chart_option.visualMap.min === 0 && chart_option.visualMap.max === 0) {
        chart_option.visualMap.max = 100
      }
      // color
      if (customAttr.color && customAttr.color.colors) {
        chart_option.visualMap.inRange.color = customAttr.color.colors
        chart_option.visualMap.inRange.colorAlpha = customAttr.color.alpha / 100
      }
      for (let i = 0; i < valueArr.length; i++) {
        // const y = {
        //   name: chart.data.x[i],
        //   value: valueArr[i]
        // }
        const y = valueArr[i]
        y.name = chart.data.x[i]
        // color
        // y.itemStyle = {
        //   color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
        //   borderRadius: 0
        // }
        chart_option.series[0].data.push(y)
      }
    }
  }
  console.log('地图面积数据',chart_option);
  componentStyle(chart_option, chart)
  return chart_option
}

export function baseMapColumnOption(chart_option, chart) {
  console.log('地图柱状图', chart)
  // 处理shape attr
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.color = customAttr.color.colors
    }
    // // tooltip
    // if (customAttr.tooltip) {
    //   const tooltip = JSON.parse(JSON.stringify(customAttr.tooltip))
    //   const reg = new RegExp('\n', 'g')
    //   const text = tooltip.formatter.replace(reg, '<br/>')
    //   tooltip.formatter = function(params) {
    //     const a = params.seriesName
    //     const b = params.name
    //     const c = params.value ? params.value : ''
    //     return text.replace(new RegExp('{a}', 'g'), a).replace(new RegExp('{b}', 'g'), b).replace(new RegExp('{c}', 'g'), c)
    //   }
    //   chart_option.tooltip = tooltip
    // }
  }

  if (chart.data) {
    chart_option.title.text = chart.title
    // if (chart.data.series && chart.data.series.length > 0) {
    //   chart_option.series[0].name = chart.data.series[0].name
    //   // label
    //   if (customAttr.label) {
    //     const text = customAttr.label.formatter
    //     chart_option.series[0].label = customAttr.label
    //     chart_option.series[0].label.formatter = function(params) {
    //       const a = params.seriesName
    //       const b = params.name
    //       const c = params.value ? params.value : ''
    //       return text.replace(new RegExp('{a}', 'g'), a).replace(new RegExp('{b}', 'g'), b).replace(new RegExp('{c}', 'g'), c)
    //     }
    //     chart_option.series[0].labelLine = customAttr.label.labelLine
    //   }
    //   // visualMap
    //   const valueArr = chart.data.series[0].data
    //   if (valueArr && valueArr.length > 0) {
    //     const values = []
    //     valueArr.forEach(function(ele) {
    //       values.push(ele.value)
    //     })
    //     chart_option.visualMap.min = Math.min(...values)
    //     chart_option.visualMap.max = Math.max(...values)
    //     if (chart_option.visualMap.min === chart_option.visualMap.max) {
    //       chart_option.visualMap.min = 0
    //     }
    //   } else {
    //     chart_option.visualMap.min = 0
    //     chart_option.visualMap.max = 0
    //   }
    //   if (chart_option.visualMap.min === 0 && chart_option.visualMap.max === 0) {
    //     chart_option.visualMap.max = 100
    //   }
    //   // color
    //   if (customAttr.color && customAttr.color.colors) {
    //     chart_option.visualMap.inRange.color = customAttr.color.colors
    //     chart_option.visualMap.inRange.colorAlpha = customAttr.color.alpha / 100
    //   }
    //   for (let i = 0; i < valueArr.length; i++) {
    //     const y = valueArr[i]
    //     y.name = chart.data.x[i]
    //     chart_option.series[0].data.push(y)

    //     if(i<10) {
    //       chart_option.series[1].data.push(y)
    //       chart_option.yAxis.data.push(y.name)
    //     }
    //   }
     
    // }
  }
  console.log('图表，，，',chart_option);
  componentStyle(chart_option, chart)
  return chart_option
}

export function baseMapBubbleOption(chart_option, chart,geoJson) {
  console.log('地图气泡图',chart,geoJson)
  // 处理shape attr
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.color = customAttr.color.colors
    }
    // tooltip
    // if (customAttr.tooltip) {
    //   const tooltip = JSON.parse(JSON.stringify(customAttr.tooltip))
    //   const reg = new RegExp('\n', 'g')
    //   const text = tooltip.formatter.replace(reg, '<br/>')
    //   tooltip.formatter = function(params) {
    //     const a = params.seriesName
    //     const b = params.name
    //     const c = params.value ? params.value : ''
    //     return text.replace(new RegExp('{a}', 'g'), a).replace(new RegExp('{b}', 'g'), b).replace(new RegExp('{c}', 'g'), c)
    //   }
    //   chart_option.tooltip = tooltip
    // }
  }

  let geoCoordMap = {}
  if(geoJson.features.length) {
    geoJson.features.map(item => {
      if(item.properties.name) {
        geoCoordMap[item.properties.name] = item.properties.center
      }
    })
    console.log('geoCoordMap',geoCoordMap)
  }

  if(chart.data) {
    chart_option.title.text = chart.title
    let arr = []
    if(chart.data.series.length) {
      chart_option.series[0].name = chart.data.series[0].name
      chart_option.series[1].name = chart.data.series[0].name
      chart_option.series[2].name = chart.data.series[0].name

      for(let i=0;i<chart.data.series.length;i++) {
        let obj = chart.data.series[i]
        if(obj.data.length) {
          obj.data.map((item,index) => {
            arr.push({
              name: chart.data.x[index],
              value: item.value
            })
          })
        }
      }
      // console.log('arrrrrr',arr)
    }
    let convertData = []
    if(arr.length) {
      for(let i=0;i<arr.length;i++) {
        let geoCoord = geoCoordMap[arr[i].name]
        if(geoCoord) {
          convertData.push({
            name: arr[i].name,
            value: geoCoord.concat(arr[i].value)
          })
        }
      }
    }

    console.log('convertData',convertData)
    chart_option.series[0].data = arr
    chart_option.series[1].data = convertData
    chart_option.series[2].data = convertData
    
  }

  console.log('数据',chart_option);
  componentStyle(chart_option, chart)
  return chart_option
}


export function baseMapLinesOption(chart_option, chart, geoJson) {
  console.log('地图线图',chart,geoJson)
  // 处理shape attr
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.color = customAttr.color.colors
    }
  }

  console.log('gatherCode,,,',customAttr.gatherCode)

  let geoCoordMap = {}
  if(geoJson.features.length) {
    geoJson.features.map(item => {
      if(item.properties.name) {
        geoCoordMap[item.properties.name] = item.properties.center
      }
    })
    console.log('geoCoordMap',geoCoordMap)
  }

  if(chart.data) {
    chart_option.title.text = chart.title
    
    let arr = []
    let esArr = [] // 其它城市
    let sArr = [] // 聚集城市
    let lineArr= [] // 线
    if(chart.data.series.length) {
      for(let i=0;i<chart.data.series.length;i++) {
        let obj = chart.data.series[i]
        if(obj.data.length) {
          obj.data.map((item,index) => {
            arr.push({
              name: chart.data.x[index],
              value: item.value
            })
          })
        }
      }
      console.log('arrrrrr',arr)
      for(let i=0;i<arr.length;i++) {
        let geoCoord = geoCoordMap[arr[i].name]
        if(geoCoord) {
          esArr.push({
            name: arr[i].name,
            value: geoCoord.concat(arr[i].value)
          })
        }
      }
      console.log('数据',esArr)
      chart_option.series[0] = {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
					trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
					symbol: 'arrow', //箭头图标
					symbolSize: 5, //图标大小
        },
        lineStyle: {
					normal: {
						width: 1, //尾迹线条宽度
						opacity: 1, //尾迹线条透明度
						curveness: .3 //尾迹线条曲直度
					}
				},
        data: []
      }
      chart_option.series[1] = {
        type: 'effectScatter',
        coordinateSystem:  'geo',
        zlevel: 2,
        rippleEffect: { //涟漪特效
					period: 4, //动画时间，值越小速度越快
					brushType: 'stroke', //波纹绘制方式 stroke, fill
					scale: 4 //波纹圆环最大限制，值越大波纹越大
				},
        label: {
					normal: {
						show: true,
						position: 'right', //显示位置
						offset: [5, 0], //偏移设置
						formatter: function(params){//圆环显示文字
							return params.data.name;
						},
						fontSize: 13
					},
					emphasis: {
						show: true
					}
				},
        symbol: 'circle',
        // symbolSize: function(val) {
				// 	return 5+ val[2]; //圆环大小
				// },
        symbolSize: 10,
        itemStyle: {
					normal: {
						show: false,
						color: '#f00'
					}
				},
        data: esArr
      }
      chart_option.series[2] = {
        type: 'scatter',
        coordinateSystem: 'geo',
				zlevel: 2,
        rippleEffect: {
					period: 4,
					brushType: 'stroke',
					scale: 4
				},
        label: {
					normal: {
						show: true,
						position: 'right',
						//offset:[5, 0],
						color: '#0f0',
						formatter: '{b}',
						textStyle: {
							color: "#0f0"
						}
					},
					emphasis: {
						show: true,
						color: "#f60"
					}
				},
        symbol: 'pin',
				symbolSize: 50,
        data: [{
          name: '北京市',
          value: [116.4551, 40.2539,10]
        }]
      }
    }
  }

  console.log('lines数据',chart_option);
  componentStyle(chart_option, chart)
  return chart_option
}

