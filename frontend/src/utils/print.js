import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const printA4 = (columns, tableData) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  // 生成表格
  doc.autoTable({
    columns,
    body: tableData,
    margin: { top: 15, left: 5, right: 5 },
    styles: {
      fontSize: 6,
      cellWidth: 'wrap',
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [0, 122, 204],
      textColor: 255,
      fontSize: 7
    },
    bodyStyles: {
      fontSize: 6
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