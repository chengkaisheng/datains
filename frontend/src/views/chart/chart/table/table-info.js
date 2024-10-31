import { TableSheet, S2Event, PivotSheet } from '@antv/s2'
import { getCustomTheme, getSize } from '@/views/chart/chart/common/common_table'
import { DEFAULT_TOTAL } from '@/views/chart/chart/chart'

export function baseTableInfo(s2, container, chart, action, tableData, fontFamily = '') {
  const containerDom = document.getElementById(container)
  const xaxis = JSON.parse(chart.xaxis)
  const yaxis = JSON.parse(chart.yaxis)
  const nameMap = [...xaxis, ...yaxis].reduce((pre, next) => {
    pre[next.datainsName] = next
    return pre
  }, {})
  // fields
  const fields = chart.data.fields
  if (!fields || fields.length === 0) {
    if (s2) {
      s2.destroy()
    }
    return
  }

  const columns = []
  const meta = []

  // add drill list
  if (chart.drill) {
    let drillFields = []
    try {
      drillFields = JSON.parse(chart.drillFields)
    } catch (err) {
      drillFields = JSON.parse(JSON.stringify(chart.drillFields))
    }

    const drillField = drillFields[chart.drillFilters.length]

    const drillFilters = JSON.parse(JSON.stringify(chart.drillFilters))
    const drillExp = drillFilters[drillFilters.length - 1].datasetTableField

    // 移除所有下钻字段
    const removeField = []
    for (let i = 0; i < chart.drillFilters.length; i++) {
      const ele = chart.drillFilters[i].datasetTableField
      removeField.push(ele.datainsName)
    }

    // build field
    fields.forEach(ele => {
      const f = nameMap[ele.datainsName]
      if (!f || f.hidden === true) {
        return
      }
      if (removeField.indexOf(ele.datainsName) < 0) {
        // 用下钻字段替换当前字段
        if (drillExp.datainsName === ele.datainsName) {
          columns.push(drillField.datainsName)
          meta.push({
            field: drillField.datainsName,
            name: drillField.name
          })
        } else {
          columns.push(ele.datainsName)
          meta.push({
            field: ele.datainsName,
            name: ele.name
          })
        }
      }
    })
  } else {
    fields.forEach(ele => {
      const f = nameMap[ele.datainsName]
      if (!f || f.hidden === true) {
        return
      }
      columns.push(ele.datainsName)
      meta.push({
        field: ele.datainsName,
        name: ele.name
      })
    })
  }

  // data config
  const s2DataConfig = {
    fields: {
      columns: columns
    },
    meta: meta,
    data: tableData
  }

  // options
  const s2Options = {
    width: containerDom.offsetWidth,
    height: containerDom.offsetHeight,
    // showSeriesNumber: true
    style: getSize(chart)
  }

  // 开始渲染
  if (s2) {
    s2.destroy()
  }
  s2 = new TableSheet(containerDom, s2DataConfig, s2Options)
  // console.log('S2',s2)
  // s2.facet.setScrollOffset(1)

  // click
  s2.on(S2Event.DATA_CELL_CLICK, action)

  // theme
  const customTheme = getCustomTheme(chart, fontFamily)
  s2.setThemeCfg({ theme: customTheme })

  return s2
}

