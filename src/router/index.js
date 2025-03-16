// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

import AppMain from '@/components/layout/AppMain.vue'
import Main from '@/pages/index.vue'
import RealEstate from '@/pages/realestate'
import RegistrationRealEstate from '@/pages/realestate/RegistrationRealEstate.vue'
import SignUp from '@/pages/SignUp.vue'
import SignIn from '@/pages/SignIn.vue'

const routes = [
  {
    path: '/',
    name: 'AppMain',
    component: AppMain,
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'Main',
        component: Main,
      },
      {
        path: '/real-estate',
        children: [
          {
            path: '',
            name: 'RealEstate',
            component: RealEstate,
          },
          {
            path: 'registration',
            name: 'RegistrationRealEstate',
            component: RegistrationRealEstate,
          },
        ]
      }
    ]
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
