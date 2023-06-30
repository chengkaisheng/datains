import { Liquid } from '@antv/g2plot'
import { hexColorToRGBA } from '@/views/chart/chart/util'
import { DEFAULT_SIZE } from '@/views/chart/chart/chart'

export function baseLiquid(plot, container, chart, cstyle = {}) {
  let value = 0
  const colors = []
  const gColors = []
  let max, radius, bgColor, shape, labelContent, title
  if (chart.data) {
    if (chart.data.series.length > 0) {
      value = chart.data.series[0].data[0]
    }
  }
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    // color
    if (customAttr.color) {
      const c = JSON.parse(JSON.stringify(customAttr.color))
      c.colors.forEach(ele => {
        colors.push(hexColorToRGBA(ele, c.alpha))
      })
    }
    // size
    if (customAttr.size) {
      const size = JSON.parse(JSON.stringify(customAttr.size))
      max = size.liquidMax ? size.liquidMax : DEFAULT_SIZE.liquidMax
      radius = parseFloat((size.liquidSize ? size.liquidSize : DEFAULT_SIZE.liquidSize) / 100)
      shape = size.liquidShape ? size.liquidShape : DEFAULT_SIZE.liquidShape
    }
    // label
    if (customAttr.label) {
      const label = JSON.parse(JSON.stringify(customAttr.label))
      if (label.show) {
        labelContent = {
          style: ({ percent }) => ({
            fontSize: parseInt(label.fontSize),
            color: label.color,
            fontFamily: cstyle && cstyle.fontFamily ? cstyle.fontFamily : ''
          })
        }
      } else {
        labelContent = false
      }
    }
  }

  if (chart.data && chart.data.fields && chart.data.fields.length) {
    const fields = chart.data.fields
    const arr = []
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].chartType) {
        arr.push(fields[i])
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (customAttr.color && customAttr.color.variety) {
        // 定义柱状图渐变色
        const a = hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
        const b = hexColorToRGBA(customAttr.color.colors1[i % customAttr.color.colors1.length], customAttr.color.alpha)
        gColors.push(`l(270) 0:${a} 1:${b}`)
      }
    }
  }

  let customStyle
  if (chart.customStyle) {
    customStyle = JSON.parse(chart.customStyle)
    if (customStyle.background) {
      bgColor = hexColorToRGBA(customStyle.background.color, customStyle.background.alpha)
    }
    if (customStyle.text) {
      const t = JSON.parse(JSON.stringify(customStyle.text))
      if (t.show) {
        title = {
          formatter: () => { return chart.title },
          style: ({ percent }) => ({
            fontSize: parseInt(t.fontSize),
            color: t.color,
            fontWeight: t.isBolder ? 'bold' : 'normal',
            fontStyle: t.isItalic ? 'italic' : 'normal'
          })
        }
      } else {
        title = false
      }
    }
  }

  const options = {
    theme: {
      styleSheet: {
        brandColor: colors[0],
        paletteQualitative10: customAttr.color.variety ? gColors : colors,
        paletteQualitative20: customAttr.color.variety ? gColors : colors,
        backgroundColor: bgColor
      }
    },
    liquidStyle: { // 设置渐变色
      fill: customAttr.color.variety ? gColors[0] : colors[0]
    },
    percent: (parseFloat(value) / parseFloat(max)),
    radius: radius,
    shape: shape,
    statistic: {
      // title: title,
      content: labelContent
    }
  }

  // 开始渲染
  if (plot) {
    plot.destroy()
  }
  plot = new Liquid(container, options)
  return plot
}
