import request from '@/common/js/request'

export function login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
      url: '/api/auth/userInfo',
      method: 'post'
    })
}
  
export function logout() {
    return request({
      url: '/api/auth/logout',
      method: 'post'
    })
}

export function getPublicKey() {
    return request({
      url: '/api/auth/getPublicKey',
      method: 'get'
    })
}

export function buildVersion() {
    return request({
      url: '/about/build/version',
      method: 'get'
    })
}

export function validate(data) {
    return request({
        url: '/about/license/validate',
        method: 'post',
        data
    })
}

export function getUIinfo() {
  return request({
    url: '/system/ui/info',
    method: 'get'
  })
}

export function getList(data, params) {
  return request({
    url: `/dataFilling/myTask/todo/${data.page}/${data.pageSize}`,
    method: 'post',
    data: params
  })
}

export function getForm(id) {
  return request({
    url: `dataFilling/form/get/${id}`,
    method: 'post'
  })
}

export function submitForm(id, data) {
  return request({
    url: `dataFilling/myTask/fill/${id}`,
    method: 'post',
    data
  })
}

export function downloadTemplate(id) {
  return request({
    url: `dataFilling/form/${id}/excel/template`,
    method: 'post',
    responseType: 'blob'
  })
}

export function uploadData(id) {
  return request({
    url: `dataFilling/form/${id}/excel/upload`,
    method: 'post',
  })
}