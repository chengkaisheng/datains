import { hexColorToRGBA } from '@/views/chart/chart/util'
import { componentStyle, seniorCfg } from '../common/common'

let bubbleArray = []
let terminalType = 'pc'

export function baseScatterOption(chart_option, chart, terminal = 'pc', cstyle = {}) {
  terminalType = terminal
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
    chart_option.xAxis.data = chart.data.x
    bubbleArray = []
    for (let i = 0; i < chart.data.series.length; i++) {
      const y = chart.data.series[i]
      // color
      y.itemStyle = {
        color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
      }
      // size
      if (customAttr.size) {
        y.symbol = customAttr.size.scatterSymbol ? customAttr.size.scatterSymbol : 'circle'

        const extBubble = JSON.parse(chart.extBubble)
        if (extBubble && extBubble.length > 0) {
          y.data.forEach(ele => {
            bubbleArray.push(ele.value[2])
          })
          y.symbolSize = funcSize
        } else {
          y.symbolSize = customAttr.size.scatterSymbolSize ? customAttr.size.scatterSymbolSize : 20
        }
      }
      // label
      if (customAttr.label) {
        y.label = customAttr.label
      }
      y.type = 'scatter'
      chart_option.legend.selectedMode = false
      chart_option.legend.data.push(y.name)
      chart_option.series.push(y)
    }
  }

  componentStyle(chart_option, chart, cstyle)
  seniorCfg(chart_option, chart)

  return chart_option
}
export function clockcatterOption(chart_option, chart, terminal = 'pc', cstyle = {}) {
  terminalType = terminal
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
    chart_option.xAxis.data = chart.data.x
    bubbleArray = []
    for (let i = 0; i < chart.data.series.length; i++) {
      const y = chart.data.series[i]

      // color
      y.itemStyle = {
        color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5
      }
      // size
      if (customAttr.size) {
        y.symbol = customAttr.size.scatterSymbol ? customAttr.size.scatterSymbol : 'circle'

        const extBubble = JSON.parse(chart.extBubble)
        if (extBubble && extBubble.length > 0) {
          y.data.forEach(ele => {
            bubbleArray.push(ele.value[2])
          })

          y.symbolSize = funcSizeTwo
          // y.symbolSize = function(data) {
          //   return Math.sqrt(data[2]) / 5e2
          // }
        } else {
          y.symbolSize = funcSizeTwo

          // y.symbolSize = customAttr.size.scatterSymbolSize ? customAttr.size.scatterSymbolSize : 20
        }
      }
      // label
      if (customAttr.label) {
        y.label = customAttr.label
      }
      y.type = 'scatter'
      chart_option.legend.selectMode = false
      chart_option.legend.data.push(y.name)
      chart_option.series.push(y)
    }
  }

  componentStyle(chart_option, chart, cstyle)
  seniorCfg(chart_option, chart)

  return chart_option
}

const funcSize = function(data) {
  const k = terminalType === 'pc' ? 80 : 30
  const max = Math.max(...bubbleArray)

  return (data[2] / max) * k
}

const funcSizeTwo = function(data) {
  // const k = terminalType === 'pc' ? 80 : 30
  // const max = Math.max(...bubbleArray)
  return Math.sqrt(data[2]) / 5e2
}

export function base3DScatterOption(chart_option, chart, cstyle = {}) {
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

  if (chart.data) {
    chart_option.title.text = chart.title
    const arr = []
    for (let i = 0; i < chart.data.series.length; i++) {
      const y = chart.data.series[i]
      const arr1 = []
      y.data.map((item, index) => {
        arr1.push(item.value[1])
      })
      arr.push(arr1)
    }

    const s = new Array(Math.max(... arr.map(item => item.length)))
    for (let index = 0; index < s.length; index++) {
      for (const key in arr) {
        if (!s[index]) {
          s[index] = [arr[key][index]]
        } else {
          s[index][key] = arr[key][index]
        }
      }
    }

    chart_option.series[0].data = s
    chart_option.series[0].label = customAttr.label
  }

  componentStyle(chart_option, chart, cstyle)

  return chart_option
}

export function baseCalendarPieOption(chart_option, chart, cstyle = {}) {
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

    if (customAttr.size) {
      chart_option.calendar.cellSize = [
        customAttr.size.caldWAdapt ? 'auto' : customAttr.size.caldWidth ? customAttr.size.caldWidth : 60,
        customAttr.size.caldHAdapt ? 'auto' : customAttr.size.caldHeight ? customAttr.size.caldHeight : 60
      ]
    }
  }

  if (chart.data) {
    chart_option.title.text = chart.title

    const sarr = [] // 日历数据
    const pies = [] // 饼图数据

    if (chart.data.x.length) {
      const time = (new Date(chart.data.x[0]).getFullYear() + '-' + (new Date(chart.data.x[0]).getMonth() + 1)) // 日期
      chart_option.calendar.range = [time]

      for (let i = 0; i < chart.data.x.length; i++) {
        // sarr.push([chart.data.x[i],chart.data.x[i]])
        sarr.push(chart.data.x[i])
      }
    }
    if (chart.data.series.length > 0) {
      const larr = [] // legend
      const parr = [] // pie 数据
      for (let i = 0; i < chart.data.series.length; i++) {
        const obj = chart.data.series[i]
        larr.push(obj.name)
        const a = []
        obj.data.map(item => {
          a.push(item.value)
        })
        parr.push(a)
      }

      chart_option.legend.data = larr
      const s = new Array(Math.max(... parr.map(item => item.length)))
      for (let index = 0; index < s.length; index++) {
        for (const key in parr) {
          if (!s[index]) {
            s[index] = [parr[key][index]]
          } else {
            s[index][key] = parr[key][index]
          }
        }
      }

      for (let j = 0; j < s.length; j++) {
        const p = []
        s[j].map((item, index) => {
          const obj = {
            name: larr[index],
            value: item
          }
          p.push(obj)
        })
        pies.push({
          type: 'pie',
          id: 'pie-' + j,
          center: sarr[j],
          radius: customAttr.size.caldPieSize ? customAttr.size.caldPieSize : 25, // 可动态修改
          coordinateSystem: 'calendar',
          label: {
            formatter: '{c}',
            position: 'inside'
          },
          // labe: customAttr.label,
          data: p
        })
      }
    }

    chart_option.series = [
      {
        id: 'label',
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 0,
        label: {
          show: true,
          formatter: function(params) {
            return new Date(params.value).getDate()
          },
          offset: [
            customAttr.size.caldTimelevel !== undefined ? customAttr.size.caldTimelevel : -20,
            customAttr.size.caldTimevertical !== undefined ? customAttr.size.caldTimevertical : -20
          ],
          fontSize: 12
        },
        data: sarr
      },
      ...pies
    ]
  }

  componentStyle(chart_option, chart, cstyle)
  return chart_option
}
