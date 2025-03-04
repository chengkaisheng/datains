import { createRouter, createWebHashHistory } from 'vue-router'
import DataFillHome from '../components/datafill/DataFillHome.vue'
import DataFillForm from '../components/datafill/DataFillForm.vue'

const routes = [
  {
    path: '/pages/tabBar/home/index',
    component: DataFillHome
  },
  {
    path: '/fill-form',
    component: DataFillForm
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

export default router 