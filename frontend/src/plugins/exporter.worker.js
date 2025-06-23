// exporter.worker.js
import * as XLSX from 'xlsx';


self.onmessage = function (e) {
  if (e.data.action === 'start') {
    const { chunkSize, excelHeader, excelData } = e.data;

    const wb = XLSX.utils.book_new();
    const wsName = "Sheet";
    
    const ws = XLSX.utils.aoa_to_sheet([excelHeader]);
    XLSX.utils.book_append_sheet(wb, ws, wsName);

    const totalRows = excelData.length;
    // const totalRows = 300000;
    let processed = 0;
    const startTime = Date.now();

    const writeChunk = () => {
      if (processed >= totalRows) {
        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const totalTime = (Date.now() - startTime) / 1000;
        self.postMessage({ type: 'complete', result: buffer, totalTime });
        return;
      }

      let chunk = excelData.slice(processed, processed + chunkSize);
      // let chunk = []
      // for(let i = 0; i < 1000; i++) {
      //   // arr = [...arr, ...excelData]
      //   chunk.push(
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34],
      //     ["城乡居民基本医疗保险(含长护险)","单病种(省编码)",24022.34])
      // }
      XLSX.utils.sheet_add_aoa(ws, chunk, { origin: -1 });
      processed += chunk.length;

      self.postMessage({
        type: 'progress',
        percent: Math.floor((processed / totalRows) * 100)
      });
      chunk = null

      setTimeout(writeChunk, 10); // 小延迟让 worker 呼吸
    };

    writeChunk();
  }
};
