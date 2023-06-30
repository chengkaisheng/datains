import { hexColorToRGBA } from '../util.js'
import { componentStyle, seniorCfg } from '../common/common'

export function baseMapBubbleOption(chart_option, chart) {
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

  //
  if (chart.data) {
    chart_option.title.text = chart.title

    if (chart.data.series.length > 0) {
      const arr = []
      for (let i = 0; i < chart.data.series.length; i++) {
        const obj = chart.data.series[i]

        const a = []
        obj.data.map(item => {
          a.push(item.value)
        })
        arr.push(a)
      }

      const mb = new Array(Math.max(...arr.map(item => item.length)))
      for (let index = 0; index < mb.length; index++) {
        for (const key in arr) {
          if (!mb[index]) {
            mb[index] = [arr[key][index]]
          } else {
            mb[index][key] = arr[key][index]
          }
        }
      }
      const max = Math.max(...mb.map(item => item[item.length - 1]))

      const d = chart.data.x.map((item, index) => {
        return {
          name: item,
          value: mb[index],
          symbolSize: ((mb[index][mb[index].length - 1] / max) + 1) * 20
        }
      })

      chart_option.series[0].data = d
      chart_option.series[0].symbol = customAttr.size.scatterSymbol
    }
  }

  componentStyle(chart_option, chart)
  return chart_option
}
