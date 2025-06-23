// index.js
import ExporterWorker from 'worker-loader!./exporter.worker.js';
export function createExcelExporter(options = {}) {
  const {
    // totalRows = 300000,
    chunkSize = 20000,
    excelHeader,
    excelData,
    onProgress = () => {},
    onComplete = () => {},
    onError = () => {},
  } = options;

  // let worker = null;
  let worker = new ExporterWorker()

  function start() {

    worker.onmessage = (e) => {
      const { type, ...data } = e.data;

      if (type === 'progress') {
        onProgress(data);
      } else if (type === 'complete') {
        const blob = new Blob([data.result], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        onComplete({ blob, totalTime: data.totalTime });
        cleanup();
      }
    };

    worker.onerror = (e) => {
      onError(e);
      cleanup();
    };

    worker.postMessage({
      action: 'start',
      // totalRows,
      chunkSize,
      excelHeader,
      excelData,
    });
  }

  function cancel() {
    if (worker) {
      worker.terminate();
      cleanup();
    }
  }

  function cleanup() {
    worker = null;
  }

  return { start, cancel };
}
