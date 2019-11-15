import router from '@/router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress'
import store from './store'
store.dispatch('getUserInfo')

const { routes } = store.getters
const whilteList = ['/login','/blog']
if (routes && routes.length > 0) {
  router.setRoutes(routes,router)
}

function checkPermission() {
  const { userName, token, routes } = store.getters
  return (userName && token && routes && routes.length > 0)
}

router.beforeEach((to, from ,next) => {
  const { routes } = router.options
  Nprogress.start()
  if (checkPermission()) {
    if (to.path === '/' && routes.length > 2) {
      const route = routes[1]
      next({ path: route.path })
      return
    }
    next()
  } else {
    if (whilteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
router.afterEach((to, from ,next) => {
  Nprogress.done()
})
