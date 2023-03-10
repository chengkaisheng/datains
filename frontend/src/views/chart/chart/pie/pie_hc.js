export const DEFAULT_COLOR_CASE = {
  value: 'default',
  colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  alpha: 100,
  tableHeaderBgColor: '#e1eaff',
  tableItemBgColor: '#ffffff',
  tableFontColor: '#000000',
  tableStripe: true,
  dimensionColor: '#000000',
  quotaColor: '#000000',
  tableBorderColor: '#cfdaf4'
}

export const COLOR_PANEL = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#999999',
  '#000000',
  '#FFFFFF'
]

export const DEFAULT_LABEL = {
  show: false,
  position: 'top',
  color: '#909399',
  fontSize: '10',
  formatter: '{c}',
  gaugeFormatter: '{value}',
  labelLine: {
    show: true
  }
}
export const DEFAULT_TOOLTIP = {
  show: true,
  trigger: 'item',
  confine: true,
  textStyle: {
    fontSize: '10',
    color: '#909399'
  },
  formatter: ''
}
export const DEFAULT_TITLE_STYLE = {
  show: true,
  fontSize: '18',
  color: '#303133',
  hPosition: 'center',
  vPosition: 'top',
  isItalic: false,
  isBolder: false
}
export const DEFAULT_BACKGROUND_COLOR = {
  color: '#ffffff',
  alpha: 100,
  borderRadius: 5
}
export const BASE_PIE = {
  chart: {
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0,
      depth: 20,
    },
    backgroundColor: 'rgba(0,0,0,0)'
  },
  credits: {
    enabled: false
  },
  title: {
    text: '',
    style: {
      fontWeight: 'normal'
    }
  },
  legend: {},

  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      innerSize: '0%',
      depth: 35,
      dataLabels: {
        enabled: true
      },
      showInLegend: false
    }
  },

  tooltip: {
    shared: true,
    useHTML: true,
    headerFormat: '<small>{point.key}</small><table>',
    pointFormat: '<tr><td>{series.name}: </td>' +
			'<td style="text-align: right"><b>{point.y}</b></td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2,
  },

  series: [
    {
      name: '',
      type: 'pie',
      data: []
    }
  ]
}

