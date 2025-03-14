import * as XLSX from 'xlsx';

/**
 * 将Excel文件转换为JSON
 * @param {File|ArrayBuffer} file - Excel文件或ArrayBuffer数据
 * @param {Object} options - 配置选项
 * @param {string} [options.sheetName] - 指定要读取的sheet名称
 * @param {boolean} [options.allSheets] - 是否读取所有sheet
 * @param {Object} [options.dateNF] - 日期格式化选项
 * @returns {Object|Array} 转换后的JSON数据
 */
export const excelToJson = (file, options = {}) => {
  try {
    // 处理文件类型
    let data = file;
    if (file instanceof File) {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          const workbook = XLSX.read(e.target.result, { type: 'array' });
          resolve(processWorkbook(workbook, options));
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });
    }

    // 非File对象的处理
    const workbook = XLSX.read(data, { type: 'array' });
    return processWorkbook(workbook, options);
  } catch (error) {
    console.error('Excel解析错误:', error);
    throw new Error('Excel文件解析失败');
  }
};

// 处理工作簿的辅助函数
const processWorkbook = (workbook, options) => {
  // 如果指定了sheet名称
  if (options.sheetName && workbook.SheetNames.includes(options.sheetName)) {
    const sheet = workbook.Sheets[options.sheetName];
    return XLSX.utils.sheet_to_json(sheet, {
      raw: false,
      defval: '',
    });
  }

  // 如果需要读取所有sheet
  if (options.allSheets) {
    const result = {};
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      result[sheetName] = XLSX.utils.sheet_to_json(sheet, {
        raw: false,
        defval: '',
      });
    });
    return result;
  }

  // 默认读取第一个sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, {
    raw: false,
    defval: '',
  });
};
