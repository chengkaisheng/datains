import jsPDF from 'jspdf'
import 'jspdf-autotable'
// 导入中文字体
import './YouSheBiaoTiHei-2-normal.js'
// import './No.js'

export const printA4 = (columns, tableData) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  // 设置中文字体
  doc.setFont('YouSheBiaoTiHei-2')
  // doc.setFont("NotoSansCJKsc", "normal");

  // 生成表格
  doc.autoTable({
    columns,
    body: tableData,
    margin: { top: 15, left: 5, right: 5 },
    styles: {
      fontSize: 6,
      cellWidth: 'wrap',
      overflow: 'linebreak',
      font: 'YouSheBiaoTiHei-2',
      fontStyle: 'normal'
    },
    headStyles: {
      fillColor: [0, 122, 204],
      textColor: 255,
      fontSize: 7,
      fontStyle: 'normal',
      font: 'YouSheBiaoTiHei-2' // 设置表头字体
    },
    bodyStyles: {
      fontSize: 6,
      fontStyle: 'normal',
      font: 'YouSheBiaoTiHei-2' // 设置表格内容字体
    },
    didDrawPage(data) {
      doc.setFontSize(10)
      // doc.text('', 10, 10)
      const pageNumber = doc.internal.getNumberOfPages()
      doc.setFontSize(8)
      doc.text(`第 ${pageNumber} 页`, 270, 10)
    }
  })

  // 打开打印窗口
  const blobURL = doc.output('bloburl')
  const printWindow = window.open(blobURL, '_blank')
  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
  }
}
