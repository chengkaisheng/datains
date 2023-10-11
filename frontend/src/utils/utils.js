import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'

/**
 * 异步读取Excel文件的sheet表为json数据
 * 不支持合并单元格
 * @param {File对象} file
 */
export function readExcelToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let binary = ''

    reader.onload = (e) => {
      // 第一种方式
      const bytes = new Uint8Array(e.target.result)
      // const bytes = new Uint8Array(reader.result)

      const length = bytes.byteLength
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }

      console.log('XLSX: ', XLSX)
      const workbook = XLSX.read(binary, {
        type: 'binary',
        codepage: 936
      })

      // const workbook = XLSX.read(data, { type: 'array' })

      // 将Excel 第一个sheet内容转为json格式
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json(worksheet)

      resolve(json)
    }

    reader.readAsArrayBuffer(file)
  })
}

/**
 * 保存json为Excel文件
 * @param {*} data
 * @param {*} filename  文件名后缀为.xlsx
 */
export function saveJsonToExcel(data, filename, success, fail, download = false) {
  const sheet = XLSX.utils.json_to_sheet(data)

  try {
    const workbook = {
      SheetNames: ['sheet1'],
      Sheets: {
        sheet1: sheet
      }
    }

    const wbout = XLSX.write(workbook, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
    })

    if (download) {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        filename
      )
    }

    if (Object.prototype.toString.call(success) === '[object Function]') {
      success(new File([wbout], filename, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
    }
  } catch (error) {
    console.error('错误：', error)
    if (Object.prototype.toString.call(fail) === '[object Function]') {
      fail('文件太大了')
    }
  }
}
