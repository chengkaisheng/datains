import axios from 'axios'
import router from '@/router'
import Cookies from 'js-cookie'

const service = axios.create({
  baseURL: '/api',
  timeout: 180000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果请求头中已经有 Authorization，就不再添加
    if (!config.headers['Authorization']) {
      const token = Cookies.get('token')
      if (token) {
        config.headers['Authorization'] = token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // 如果是文件流直接返回
    if (response.config.responseType === 'blob') {
      return response.data
    }

    if (!res.success && res.code === 401) {
      // token 过期或无效时清除所有相关数据
      Cookies.remove('token')
      sessionStorage.removeItem('username') // 清除用户名
      localStorage.clear()
      router.push('/login')
      return Promise.reject(new Error(res.message || '认证失败'))
    }

    return res
  },
  error => {
    if (error.response && error.response.status === 401) {
      // 清除所有相关数据
      Cookies.remove('token')
      sessionStorage.removeItem('username') // 清除用户名
      localStorage.clear()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
