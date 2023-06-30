import { hexColorToRGBA } from '@/views/chart/chart/util'
import { componentStyle, seniorCfg } from '../common/common'

export function base3DsurfaceOption(chart_option, chart, cstyle = {}) {
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

  // data
  if (chart.data) {
    chart_option.title.text = chart.title

    if (chart.data.series.length) {
      const arr = []
      for (let i = 0; i < chart.data.series.length; i++) {
        const y = chart.data.series[i]
        const arr1 = []
        y.data.map((item, index) => {
          arr1.push(item.value)
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
  }

  componentStyle(chart_option, chart, cstyle)
  return chart_option
}
