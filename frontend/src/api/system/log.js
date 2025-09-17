import request from '@/utils/request'

export function getLogList(goPage, pageSize, params) {
  return request({
    url: `/monitor/operlog/list/${goPage}/${pageSize}`,
    data: params,
    method: 'post',
    loading: true
  })
}

// export function updateInfo(data) {
//   return request({
//     url: '/system/edit/basic',
//     method: 'post',
//     loading: true,
//     data

//   })
// }
