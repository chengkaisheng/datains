import request from '@/utils/request'
import Cookies from 'js-cookie'
import router from '@/router'

export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  }).finally(() => {
    // 清除所有相关数据
    Cookies.remove('token')
    sessionStorage.removeItem('username') // 清除用户名
    localStorage.clear()
    router.push('/login')
  })
}

export function getPublicKey() {
  return request({
    url: '/api/auth/getPublicKey',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/api/auth/userInfo',
    method: 'post',
    headers: {
      'Authorization': token
    }
  })
}