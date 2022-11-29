export function hexColorToRGBA(hex, alpha) {
  const rgb = [] // 定义rgb数组
  if (/^\#[0-9A-F]{3}$/i.test(hex)) { // 判断传入是否为#三位十六进制数
    let sixHex = '#'
    hex.replace(/[0-9A-F]/ig, function(kw) {
      sixHex += kw + kw // 把三位16进制数转化为六位
    })
    hex = sixHex // 保存回hex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) { // 判断传入是否为#六位十六进制数
    hex.replace(/[0-9A-F]{2}/ig, function(kw) {
      // eslint-disable-next-line no-eval
      rgb.push(eval('0x' + kw)) // 十六进制转化为十进制并存如数组
    })
    return `rgba(${rgb.join(',')},${alpha / 100})` // 输出RGB格式颜色
  } else {
    return 'rgb(0,0,0)'
  }
}

export function digToHex(dig) {
  let prefix = ''
  const num = parseInt(dig * 2.55)
  if (num < 16) {
    prefix = '0'
  }
  return prefix.concat(num.toString(16).toUpperCase())
}

export const TYPE_CONFIGS = [
  {
    render: 'antv',
    category: 'chart.chart_type_table',
    value: 'table-normal',
    title: 'chart.chart_table_normal',
    icon: 'table-normal'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_table',
    value: 'roll-elemnt',
    title: '滚动表格',
    icon: 'table-normal'
  },
  // {
  //   render: 'antv',
  //   category: 'chart.chart_type_table',
  //   value: 'dialog-list',
  //   title: '详情表格',
  //   icon: 'table-normal'
  // },
  {
    render: 'antv',
    category: 'chart.chart_type_table',
    value: 'table-info',
    title: 'chart.chart_table_info',
    icon: 'table-info'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_table',
    value: 'table-pivot',
    title: 'chart.chart_table_pivot',
    icon: 'table-pivot'
  },

  {
    render: 'antv',
    category: 'chart.chart_type_quota',
    value: 'label',
    title: 'chart.chart_label',
    icon: 'label'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_quota',
    value: 'text',
    title: 'chart.chart_card',
    icon: 'text'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_quota',
    value: 'gauge',
    title: 'chart.chart_gauge',
    icon: 'gauge'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_quota',
    value: 'liquid',
    title: 'chart.chart_liquid',
    icon: 'liquid'
  },

  {
    render: 'antv',
    category: 'chart.chart_type_trend',
    value: 'line',
    title: 'chart.chart_line',
    icon: 'line'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_trend',
    value: 'line-stack',
    title: 'chart.chart_line_stack',
    icon: 'line-stack'
  },

  {
    render: 'antv',
    category: 'chart.chart_type_compare',
    value: 'bar',
    title: 'chart.chart_bar',
    icon: 'bar'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_compare',
    value: 'bar-stack',
    title: 'chart.chart_bar_stack',
    icon: 'bar-stack'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_compare',
    value: 'waterfall',
    title: 'chart.chart_waterfall',
    icon: 'waterfall'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_compare',
    value: 'bar-horizontal',
    title: 'chart.chart_bar_horizontal',
    icon: 'bar-horizontal'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_compare',
    value: 'bar-stack-horizontal',
    title: 'chart.chart_bar_stack_horizontal',
    icon: 'bar-stack-horizontal'
  },

  {
    render: 'antv',
    category: 'chart.chart_type_distribute',
    value: 'pie',
    title: 'chart.chart_pie',
    icon: 'pie'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_distribute',
    value: 'pie-rose',
    title: 'chart.chart_pie_rose',
    icon: 'pie-rose'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_distribute',
    value: 'radar',
    title: 'chart.chart_radar',
    icon: 'radar'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_distribute',
    value: 'treemap',
    title: 'chart.chart_treemap',
    icon: 'treemap'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_distribute',
    value: 'word-cloud',
    title: 'chart.chart_word_cloud',
    icon: 'word-cloud'
  },

  {
    render: 'antv',
    category: 'chart.chart_type_relation',
    value: 'scatter',
    title: 'chart.chart_scatter',
    icon: 'scatter'
  },
  {
    render: 'antv',
    category: 'chart.chart_type_relation',
    value: 'funnel',
    title: 'chart.chart_funnel',
    icon: 'funnel'
  },
  /* 下面是echarts图表类型 */
  {
    render: 'echarts',
    category: 'chart.chart_type_table',
    value: 'table-normal',
    title: 'chart.chart_table_normal',
    icon: 'table-normal'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_table',
    value: 'vertical-ele',
    title: '滚动表格',
    icon: 'table-normal'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_table',
    value: 'table-info',
    title: 'chart.chart_table_info',
    icon: 'table-info'
  },

  {
    render: 'echarts',
    category: 'chart.chart_type_quota',
    value: 'label',
    title: 'chart.chart_label',
    icon: 'label'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_quota',
    value: 'text',
    title: 'chart.chart_card',
    icon: 'text'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_quota',
    value: 'gauge',
    title: 'chart.chart_gauge',
    icon: 'gauge'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_quota',
    value: 'liquid',
    title: 'chart.chart_liquid',
    icon: 'liquid'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_trend',
    value: 'line',
    title: 'chart.chart_line',
    icon: 'line'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_trend',
    value: 'line-polar',
    title: '极坐标数值轴',
    icon: 'line'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_trend',
    value: 'line-stack',
    title: 'chart.chart_line_stack',
    icon: 'line-stack'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_trend',
    value: 'chart-mix',
    title: 'chart.chart_mix',
    icon: 'chart-mix'
  },
  // {
  //   render: 'echarts',
  //   category: 'chart.chart_type_trend',
  //   value: 'candlestick',
  //   title: 'chart.chart_candlestick',
  //   icon: 'candlestick'
  // },
  // {
  //   render: 'echarts',
  //   category: 'chart.chart_type_trend',
  //   value: 'boxplot',
  //   title: 'chart.chart_boxplot',
  //   icon: 'boxplot'
  // },
  // {
  //   render: 'echarts',
  //   category: 'chart.chart_type_trend',
  //   value: 'sankey',
  //   title: 'chart.chart_sankey',
  //   icon: 'sankey'
  // },

  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar',
    title: 'chart.chart_bar',
    icon: 'bar'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-triangle',
    title: '三角柱状图',
    icon: 'bar'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-ranking',
    title: '极坐标柱状图',
    icon: 'bar'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-contrast',
    title: '对比柱状图',
    icon: 'bar'
  },
  // 暂时隐藏环形朱柱状图
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-annular',
    title: '环形柱状图',
    icon: 'bar'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-circular',
    title: '圆形柱状图',
    icon: 'bar'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-double',
    title: '双向柱状图',
    icon: 'bar'
  },
  // circular
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-stack',
    title: 'chart.chart_bar_stack',
    icon: 'bar-stack'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-stack-part',
    title: 'chart.chart_bar_stack_part',
    icon: 'bar-stack'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-polarStack',
    title: '极坐标堆叠柱状图',
    icon: 'bar-stack'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-horizontal',
    title: 'chart.chart_bar_horizontal',
    icon: 'bar-horizontal'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'bar-stack-horizontal',
    title: 'chart.chart_bar_stack_horizontal',
    icon: 'bar-stack-horizontal'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'pictorial-bar',
    title: 'chart.chart_column',
    icon: 'pictorial-bar'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'progress-loop',
    title: 'chart.chart_loop_progress',
    icon: 'progress-loop'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_compare',
    value: 'progress',
    title: 'chart.chart_bar_progress',
    icon: 'progress'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'pie',
    title: 'chart.chart_pie',
    icon: 'pie'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'pie-rose',
    title: 'chart.chart_pie_rose',
    icon: 'pie-rose'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'pie-rose-gradient',
    title: 'chart.chart_pie_rose_gradient',
    icon: 'pie-rose-gradient'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'radar',
    title: 'chart.chart_radar',
    icon: 'radar'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'treemap',
    title: 'chart.chart_treemap',
    icon: 'treemap'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'word-cloud',
    title: 'chart.chart_word_cloud',
    icon: 'word-cloud'
  },

  {
    render: 'echarts',
    category: 'chart.chart_type_relation',
    value: 'scatter',
    title: 'chart.chart_scatter',
    icon: 'scatter'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_relation',
    value: 'funnel',
    title: 'chart.chart_funnel',
    icon: 'funnel'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_relation',
    value: 'contrast-funnel',
    title: 'chart.chart_contrast_funnel',
    icon: 'contrast-funnel'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'clock-pie',
    title: '凸块饼图',
    icon: 'pie'
  },

  {
    render: 'echarts',
    category: 'chart.chart_type_space',
    value: 'map',
    title: 'chart.chart_map',
    icon: 'map'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_space',
    value: '3dsurface',
    title: 'chart.chart_3d_surface',
    icon: '3dsurface'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_space',
    value: '3d-column',
    title: 'chart.chart_3d_column',
    icon: '3d-column'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_space',
    value: '3d-scatter',
    title: 'chart.chart_3dscatter',
    icon: '3d-scatter'
  },
  // {
  //   render: 'echarts',
  //   category: 'chart.chart_type_space',
  //   value: '3dearth',
  //   title: 'chart.chart_3d_map',
  //   icon: '3dearth'
  // },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'pie-txture',
    title: 'chart.texture_pie',
    icon: 'pie-txture'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'diagram',
    title: 'chart.heat_map',
    icon: 'diagram'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'graph',
    title: 'chart.chart_graph',
    icon: 'graph'
  },
  {
    render: 'echarts',
    category: 'chart.chart_type_distribute',
    value: 'calendar',
    title: 'chart.chart_calendar_pie',
    icon: 'calendar'
  },
  
  // {
  //   render: 'echarts',
  //   category: 'chart.chart_type_distribute',
  //   value: 'pyramid',
  //   title: '金字塔图',
  //   icon: 'pyramid'
  // },

  /* 下面是highcharts图表类型 */
  // highcharts
  {
    render: 'highcharts',
    category: 'chart.chart_type_distribute',
    value: '3dpie',
    title: 'chart.chart_pie',
    icon: '3dpie'
  },
  // {
  //   render: 'highcharts',
  //   category: 'chart.chart_type_distribute',
  //   value: '3dpie-annular',
  //   title: 'chart.chart_pie',
  //   icon: '3dpie-annular'
  // },
  {
    render: 'highcharts',
    category: 'chart.chart_type_compare',
    value: '3dcolumn',
    title: 'chart.chart_column',
    icon: '3dcolumn'
  },
  {
    render: 'highcharts',
    category: 'chart.chart_type_compare',
    value: '3dcylinder',
    title: 'chart.chart_cylinder',
    icon: '3dcylinder'
  },
  {
    render: 'highcharts',
    category: 'chart.chart_type_compare',
    value: '3dcolumn_stack',
    title: 'chart.chart_column_stack',
    icon: '3dcolumn_stack'
  },
  {
    render: 'highcharts',
    category: 'chart.chart_type_relation',
    value: '3dfunnel',
    title: 'chart.chart_3dfunnel',
    icon: '3dfunnel'
  },
  {
    render: 'highcharts',
    category: 'chart.chart_type_relation',
    value: '3dpyramid',
    title: 'chart.chart_3dpyramid',
    icon: '3dpyramid'
  },
  // {
  //   render: 'highcharts',
  //   category: 'chart.chart_type_relation',
  //   value: '3dscatter',
  //   title: 'chart.chart_3dscatter',
  //   icon: '3d-scatter'
  // },

  {
    render: 'other',
    category: 'chart.chart_type_distribute',
    value: 'arc_map',
    title: 'chart.chart_arcgis_map',
    icon: 'arc_map'
  }
]
