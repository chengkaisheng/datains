import { hexColorToRGBA } from '@/views/chart/chart/util'
import { componentStyle } from '../common/common'
// import echa
// import echarts from 'echarts'

export function basePieOption(chart_option, chart, cstyle = {}) {
  // 处理shape attr
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.color = customAttr.color.colors
    }

    chart_option.grid.left = customAttr.size.spaceleft
    chart_option.grid.right = customAttr.size.spaceRight
    chart_option.grid.top = customAttr.size.spaceTop
    chart_option.grid.bottom = customAttr.size.spaceBottom
    // tooltip
    if (customAttr.tooltip) {
      const tooltip = JSON.parse(JSON.stringify(customAttr.tooltip))
      const reg = new RegExp('\n', 'g')
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')
      tooltip.extraCssText = 'max-width: 200px;white-space: pre-line;' // 额外附加css样式
      chart_option.tooltip = tooltip
    }
  }
  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title
    if (chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      // size
      if (customAttr.size) {
        chart_option.series[0].radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
        chart_option.series[0].center = [
          (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
          (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
        ]
      }
      // label
      if (customAttr.label) {
        chart_option.series[0].label = customAttr.label
        chart_option.series[0].labelLine = customAttr.label.labelLine
      }
      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        // const y = {
        //   name: chart.data.x[i],
        //   value: valueArr[i]
        // }
        const y = valueArr[i]

        y.name = chart.data.x[i]
        // color
        y.itemStyle = {
          color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
          borderRadius: 0
        }
        y.type = 'pie'
        chart_option.series[0].data.push(y)
      }
    }
  }

  componentStyle(chart_option, chart, cstyle)

  return chart_option
}
// prominentPieOption
export function prominentPieOption(chart_option, chart, cstyle = {}) {
  // 处理shape attr
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.color = customAttr.color.colors
    }

    chart_option.grid.left = customAttr.size.spaceleft
    chart_option.grid.right = customAttr.size.spaceRight
    chart_option.grid.top = customAttr.size.spaceTop
    chart_option.grid.bottom = customAttr.size.spaceBottom
    // tooltip
    if (customAttr.tooltip) {
      const tooltip = JSON.parse(JSON.stringify(customAttr.tooltip))
      const reg = new RegExp('\n', 'g')
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')
      tooltip.extraCssText = 'max-width: 200px;white-space: pre-line;' // 额外附加css样式
      chart_option.tooltip = tooltip
    }
  }
  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title
    if (chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      // size
      if (customAttr.size) {
        chart_option.series[0].radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
        chart_option.series[0].center = [
          (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
          (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
        ]
      }
      // label
      if (customAttr.label) {
        chart_option.series[0].label = customAttr.label
        chart_option.series[0].labelLine = customAttr.label.labelLine
      }
      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        // const y = {
        //   name: chart.data.x[i],
        //   value: valueArr[i]
        // }
        const y = valueArr[i]

        y.name = chart.data.x[i]
        // color
        y.itemStyle = {
          color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
          borderRadius: 0
        }
        y.type = 'pie'
        chart_option.series[0].data.push(y)
      }
      const pieKeyValue = customAttr.size.pieKeyValue !== undefined ? customAttr.size.pieKeyValue : 0
      chart_option.series[0].data[pieKeyValue].selected = true
      chart_option.series[0].selectedMode = 'single'
    }
  }

  componentStyle(chart_option, chart, cstyle)

  return chart_option
}

