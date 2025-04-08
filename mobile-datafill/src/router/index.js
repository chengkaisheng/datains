import { createRouter, createWebHashHistory } from 'vue-router'
import DataFillHome from '../components/datafill/DataFillHome.vue'
import DataFillForm from '../components/datafill/DataFillForm.vue'
import Login from '../views/Login.vue'
import Cookies from 'js-cookie'
import { getUserInfo, qyyLogin } from '@/api/user'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/pages/tabBar/home/index',
    component: DataFillHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/fill-form',
    component: DataFillForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/pages/tabBar/home/index'
  }
]

const router = createRouter({
  history: createWebHashHistory('/de-app/'),
  routes
})

// 路由守卫
router.beforeEach(async(to, from, next) => {
  const token = Cookies.get('token')

  // // 如果是从轻应用跳转的需要获取传过来的qyyToken给后端接口，获取平台token
  // if(to.path === '/pages/tabBar/home/index') {
  //   const qyyToken = getQueryVariable('token') // 获取轻应用token
  //   let qyyLoginFlag = sessionStorage.getItem('qyyLogin')
  //   if(qyyToken && qyyLoginFlag !== 'true') {
  //     clearAllCookies()
  //     let res = await qyyLogin(qyyToken)
  //     if (res.success) {
  //       sessionStorage.setItem('qyyLogin', 'true')
  //       const token = res.data.token
  //       // 设置会话 cookie，不设置 expires，浏览器关闭即失效
  //       Cookies.set('token', token)
  //       // 获取用户信息，传入 token
  //       await getUserInfo(token)
  //       // router.push('/')
  //     }
  //     next()
  //   } else if (!token) {
  //     next(`/login`)
  //   }
  // }
  if (to.meta.requiresAuth && !token) {
    // next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

const getQueryVariable = (variable) => {
  // let query = window.location.search.substring(1)
  let query = window.location.href.split('?')[1]
  let vars = []
  if (!query) {
    // query = document.cookie
    // vars = query.split(';')
    return null
  } else {
    vars = query.split('&')
  }
  for (var i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0].trim() === variable) {
      return pair[1]
    }
  }
  return (null)
}

const clearAllCookies = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export default router
