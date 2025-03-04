import request from '@/utils/request'

// 获取任务树
export function getTaskTree(data) {
  return request({
    url: '/dataFilling/form/tree',
    method: 'post',
    data
  })
}

// 获取模板列表
export function getTemplates(data) {
  return request({
    url: '/dataFilling/form/selectForm/1/10000',
    method: 'post',
    data
  })
}

// 下载模板
export function downloadTemplate(templateId) {
  return request({
    url: `/dataFilling/form/${templateId}/excel/template`,
    method: 'post',
    responseType: 'blob'
  })
}

// 上传数据
export function uploadData(templateId, data) {
  return request({
    url: `/dataFilling/form/${templateId}/excel/upload`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} 

// 保存表单数据
export function saveSelfReport(data) {
  return request({
    url: '/dataFilling/form/save',
    method: 'post',
    data
  })
}

export function saveFormData(data) {
  return request({
    url: '/dataFilling/form/saveFormData',
    method: 'post',
    data
  })
}

export function getFormData(id) {
  return request({
    url: '/dataFilling/form/getFormData/' + id,
    method: 'post',
  })
}
