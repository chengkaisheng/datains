import LuckyExcel from "luckyexcel"

// let interval = null;

async function transform(file) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      LuckyExcel.transformExcelToLucky(
        file,
        (exportJson, luckysheetfile) => {
          if (!exportJson ||
            !exportJson.sheets ||
            exportJson.sheets.length === 0) {
            reject(new Error('文件解析失败！'));
            return;
          }
          resolve(exportJson);
        },
        (err) => {
          reject(err || new Error('文件解析失败！'));
        }
      );
    }, 0)
  });
}

self.addEventListener('message', async (e) => {
  if (e.data.type === 'FILE') {
    const file = e.data.file;
    
    // 增加心跳间隔到500ms，减少压力
    // interval = setInterval(() => {
    //   self.postMessage({ type: 'heart' });
    // }, 500);

    try {
      const result = await transform(file);
      self.postMessage({
        type: 'data',
        data: result
      });
    } catch (err) {
      self.postMessage({
        type: 'message',
        message: err.message
      });
    } finally {
      // clearInterval(interval);
    }
  }
}, false);

