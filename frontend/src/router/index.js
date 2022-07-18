import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhoneView from '../views/PhoneView.vue'
import DevicesView from '../views/DevicesView.vue'
import SignInView from '../views/SignInView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/device/:deviceId',
    name: 'Device',
    component: PhoneView,
    props: true
  },
  {
    path: '/devices',
    name: 'Devices',
    component: DevicesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = (store.state.idToken !== '')
  if (to.name !== 'SignIn' && !isAuthenticated) {
    next({ name: 'SignIn' })
  } else {
    next()
  }
})

export default router
