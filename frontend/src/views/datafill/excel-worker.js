// 引入需要的库
self.importScripts('https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js');

// 监听主线程消息
self.onmessage = function(e) {
  try {
    const file = e.data.file;
    
    // 创建文件读取器
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        // 读取xls文件
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        
        // 转换为xlsx格式，保持原有格式和样式
        const xlsxOutput = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
          cellStyles: true,
          bookSST: true,
          compression: true
        });
        
        // 发送转换后的数据回主线程
        self.postMessage({
          success: true,
          data: xlsxOutput
        });
      } catch (error) {
        self.postMessage({
          success: false,
          error: error.message
        });
      }
    };
    
    reader.onerror = function(error) {
      self.postMessage({
        success: false,
        error: '文件读取失败'
      });
    };
    
    // 开始读取文件
    reader.readAsArrayBuffer(file);
    
  } catch (error) {
    self.postMessage({
      success: false,
      error: error.message
    });
  }
}; 