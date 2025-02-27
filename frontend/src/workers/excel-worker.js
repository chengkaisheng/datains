import * as XLSX from 'xlsx';

// 监听主线程消息
self.addEventListener('message', (e) => {
  console.log('123', e);
  
  const { file } = e.data;
  
  try {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // 将xls转换为xlsx的二进制数据
      const xlsxBuffer = XLSX.write(workbook, { 
        bookType: 'xlsx', 
        type: 'array' 
      });

      // 发送转换后的数据回主线程
      self.postMessage({ 
        success: true,
        data: xlsxBuffer 
      });
    };

    reader.onerror = () => {
      self.postMessage({ 
        success: false,
        error: 'Failed to read file' 
      });
    };

    reader.readAsArrayBuffer(file);
  } catch (error) {
    self.postMessage({ 
      success: false,
      error: error.message 
    });
  }
}); 