export function baseTableNormal(s2, container, chart, action, tableData, fontFamily = '') {
  // console.log('s2, container, chart, action, tableData', s2, container, chart, action, tableData)
  const containerDom = document.getElementById(container)
  const xaxis = JSON.parse(chart.xaxis)
  const yaxis = JSON.parse(chart.yaxis)
  const nameMap = [...xaxis, ...yaxis].reduce((pre, next) => {
    pre[next.datainsName] = next
    return pre
  }, {})
  // fields
  const fields = chart.data.fields
  if (!fields || fields.length === 0) {
    if (s2) {
      s2.destroy()
    }
    return
  }

  const columns = []
  const meta = []

  // add drill list
  if (chart.drill) {
    let drillFields = []
    try {
      drillFields = JSON.parse(chart.drillFields)
    } catch (err) {
      drillFields = JSON.parse(JSON.stringify(chart.drillFields))
    }
    const drillField = drillFields[chart.drillFilters.length]

    const drillFilters = JSON.parse(JSON.stringify(chart.drillFilters))
    const drillExp = drillFilters[drillFilters.length - 1].datasetTableField

    // 移除所有下钻字段
    const removeField = []
    for (let i = 0; i < chart.drillFilters.length; i++) {
      const ele = chart.drillFilters[i].datasetTableField
      removeField.push(ele.datainsName)
    }

    // build field
    fields.forEach(ele => {
      const f = nameMap[ele.datainsName]
      if (!f || f.hidden === true) {
        return
      }
      if (removeField.indexOf(ele.datainsName) < 0) {
        // 用下钻字段替换当前字段
        if (drillExp.datainsName === ele.datainsName) {
          columns.push(drillField.datainsName)
          meta.push({
            field: drillField.datainsName,
            name: drillField.name
          })
        } else {
          columns.push(ele.datainsName)
          meta.push({
            field: ele.datainsName,
            name: ele.name
          })
        }
      }
    })
  } else {
    fields.forEach(ele => {
      const f = nameMap[ele.datainsName]
      if (!f || f.hidden === true) {
        return
      }
      columns.push(ele.datainsName)
      meta.push({
        field: ele.datainsName,
        name: ele.name
      })
    })
  }

  // data config
  const s2DataConfig = {
    fields: {
      columns: columns
    },
    meta: meta,
    data: tableData
  }

  // options
  const s2Options = {
    width: containerDom.offsetWidth,
    height: containerDom.offsetHeight,
    // showSeriesNumber: true
    style: getSize(chart)
  }

  // 开始渲染
  if (s2) {
    s2.destroy()
  }
  s2 = new TableSheet(containerDom, s2DataConfig, s2Options)

  // click
  s2.on(S2Event.DATA_CELL_CLICK, action)

  // theme
  const customTheme = getCustomTheme(chart, fontFamily)
  s2.setThemeCfg({ theme: customTheme })

  return s2
}

