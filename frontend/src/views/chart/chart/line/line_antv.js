import { Line, Area } from '@antv/g2plot'
import {
  getTheme,
  getLabel,
  getTooltip,
  getLegend,
  getXAxis,
  getYAxis,
  getPadding,
  getSlider,
  getAnalyse
} from '@/views/chart/chart/common/common_antv'

export function baseLineOptionAntV(plot, container, chart, action, cstyle = {}) {
  // theme
  const theme = getTheme(chart)
  // attr
  const label = getLabel(chart)
  const tooltip = getTooltip(chart)
  // style
  const legend = getLegend(chart)
  const xAxis = getXAxis(chart, cstyle)
  const yAxis = getYAxis(chart, cstyle)
  // data
  const data = chart.data.datas
  // config
  const slider = getSlider(chart)
  const analyse = getAnalyse(chart)
  // options
  const options = {
    point: {},
    theme: theme,
    data: data,
    xField: 'field',
    yField: 'value',
    seriesField: 'category',
    appendPadding: getPadding(chart),
    label: label,
    tooltip: tooltip,
    legend: legend,
    xAxis: xAxis,
    yAxis: yAxis,
    slider: slider,
    annotations: analyse,
    interactions: [
      {
        type: 'element-active', enable: false, cfg: {
          start: [{ trigger: 'element:mouseenter', action: ['element-highlight:highlight', 'element-active:reset', 'cursor:pointer'] }],
          end: [{ trigger: 'element:mouseleave', action: ['element-highlight:reset', 'element-active:reset', 'cursor:default'] }]
        }
      },
      {
        type: 'legend-active', enable: false, cfg: {
          start: [{ trigger: 'legend-item:mouseenter', action: ['element-active:reset'] }],
          end: [{ trigger: 'legend-item:mouseleave', action: ['element-active:reset'] }]
        }
      },
      {
        type: 'legend-filter', enable: false, cfg: {
          start: [{ trigger: 'legend-item:click', action: ['list-unchecked:toggle', 'data-filter:filter', 'element-active:reset', 'element-highlight:reset'] }]
        }
      },
      {
        type: 'tooltip', enable: false, cfg: {
          start: [{ trigger: 'point:mousemove', action: 'tooltip:show' }],
          end: [{ trigger: 'point:mouseleave', action: 'tooltip:hide' }]
        }
      },
      {
        type: 'active-region', enable: false, cfg: {
          start: [{ trigger: 'element:mousemove', action: 'active-region:show' }],
          end: [{ trigger: 'element:mouseleave', action: 'active-region:hide' }]
        }
      }
    ]
  }
  // size
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.size) {
      const s = JSON.parse(JSON.stringify(customAttr.size))
      options.smooth = s.lineSmooth
      options.point = {
        size: parseInt(s.lineSymbolSize),
        shape: s.lineSymbol
      }
      options.lineStyle = {
        lineWidth: parseInt(s.lineWidth)
      }
    }
  }

  // 开始渲染
  if (plot) {
    plot.destroy()
  }
  plot = new Line(container, options)

  plot.off('point:click')
  plot.on('point:click', action)

  return plot
}

export function baseAreaOptionAntV(plot, container, chart, action, cstyle = {}) {
  // theme
  const theme = getTheme(chart)
  // attr
  const label = getLabel(chart)
  const tooltip = getTooltip(chart)
  // style
  const legend = getLegend(chart)
  const xAxis = getXAxis(chart, cstyle)
  const yAxis = getYAxis(chart, cstyle)
  // data
  const data = chart.data.datas
  // config
  const slider = getSlider(chart)
  const analyse = getAnalyse(chart)
  // options
  const options = {
    point: {},
    theme: theme,
    data: data,
    xField: 'field',
    yField: 'value',
    seriesField: 'category',
    appendPadding: getPadding(chart),
    label: label,
    tooltip: tooltip,
    legend: legend,
    xAxis: xAxis,
    yAxis: yAxis,
    slider: slider,
    annotations: analyse,
    interactions: [
      {
        type: 'element-active', enable: false, cfg: {
          start: [{ trigger: 'element:mouseenter', action: ['element-highlight:highlight', 'element-active:reset', 'cursor:pointer'] }],
          end: [{ trigger: 'element:mouseleave', action: ['element-highlight:reset', 'element-active:reset', 'cursor:default'] }]
        }
      },
      {
        type: 'legend-active', enable: false, cfg: {
          start: [{ trigger: 'legend-item:mouseenter', action: ['element-active:reset'] }],
          end: [{ trigger: 'legend-item:mouseleave', action: ['element-active:reset'] }]
        }
      },
      {
        type: 'legend-filter', enable: false, cfg: {
          start: [{ trigger: 'legend-item:click', action: ['list-unchecked:toggle', 'data-filter:filter', 'element-active:reset', 'element-highlight:reset'] }]
        }
      },
      {
        type: 'tooltip', enable: false, cfg: {
          start: [{ trigger: 'point:mousemove', action: 'tooltip:show' }],
          end: [{ trigger: 'point:mouseleave', action: 'tooltip:hide' }]
        }
      },
      {
        type: 'active-region', enable: false, cfg: {
          start: [{ trigger: 'element:mousemove', action: 'active-region:show' }],
          end: [{ trigger: 'element:mouseleave', action: 'active-region:hide' }]
        }
      }
    ]
  }
  // size
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.size) {
      const s = JSON.parse(JSON.stringify(customAttr.size))
      options.smooth = s.lineSmooth
      options.point = {
        size: parseInt(s.lineSymbolSize),
        shape: s.lineSymbol
      }
      options.line = {
        style: {
          lineWidth: parseInt(s.lineWidth)
        }
      }
    }
  }
  // 开始渲染
  if (plot) {
    plot.destroy()
  }
  plot = new Area(container, options)

  plot.off('point:click')
  plot.on('point:click', action)

  return plot
}

export function compare(prop) {
  return function(obj1, obj2) {
    var val1 = obj1[prop]
    var val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}
export function compare1(prop) {
  return function(obj1, obj2) {
    var val1 = obj1[prop]
    var val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return 1
    } else if (val1 > val2) {
      return -1
    } else {
      return 0
    }
  }
}
