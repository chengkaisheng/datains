import request from '@/utils/request'

export function saveForm(data) {
  return request({
    url: 'dataFillingTemplate/form/save',
    method: 'post',
    loading: true,
    data
  })
}
export function saveFormData(data) {
  return request({
    url: 'dataFillingTemplate/form/saveFormData',
    method: 'post',
    loading: true,
    data
  })
}
export function getFormData(id) {
  return request({
    url: 'dataFillingTemplate/form/getFormData/' + id,
    method: 'post',
    loading: true,
  })
}
export function updateForm(data) {
  return request({
    url: 'dataFillingTemplate/form/update',
    method: 'post',
    loading: true,
    data
  })
}
export function updateFormName(data) {
  return request({
    url: 'dataFillingTemplate/form/updateName',
    method: 'post',
    loading: true,
    data
  })
}
export function moveForm(data) {
  return request({
    url: 'dataFillingTemplate/form/move',
    method: 'post',
    loading: true,
    data
  })
}

export function listForm(data) {
  return request({
    url: 'dataFillingTemplate/form/tree',
    method: 'post',
    loading: true,
    data
  })
}

export function deleteForm(id) {
  return request({
    url: 'dataFillingTemplate/form/delete/' + id,
    method: 'post',
    loading: true
  })
}
export function getForm(id) {
  return request({
    url: 'dataFillingTemplate/form/get/' + id,
    method: 'post',
    loading: true
  })
}
export function deleteData(formId, rowId) {
  return request({
    url: 'dataFillingTemplate/form/' + formId + '/delete/' + rowId,
    method: 'post',
    loading: true
  })
}
export function downloadTemplate(formId) {
  return request({
    url: 'dataFillingTemplate/form/' + formId + '/excel/template',
    method: 'post',
    loading: true,
    responseType: 'blob'
  })
}
export function getWithPrivileges(id) {
  return request({
    url: 'dataFillingTemplate/manage/form/' + id,
    method: 'post',
    loading: true
  })
}
export function searchTable(id, data) {
  return request({
    url: 'dataFillingTemplate/form/' + id + '/tableData',
    method: 'post',
    loading: true,
    data
  })
}
export function searchCommitLogs(formId, data, goPage, pageSize) {
  return request({
    url: 'dataFillingTemplate/form/' + formId + '/commitLog/' + goPage + '/' + pageSize,
    method: 'post',
    loading: true,
    data
  })
}

export function searchFormTasks(formId, data, goPage, pageSize) {
  return request({
    url: 'dataFillingTemplate/form/' + formId + '/task/' + goPage + '/' + pageSize,
    method: 'post',
    loading: true,
    data
  })
}

export function searchFormMyTasks(data, goPage, pageSize, type) {
  return request({
    url: 'dataFillingTemplate/myTask/' + type + '/' + goPage + '/' + pageSize,
    method: 'post',
    loading: true,
    data
  })
}
export function saveFormTasks(formId, data) {
  return request({
    url: 'dataFillingTemplate/form/' + formId + '/task/save',
    method: 'post',
    loading: true,
    data
  })
}
export function deleteFormTasks(id) {
  return request({
    url: 'dataFillingTemplate/form/task/' + id + '/delete',
    method: 'post',
    loading: true
  })
}
export function enableFormTasks(id) {
  return request({
    url: 'dataFillingTemplate/form/task/' + id + '/enable',
    method: 'post',
    loading: true
  })
}
export function disableFormTasks(id) {
  return request({
    url: 'dataFillingTemplate/form/task/' + id + '/disable',
    method: 'post',
    loading: true
  })
}

export function newFormRowData(formId, data) {
  return request({
    url: 'dataFillingTemplate/form/' + formId + '/rowData/save',
    method: 'post',
    loading: true,
    data
  })
}

export function saveFormRowData(formId, id, data) {
  return request({
    url: 'dataFillingTemplate/form/' + formId + '/rowData/save/' + id,
    method: 'post',
    loading: true,
    data
  })
}

export function userFillFormData(userTaskId, data) {
  return request({
    url: `dataFillingTemplate/myTask/fill/${userTaskId}`,
    method: 'post',
    loading: true,
    data
  })
}

export function getTableColumnData(optionDatasource, optionTable, optionColumn, optionOrder) {
  return request({
    url: `dataFillingTemplate/form/${optionDatasource}/options`,
    method: 'post',
    loading: true,
    data: {
      optionTable: optionTable,
      optionColumn: optionColumn,
      optionOrder: optionOrder
    }
  })
}

export function uploadExcelForm(id, data) {
  return request({
    url: `dataFillingTemplate/form/excel/excelUploadToFrom/${id}`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function excelUploadAiHandle(data) {
  return request({
    url: 'dataFillingAi/form/excel/excelUploadAiHandle',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'blob'
  })
}