export function baseTablePivot(s2, container, chart, action, tableData, fontFamily = '') {
  const containerDom = document.getElementById(container)

  // row and column
  const columnFields = JSON.parse(chart.xaxis)
  const xnameMap = columnFields.reduce((pre, next) => {
    pre[next.datainsName] = next
    return pre
  }, {})
  const rowFields = JSON.parse(chart.xaxisExt)
  const xenameMap = rowFields.reduce((pre, next) => {
    pre[next.datainsName] = next
    return pre
  }, {})
  const valueFields = JSON.parse(chart.yaxis)
  const ynameMap = valueFields.reduce((pre, next) => {
    pre[next.datainsName] = next
    return pre
  }, {})
  const nameMap = { ...xnameMap, ...xenameMap, ...ynameMap }
  const c = []; const r = []; const v = []
  columnFields.forEach(ele => {
    const f = xnameMap[ele.datainsName]
    if (!f || f.hidden === true) {
      return
    }
    c.push(ele.datainsName)
  })
  rowFields.forEach(ele => {
    const f = xenameMap[ele.datainsName]
    if (!f || f.hidden === true) {
      return
    }
    r.push(ele.datainsName)
  })
  valueFields.forEach(ele => {
    v.push(ele.datainsName)
  })

  // fields
  const fields = chart.data.fields
  if (!fields || fields.length === 0) {
    if (s2) {
      s2.destroy()
    }
    return
  }

  const columns = []
  const meta = []

  // add drill list
  if (chart.drill) {
    const drillFields = JSON.parse(chart.drillFields)
    const drillField = drillFields[chart.drillFilters.length]

    const drillFilters = JSON.parse(JSON.stringify(chart.drillFilters))
    const drillExp = drillFilters[drillFilters.length - 1].datasetTableField

    // 移除所有下钻字段
    const removeField = []
    for (let i = 0; i < chart.drillFilters.length; i++) {
      const ele = chart.drillFilters[i].datasetTableField
      removeField.push(ele.datainsName)
    }

    // build field
    fields.forEach(ele => {
      const f = nameMap[ele.datainsName]
      if (!f || f.hidden === true) {
        return
      }
      if (removeField.indexOf(ele.datainsName) < 0) {
        // 用下钻字段替换当前字段
        if (drillExp.datainsName === ele.datainsName) {
          columns.push(drillField.datainsName)
          meta.push({
            field: drillField.datainsName,
            name: drillField.name
          })
        } else {
          columns.push(ele.datainsName)
          meta.push({
            field: ele.datainsName,
            name: ele.name
          })
        }
      }
    })
  } else {
    fields.forEach(ele => {
      const f = nameMap[ele.datainsName]
      if (!f || f.hidden === true) {
        return
      }
      columns.push(ele.datainsName)
      meta.push({
        field: ele.datainsName,
        name: ele.name
      })
    })
  }

  // data config
  const s2DataConfig = {
    fields: {
      rows: r,
      columns: c,
      values: v
    },
    meta: meta,
    data: tableData
  }

  // total config
  let totalCfg = {}
  const chartObj = JSON.parse(JSON.stringify(chart))
  if (chartObj.customAttr) {
    let customAttr = null
    if (Object.prototype.toString.call(chartObj.customAttr) === '[object Object]') {
      customAttr = JSON.parse(JSON.stringify(chartObj.customAttr))
    } else {
      customAttr = JSON.parse(chartObj.customAttr)
    }
    if (customAttr.totalCfg) {
      totalCfg = customAttr.totalCfg
    } else {
      totalCfg = JSON.parse(JSON.stringify(DEFAULT_TOTAL))
    }
  }
  totalCfg.row.subTotalsDimensions = r
  totalCfg.col.subTotalsDimensions = c

  // 总计
  totalCfg.row.calcTotals = {
    calcFunc: (query, data, spreadsheet) => calcTotal(query, data, spreadsheet, valueFields)
  }
  // 小计
  totalCfg.row.calcSubTotals = {
    calcFunc: (query, data, spreadsheet) => calcTotal(query, data, spreadsheet, valueFields)
  }
  // totalCfg.row.calcGrandTotals = {
  //   calcFunc: (query, data, spreadsheet) => {
  //     console.log('query, data, spreadsheet', query, data, spreadsheet);
  //     return 0
  //   }
  // }

  // options
  const s2Options = {
    width: containerDom.offsetWidth,
    height: containerDom.offsetHeight,
    style: getSize(chart),
    totals: totalCfg,
    // rowCell: (node, s2, headConfig) => {
    //   console.log('rowCell,,,',node, s2, headConfig)
    // },
    // colCell: (node, s2, headConfig) => {
    //   console.log('colCell',node,s2,headConfig)
    // }
  }

  // 开始渲染
  if (s2) {
    s2.destroy()
  }
  s2 = new PivotSheet(containerDom, s2DataConfig, s2Options)

  // click
  s2.on(S2Event.DATA_CELL_CLICK, action)

  // theme
  const customTheme = getCustomTheme(chart, fontFamily)
  const s2Palette = {
    basicColors: [
      customTheme.paletteBasicColors0
    ],
    semanticColors: {
      red: '#FF4D4F',
      green: '#29A294',
    },
  }
  s2.setThemeCfg({ 
    theme: customTheme,
    palette: s2Palette,
  })

  return s2
}

const calcTotal = (query, data, spreadsheet, valueFields) => {
  // console.log('query, data, spreadsheet', query, data, spreadsheet);
  let arr = valueFields.filter(item => item.datainsName === query.$$extra$$)
  if (arr.length > 0 && arr[0].proportionOne && arr[0].proportionTwo) {
    // 需要计算占比，需要先把另外两列求和
    let total1 = 0
    let total2 = 0
    data.map(item => {
      total1 += typeof item[arr[0].proportionOne] === 'string' ? Number(item[arr[0].proportionOne].replace(/,/g, '')) : item[arr[0].proportionOne]
      total2 += typeof item[arr[0].proportionTwo] === 'string' ? Number(item[arr[0].proportionTwo].replace(/,/g, '')) : item[arr[0].proportionTwo]
    })
    return (total1 / total2 * 100).toFixed(arr[0].totalaccuracy) + '%'
  } else {
    // 不需要计算占比，直接求和
    let total = 0
    data.map(item => {
      total += typeof item[query.$$extra$$] === 'string' ? Number(item[query.$$extra$$].replace(/,/g, '')) : item[query.$$extra$$]
    })
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}