let terminalType = 'pc'
export function basePieOption(chart_option, chart, terminal = 'pc',cstyle = {}) {
  terminalType = terminal
  let customAttr = {}
  // console.log('chart.customAttr: ', chart.customAttr)
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.colors = customAttr.color.colors
    }
    // tooltip
    if (customAttr.tooltip) {
      const tooltip = JSON.parse(JSON.stringify(customAttr.tooltip))
      const reg = new RegExp('\n', 'g')
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')

      chart_option.tooltip.enabled = tooltip.show
      chart_option.tooltip.style = { 
        fontSize: tooltip.textStyle.fontSize, 
        color: tooltip.textStyle.color 
      }
      let formatter = tooltip.formatter
      formatter = formatter.replace('{a}', '{series.name}')
      formatter = formatter.replace('{b}', '{point.name}')
      formatter = formatter.replace('{c}', '{point.y}')
      formatter = formatter.replace('{d}', '{point.percentage:.2f}%')
      // console.log('这个formatter',formatter)
      if(!formatter) {
        chart_option.tooltip.headerFormat =  `<small style="font-size:${tooltip.textStyle.fontSize}px;">{point.key}</small><table>`
        chart_option.tooltip.pointFormat = `<tr><td style="font-size:${tooltip.textStyle.fontSize}px;">{series.name}: </td>` +
          `<td style="text-align: right;font-size:${tooltip.textStyle.fontSize}px;"><b>{point.y}</b></td></tr>`
      } else {
        chart_option.tooltip.headerFormat = '';
        chart_option.tooltip.pointFormat = `<span style="font-size:${tooltip.textStyle.fontSize}px;">${formatter}</span>`
      }
      
      // chart_option.tooltip.formatter = formatter
    }

    // label
    if (customAttr.label) {
      const dataLabels = {}
      dataLabels.enabled = customAttr.label.show
      dataLabels.color = customAttr.label.color
      dataLabels.style = { color: customAttr.label.color, fontSize: customAttr.label.fontSize }
      const reg = new RegExp('\n', 'g')
      let formatter = customAttr.label.formatter.replace(reg, '<br/>')
      formatter = formatter.replace('{a}', '{series.name}')
      formatter = formatter.replace('{b}', '{point.name}')
      formatter = formatter.replace('{c}', '{point.y}')
      formatter = formatter.replace('{d}', '{point.percentage:.2f}%')
      dataLabels.format = formatter

      chart_option.plotOptions.pie.dataLabels = dataLabels
    }

    // size
    if (customAttr.size) {
      chart_option.chart.options3d.alpha = customAttr.size.alpha ? customAttr.size.alpha : 10
      chart_option.chart.options3d.beta = customAttr.size.beta ? customAttr.size.beta : 0
      chart_option.chart.options3d.depth = customAttr.size.depth ? customAttr.size.depth : 20
    }
  }

  // 处理data
  if (chart.data) {
    // chart_option.title.text = chart.title
    console.log('chart.data',chart.data)
    if (chart.data.series.length === 1) {
      chart_option.series[0].name = chart.data.series[0].name
      if (customAttr.color) {
        chart_option.series[0].opacity = customAttr.color.alpha / 100
      }

      // size
      if (customAttr.size) {
        chart_option.plotOptions.pie.innerSize = customAttr.size.pieInnerRadius? customAttr.size.pieInnerRadius + '%' : '0%'
      }
      chart_option.series[0].depth = customAttr.size.depth ? customAttr.size.depth : 20
      const valueArr = chart.data.series[0].data
      for (let i = 0; i < valueArr.length; i++) {
        const y = valueArr[i]
        y.name = chart.data.x[i]
        y.y = y.value
        chart_option.series[0].data.push(y)
      }
    } else if(chart.data.series.length > 1){
      const series = chart.data.series
      const x = chart.data.x[0].replace(/\r|\n/ig,",").split(',')
      console.log('xxxx',x)
      const arr = []
      for (let i = 0; i < series.length; i++) {
        const obj = {
          name: x.length === series.length?x[i]: series[i].name,
          y: series[i].data.map(ele => { return ele.value })[0],
        }
        if (customAttr.color) {
          obj.color = hexColorToRGBA(customAttr.color.colors[i % customAttr.color.colors.length], customAttr.color.alpha)
        }
        arr.push(obj)
      }
      chart_option.series[0].data = arr
      
    }

  }
  console.log('pie,chart_option', chart_option)
  componentStyle(chart_option, chart, cstyle)
  return chart_option
}
export function componentStyle(chart_option, chart,cstyle) {
  const padding = '8px'
  if (chart.customStyle) {
    const customStyle = JSON.parse(chart.customStyle)
    console.log('componentStyle: ', customStyle)

    if (customStyle.text) {
      chart_option.title.text = customStyle.text.show ? chart.title : ''
      const style = chart_option.title.style ? chart_option.title.style : {}
      style.fontSize = customStyle.text.fontSize
      style.color = customStyle.text.color
      style.fontFamily = customStyle.text.fontFamily? customStyle.text.fontFamily : cstyle && cstyle.fontFamily? cstyle.fontFamily : ''
      customStyle.text.isItalic ? style.fontStyle = 'italic' : style.fontStyle = 'normal'
      customStyle.text.isBolder ? style.fontWeight = 'bold' : style.fontWeight = 'normal'
      chart_option.title.style = style
      chart_option.title.align = customStyle.text.hPosition
      chart_option.title.verticalAlign = customStyle.text.vPosition
    }

    if (customStyle.legend && chart_option.legend) {
      chart_option.plotOptions.pie.showInLegend = customStyle.legend.show
      // chart_option.legend.padding = padding
      chart_option.legend.layout = customStyle.legend.orient
      chart_option.legend.verticalAlign = customStyle.legend.vPosition
      chart_option.legend.align = customStyle.legend.hPosition
      chart_option.legend.itemStyle = customStyle.legend.textStyle
      chart_option.legend.itemDistance = customStyle.legend.itemGap // 图例的间距
      chart_option.legend.itemMarginTop = customStyle.legend.marginTop // 图例的marginButtom
      chart_option.legend.itemMarginBottom = customStyle.legend.marginButtom // 图例的marginButtom
    }

    if (customStyle.background) {
      chart_option.chart.backgroundColor = hexColorToRGBA(customStyle.background.color, customStyle.background.alpha)
    }
  }
}
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

export const DEFAULT_YAXIS_EXT_STYLE = {
  show: true,
  position: 'right',
  name: '',
  nameTextStyle: {
    color: '#333333',
    fontSize: 12
  },
  axisLabel: {
    show: true,
    color: '#333333',
    fontSize: '12',
    rotate: 0,
    formatter: '{value}'
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#cccccc',
      width: 1,
      style: 'solid'
    }
  },
  axisValue: {
    auto: true,
    min: null,
    max: null,
    split: null,
    splitCount: null
  }
}

export function uuid() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