export function rosePieOption(chart_option, chart, cstyle = {}) {
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
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')
      tooltip.extraCssText = 'max-width: 200px;white-space: pre-line;' // 额外附加css样式
      chart_option.tooltip = tooltip
    }
  }
  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title
    if (chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      // size
      if (customAttr.size) {
        chart_option.series[0].radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
        chart_option.series[0].roseType = customAttr.size.pieRoseType
        chart_option.series[0].center = [
          (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
          (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
        ]
      }

      // label
      if (customAttr.label) {
        chart_option.series[0].label = customAttr.label
        chart_option.series[0].labelLine = customAttr.label.labelLine

        // 计算series所有data的总和
        // let dataTotal = 0
        // for (let i = 0; i < chart_option.series[0].data.length; i++) {
        //   dataTotal += chart_option.series[0].data[i].value
        // }

        // chart_option.series[0].label.formatter = function(params) {
        //   console.log('params: ', params)
        //   if (params.percent === undefined) {
        //     return Object.prototype.toString.call(params.value) === '[object Number]' ? params.name + Math.round(params.value / dataTotal) + '%' : params.value
        //   } else if (params.percent === 0) {
        //     return params.name + params.percent + '%'
        //   } else {
        //     return params.name + params.percent + '%'
        //   }
        // }
      }
      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        // const y = {
        //   name: chart.data.x[i],
        //   value: valueArr[i]
        // }
        const y = valueArr[i]
        y.name = chart.data.x[i]
        // color
        y.itemStyle = {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //   offset: 0,
          //   color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
          // }, {
          //   offset: 1,
          //   color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], 20)
          // }]),
          // color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            // type: 'radial',
            // x: 0.8,
            // y: 1,
            // r: 1,
            colorStops: [{
              offset: 0, // 0% 的颜色
              color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], 10)
            }, {
              offset: 1, // 100% 的颜色
              color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
            }],
            global: false // 缺省为 false
          },
          borderRadius: customAttr.size.pieRoseRadius
        }

        y.type = 'pie'
        chart_option.series[0].data.push(y)
      }
    }
  }

  componentStyle(chart_option, chart, cstyle)

  return chart_option
}

