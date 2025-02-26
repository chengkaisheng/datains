import request from '@/utils/request'

const datafill = {

  // 新增数据填报信息
  addDataFill(data) {
    return request.post('/fill/insert', data)
  },

  // 查询数据填报信息
  getDataFill(data) {
    return request.post(`/fill/select/${data.goPage}/${data.pageSize}`, {})
  },

  // 更新数据填报信息
  updateDataFill(data) {
    return request.post('/fill/update', data)
  },

  // 删除数据填报信息
  deleteDataFill(id) {
    return request.post(`/fill/delete/${id}`)
  },

  // 保存表单数据 
  saveFormData(data) {
    return request.post('/fill/saveFormData', data)
  },

  // 获取表单数据
  getFormData(id) {
    return request.post(`/fill/getFormData/${id}`)
  },

  // 下载模板
  getFormTemplate(id) {
    return request.post(`/fill/getFormTemplate/${id}`)
  },

}

export default datafill
