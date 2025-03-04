import { createRouter, createWebHistory } from 'vue-router'
import DataFillHome from '../components/datafill/DataFillHome.vue'
import DataFillForm from '../components/datafill/DataFillForm.vue'

const routes = [
  {
    path: '/',
    component: DataFillHome
  },
  {
    path: '/fill-form',
    component: DataFillForm
  }
]

const router = createRouter({
  history: createWebHistory('/de-app/'),
  routes
})

export default router 