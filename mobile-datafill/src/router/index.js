import { createRouter, createWebHashHistory } from 'vue-router'
import DataFillHome from '../components/datafill/DataFillHome.vue'
import DataFillForm from '../components/datafill/DataFillForm.vue'
import Login from '../views/Login.vue'
import Cookies from 'js-cookie'

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
router.beforeEach((to, from, next) => {
  Cookies.set('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDA1NjczNzYsInVzZXJJZCI6MzAsInVzZXJuYW1lIjoiMzcwMTE1MTk5NzEyMTI5NDczIn0.ZGioO2BJLK8b9zhVDs90opizkhKOMOEwzcreZah8u8Q')
  sessionStorage.setItem('nickName', '数据填报测试')
  const token = Cookies.get('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
