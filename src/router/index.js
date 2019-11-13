import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import NotFound from '@/views/404'
import Live from '@/views/Live'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/Live',
    component: Live,
  },
  {
    path: '*',
    component: NotFound,
    hidden: true
  }
]

const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// const router = createRouter()

// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