export function rosePieGradientOption(chart_option, chart, cstyle = {}) {
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
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')
      tooltip.extraCssText = 'max-width: 200px;white-space: pre-line;' // 额外附加css样式
      chart_option.tooltip = tooltip
    }
  }

  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title

    chart_option.legend.data = chart.data.x

    if (chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      chart_option.series[0].zlevel = 2
      // size
      if (customAttr.size) {
        chart_option.series[0].radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
        chart_option.series[0].roseType = customAttr.size.pieRoseType
        chart_option.series[0].center = [
          (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
          (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
        ]
      }
      // label
      if (customAttr.label) {
        chart_option.series[0].label = customAttr.label
        chart_option.series[0].labelLine = customAttr.label.labelLine
      }
      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        // const y = {
        //   name: chart.data.x[i],
        //   value: valueArr[i]
        // }
        const y = valueArr[i]
        y.name = chart.data.x[i]
        // color
        y.itemStyle = {
          // color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
          color: {
            type: 'linear',
            // type: 'radial',
            x: 0,
            y: 0,
            // r: 0.5,
            x2: 0.5,
            y2: 0.5,
            colorStops: [{
              offset: 0, // 0% 的颜色
              color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
            }, {
              offset: 1, // 100% 的颜色
              color: hexColorToRGBA(
                customAttr.color.variety ? customAttr.color.colors1[i % customAttr.color.colors1.length]
                  : customAttr.color.colors[i % customAttr.color.colors.length],
                customAttr.color.alpha
              )
            }],
            global: false // 缺省为 false
          },
          borderWidth: 0,
          borderRadius: customAttr.size.pieRoseRadius
        }
        y.type = 'pie'
        chart_option.series[0].data.push(y)
      }
    }

    chart_option.series[1] = {
      name: '',
      type: 'pie',
      zlevel: 1,
      radius: [(customAttr.size.pieOuterRadius + 6) + '%', (customAttr.size.pieOuterRadius + 10) + '%'],
      center: [
        (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
        (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
      ],
      label: {
        show: false,
        formatter: function(params) {
          if (params.percent === undefined) {
            return params.name + 50 + '%'
          } else if (params.percent === 0) {
            return params.name + params.percent + '%'
          } else {
            return params.name + params.percent + '%'
          }
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
    if (chart.data.series.length > 0) {
      chart_option.series[1].name = chart.data.series[0].name
      const arr = JSON.parse(JSON.stringify(chart.data.series[0].data))
      for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        v.name = chart.data.x[i]
        // color
        v.itemStyle = {
          color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),

          borderRadius: customAttr.size.pieRoseRadius,
          borderWidth: 1,
          borderColor: hexColorToRGBA('#ffffff', customAttr.color.alpha)
        }
        v.type = 'pie'
        chart_option.series[1].data.push(v)
      }
    }

    // other
    chart_option.series[2] = { // 内环
      name: '内环',
      type: 'pie',
      zlevel: 2,
      silent: true,
      clockWise: true,
      hoverAnimation: false,
      animationType: 'scale',
      // radius: ['22%', '25%'],
      center: [
        (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
        (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
      ],
      radius: [(customAttr.size.pieInnerRadius - 3) + '%', (customAttr.size.pieInnerRadius - 6) + '%'],
      label: {
        normal: {
          position: 'center',
          formatter: function(params) {
            if (params.percent === undefined) {
              return params.name + 50 + '%'
            } else if (params.percent === 0) {
              return params.name + params.percent + '%'
            } else {
              return params.name + params.percent + '%'
            }
          }

        }
      },
      data: [{
        value: 100,
        itemStyle: {
          normal: {
            // color: customAttr.color.innerRing? customAttr.color.innerRing : "#eeeeee",
            color: hexColorToRGBA(
              customAttr.color.innerRing ? customAttr.color.innerRing : '#eeeeee',
              customAttr.color.alpha
            )
          }
        }
      }]
    }

    chart_option.series[3] = { // 线
      name: '线',
      type: 'pie',
      zlevel: 2,
      silent: true,
      clockWise: true,
      hoverAnimation: false,
      animationType: 'scale',
      // radius: ['80%', '80.5%'],
      center: [
        (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
        (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
      ],
      radius: [(customAttr.size.pieOuterRadius + 15) + '%', (customAttr.size.pieOuterRadius + 15.5) + '%'],
      label: {
        normal: {
          position: 'center',
          formatter: function(params) {
            if (params.percent === undefined) {
              return params.name + 50 + '%'
            } else if (params.percent === 0) {
              return params.name + params.percent + '%'
            } else {
              return params.name + params.percent + '%'
            }
          }

        }
      },
      data: [{
        value: 100,
        itemStyle: {
          normal: {
            // color: customAttr.color.outerRing? customAttr.color.outerRing : "#eeeeee",
            color: hexColorToRGBA(
              customAttr.color.outerRing ? customAttr.color.outerRing : '#eeeeee',
              customAttr.color.alpha
            )
          }
        }
      }]
    }
  }

  componentStyle(chart_option, chart, cstyle)

  return chart_option
}

export function texturePieOption(chart_option, chart, cstyle = {}) {
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
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')
      tooltip.extraCssText = 'max-width: 200px;white-space: pre-line;' // 额外附加css样式
      chart_option.tooltip = tooltip
    }
  }
  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title
    if (chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      // size
      if (customAttr.size) {
        chart_option.series[0].radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
        chart_option.series[0].center = [
          (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
          (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
        ]
      }
      // label
      if (customAttr.label) {
        chart_option.series[0].label = customAttr.label
        chart_option.series[0].labelLine = customAttr.label.labelLine
      }
      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        // const y = {
        //   name: chart.data.x[i],
        //   value: valueArr[i]
        // }
        const y = valueArr[i]
        y.name = chart.data.x[i]
        // color
        y.itemStyle = {
          color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
          borderRadius: 0
        }
        y.type = 'pie'
        chart_option.series[0].data.push(y)
      }
    }
  }
  componentStyle(chart_option, chart, cstyle)

  return chart_option
}

export function newHartOption(chart_option, chart, cstyle = {}) {
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
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')
      tooltip.extraCssText = 'max-width: 200px;white-space: pre-line;' // 额外附加css样式
      chart_option.tooltip = tooltip
    }
  }
  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title
    if (chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      // size
      if (customAttr.size) {
        chart_option.series[0].radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
        chart_option.series[0].center = [
          (customAttr.size.pieCircleLeft !== undefined ? customAttr.size.pieCircleLeft : 50) + '%',
          (customAttr.size.pieCircleTop !== undefined ? customAttr.size.pieCircleTop : 50) + '%'
        ]
      }
      // label
      if (customAttr.label) {
        chart_option.series[0].label = customAttr.label
        chart_option.series[0].labelLine = customAttr.label.labelLine
      }
      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        // const y = {
        //   name: chart.data.x[i],
        //   value: valueArr[i]
        // }
        const y = valueArr[i]
        y.name = chart.data.x[i]
        // color
        y.itemStyle = {
          color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
          borderRadius: 0
        }
        y.type = 'pie'
        chart_option.series[0].data.push(y)
      }
    }
  }
  componentStyle(chart_option, chart, cstyle)

  return chart_option
}

