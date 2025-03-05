import axios from 'axios'
import { showToast } from 'vant'

const service = axios.create({
  baseURL: '/api',
  timeout: 180000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这里可以添加token等认证信息
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDA1NjczNzYsInVzZXJJZCI6MzAsInVzZXJuYW1lIjoiMzcwMTE1MTk5NzEyMTI5NDczIn0.ZGioO2BJLK8b9zhVDs90opizkhKOMOEwzcreZah8u8Q'
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  error => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 如果是文件流，直接返回
    if (response.config.responseType === 'blob') {
      return response.data
    }

    const res = response.data
    if (res.success) {
      return res
    } else {
      showToast(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    console.error('请求错误:', error)
    // showToast(error.message || '请求失败')
    showToast(error.response.data.message || '请求失败')
    return Promise.reject(error)
  }
)

export default service 