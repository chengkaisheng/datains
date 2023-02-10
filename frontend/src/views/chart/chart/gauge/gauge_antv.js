import { getPadding, getTheme } from '@/views/chart/chart/common/common_antv'
import { Gauge } from '@antv/g2plot'
import { DEFAULT_SIZE, DEFAULT_THRESHOLD } from '@/views/chart/chart/chart'

export function baseGaugeOptionAntV(plot, container, chart, action, cstyle = {}) {
  let max, labelContent, startAngel, endAngel
  // theme
  const theme = getTheme(chart)
  // data
  const data = chart.data.series[0].data[0]
  // size
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.size) {
      const size = JSON.parse(JSON.stringify(customAttr.size))
      max = size.gaugeMax ? size.gaugeMax : DEFAULT_SIZE.gaugeMax
      startAngel = parseInt(size.gaugeStartAngle) * Math.PI / 180
      endAngel = parseInt(size.gaugeEndAngle) * Math.PI / 180
    }
  }
  // label
  if (customAttr.label) {
    const label = JSON.parse(JSON.stringify(customAttr.label))
    const arr = label.gaugeFormatter.split('{value}')
    console.log('数组==》',arr)
    
    if (label.show) {
      labelContent = {
        formatter: ({ percent }) => {
          if(arr.length !== 2) {
            return `${(percent * 100).toFixed(0)}`
          } else {
            return arr[0]+(percent * 100).toFixed(0)+arr[1]
          }
        },
        // formatter: ({ percent }) => {eval(label.gaugeFormatter)},
        style: ({ percent }) => ({
          fontSize: parseInt(label.fontSize),
          color: label.color,
          fontFamily: cstyle && cstyle.fontFamily? cstyle.fontFamily : ''
        }),
      }
    } else {
      labelContent = false
    }
  }
  const per = (parseFloat(data) / parseFloat(max))

  const range = [0]
  let index = 0
  let flag = false
  let hasThreshold = false

  if (chart.senior) {
    const senior = JSON.parse(chart.senior)
    const threshold = JSON.parse(JSON.stringify(senior.threshold ? senior.threshold : DEFAULT_THRESHOLD))
    if (threshold.gaugeThreshold && threshold.gaugeThreshold !== '') {
      hasThreshold = true
      const arr = threshold.gaugeThreshold.split(',')
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i]
        const p = parseInt(ele) / 100
        range.push(p)
        if (!flag && per <= p) {
          flag = true
          index = i
        }
      }
      if (!flag) {
        index = arr.length
      }
    }
  }
  range.push(1)

  // options
  const options = {
    theme: theme,
    percent: per,
    startAngle: startAngel,
    endAngle: endAngel,
    appendPadding: getPadding(chart),
    // indicator: null,
    statistic: {
      content: labelContent
    }
    // range: {
    //   width: 12
    // },
    // gaugeStyle: {
    //   lineCap: 'round'
    // }
  }
  if (hasThreshold) {
    options.range = {
      color: theme.styleSheet.paletteQualitative10,
      ticks: range
    }
    options.indicator = {
      pointer: {
        style: {
          stroke: theme.styleSheet.paletteQualitative10[index % theme.styleSheet.paletteQualitative10.length]
        }
      },
      pin: {
        style: {
          stroke: theme.styleSheet.paletteQualitative10[index % theme.styleSheet.paletteQualitative10.length]
        }
      }
    }
  }

  // 开始渲染
  if (plot) {
    plot.destroy()
  }
  plot = new Gauge(container, options)

  return plot
}
