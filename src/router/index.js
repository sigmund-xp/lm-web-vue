import '../assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLogin from '../components/AppLogin.vue'
import AppVerifyUser from '../components/AppVerifyUser.vue'

const routes = [
  {
    path: '/',
    name: 'rootLogin',
    component: AppLogin
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin
  },
  {
    path: '/verify',
    name: 'verify',
    component: AppVerifyUser
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
