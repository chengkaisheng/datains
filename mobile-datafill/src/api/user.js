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

// 获取用户信息
export function getUserInfo (token) {
  try {
    getInfo(token).then(res => {
      if (res.success) {
        // 使用昵称作为水印，如果没有昵称则使用用户名
        sessionStorage.setItem('nickName', res.data.nickName || '水印')
      }
    })
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

export function qyyLogin(qyyToken) {
  return request({
    url: '/api/auth/qyyLogin?qyyToken=' + qyyToken,
    method: 'get',
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