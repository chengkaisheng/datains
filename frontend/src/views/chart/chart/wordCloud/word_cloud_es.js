import { hexColorToRGBA } from '@/views/chart/chart/util'
import { componentStyle, seniorCfg } from '../common/common'
// echarts
export function baseWordCloudOption(chart_option, chart, cstyle = {}, scalePointWidth) {
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

  if (chart.data) {
    chart_option.title.text = chart.title

    if (chart.data.series.length > 0) {
      chart_option.series[0].name = chart.data.series[0].name
      // size
      if (customAttr.size) {
        chart_option.series[0].radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
      }
      // label

      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        const y = valueArr[i]
        y.name = chart.data.x[i]
        // color
        y.itemStyle = {
          color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha),
          borderRadius: 0
        }
        y.type = 'wordCloud'

        y.textStyle = {
          color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
        }

        chart_option.series[0].data.push(y)
      }

      if (chart.customAttr) {
        const customAttr = JSON.parse(chart.customAttr)
        if (customAttr.size) {
          chart_option.series[0].sizeRange[0] = customAttr.size.wordMin * scalePointWidth
          chart_option.series[0].sizeRange[1] = customAttr.size.wordMax * scalePointWidth
          chart_option.series[0].shape = customAttr.size.wordShape
        }
      }
      if (cstyle && cstyle.fontFamily) {
        chart_option.series[0].textStyle.normal.fontFamily = cstyle.fontFamily
        chart_option.textStyle.fontFamily = cstyle.fontFamily
      }
    }
  }
  componentStyle(chart_option, chart, cstyle) // 图表样式
  seniorCfg(chart_option, chart) // 值样式

  return chart_option
}
