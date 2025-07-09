import '@/assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import VeterinarianView from '@/views/HomeView.vue'
import OwnerView from '@/views/HomeView.vue'
import FarrierView from '@/views/FarrierView.vue'
import LoginView from '@/views/LoginView.vue'
import StaticLandingView from '@/views/StaticLandingView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import VerifyUserComponent from '@/components/VerifyUserComponent.vue'
import ContactoView from '@/views/ContactoView.vue'
import VentasView from '@/views/VentasView.vue'

const routes = [
  {
    path: '/',
    name: 'homeStatic',
    component: StaticLandingView
  },
  {
    path: '/contacto',
    name: 'ContactoStatic',
    component: ContactoView
  },
  {
    path: '/venta',
    name: 'VentasStatic',
    component: VentasView
  },
  {
    path: '/caballo/:id',
    name: 'CaballoDetalle',
    component: () => import('@/views/CaballoDetalleView.vue'),
  },
  {
    path: '/',
    component: AuthLayout,    
    children: [
      {
        path: 'login',
        name: 'rootLogin',
        component: LoginView
      },
      {
        path: 'verify/:token(.*)',
        name: 'verify',
        component: VerifyUserComponent
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: HomeView
      },
      {
        path: 'veterinarian',
        name: 'veterinarian',
        component: VeterinarianView
      },
      {
        path: 'owner',
        name: 'owner',
        component: OwnerView
      },
      {
        path: 'farrier',
        name: 'farrier',
        component: FarrierView
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
