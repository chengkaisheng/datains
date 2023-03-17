import { hexColorToRGBA } from '@/views/chart/chart/util'
import { componentStyle, seniorCfg } from '../common/common'

export function baseMixOption(chart_option, chart, cstyle = {}) {
  console.log('组合图',chart)
  // 处理shape attr
  let customAttr = {}
  const yAxis = JSON.parse(chart.yaxis)
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
    let arr = []
    for (let i = 0; i < chart.data.series.length; i++) {
      const y = chart.data.series[i]
      y.type = y.type ? y.type : 'bar'
      // color
      y.itemStyle = {
        color: hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
      }
      // size
      if (customAttr.size) {
        // bar
        if (y.type === 'bar') {
          if (customAttr.size.barDefault) {
            y.barWidth = null
            y.barGap = null
          } else {
            y.barWidth = customAttr.size.barWidth
            y.barGap = customAttr.size.barGap
          }
        }
        // line
        if (y.type === 'line') {
          y.symbol = customAttr.size.lineSymbol
          y.symbolSize = customAttr.size.lineSymbolSize
          y.lineStyle = {
            width: customAttr.size.lineWidth,
            type: customAttr.size.lineType
          }
          y.smooth = customAttr.size.lineSmooth
        }
        // scatter
        if (y.type === 'scatter') {
          y.symbol = customAttr.size.scatterSymbol ? customAttr.size.scatterSymbol : 'circle'
          y.symbolSize = customAttr.size.scatterSymbolSize ? customAttr.size.scatterSymbolSize : 20
        }

        if (y.type === 'pie') {
          y.radius = [customAttr.size.pieInnerRadius + '%', customAttr.size.pieOuterRadius + '%']
          y.center = [customAttr.size.pieCircleLeft + '%', customAttr.size.pieCircleTop + '%']
          y.data.map((item,index) => {
            item.itemStyle = {
              color: hexColorToRGBA(customAttr.color.colors[index % customAttr.color.colors.length], customAttr.color.alpha)
            }
          })
        }
      }
      // label
      if (customAttr.label) {
        y.label = customAttr.label
      }
      chart_option.legend.data.push(y.name)
      i >= yAxis.length ? (y.yAxisIndex = 1) : (y.yAxisIndex = 0)
      chart_option.series.push(y)
    }
  }
  console.log('chart-mix',chart_option);
  componentStyle(chart_option, chart,cstyle)
  seniorCfg(chart_option, chart)
  return chart_option
}
