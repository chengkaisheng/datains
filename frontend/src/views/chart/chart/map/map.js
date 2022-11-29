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

