import Vue from 'vue'
import Router from 'vue-router'
import { setRoutes } from './utils'

Vue.use(Router)

import NotFound from '@/views/404'
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true,
},{
  path: '*',
  component: NotFound,
  hidden: true
}]
const content = require.context(__dirname, false, /^((?!index).)+\.js/)
const routerMap = content.keys().map((item) => content(item).default)
class MyRouter extends Router {
  setRoutes(routes, currentRoutes) {
    setRoutes(routes, currentRoutes, routerMap, constantRoutes)
  }
}
const router = new MyRouter({
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
