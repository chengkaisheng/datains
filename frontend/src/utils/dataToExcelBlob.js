import * as XLSX from 'xlsx';

// 示例数据
// const data = [
//   ["姓名", "年龄", "城市"],
//   ["张三", 25, "北京"],
//   ["李四", 30, "上海"]
// ];

export const dataToExcelBlob = (data) => {
  // 1. 构建 Sheet 和 Workbook
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 2. 将 Workbook 写成 ArrayBuffer
  const arrayBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  // 3. 转为 Blob（关键步骤）
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  return blob
}
