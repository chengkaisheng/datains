import LuckyExcel from "luckyexcel"

// let interval = null;

async function transform(file) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
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
      } catch(error) {
        self.postMessage({
          type: 'heart',
          message: error
        });
      }
      
    }, 0)
  });
}

function _unhandledRejectionHandler(event) {
  if (
    event.reason &&
    typeof event.reason.stack === 'string' &&
    event.reason.stack.includes('worker.js')
  ) {
    self.postMessage({
      type: 'error',
      message: event.reason.message || 'Unhandled rejection in luckysheet',
    });
  }
}

self.addEventListener('message', async (e) => {
  if (e.data.type === 'FILE') {
    const file = e.data.file;
    
    // 增加心跳间隔到500ms，减少压力
    // interval = setInterval(() => {
    //   self.postMessage({ type: 'heart' });
    // }, 500);
    
    self.addEventListener('unhandledrejection', _unhandledRejectionHandler);

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

