import store from '@/store'
import * as _ from 'lodash'

export function setRoutes(routes, currentRoutes, routerMap, constantRoutes) {
  if (store.getters.routesStatus === 'set') {
    return
  }
  function updateRoutes(routes, routerMap, newRoutes) {
    routes.map((routesItem) => {
      routerMap.map((routerMapItem) => {
        if (routesItem.menuCode === routerMapItem.menuCode) {
          const routerMapItemcloned = _.cloneDeep(routerMapItem)
          const routesItemChildren = routesItem.children
          const routerMapItemChildren = routerMapItemcloned.children
          if (routerMapItemChildren && routesItemChildren && routerMapItemChildren.length > 0 && routesItemChildren.length > 0) {
            routerMapItemcloned.children = updateRoutes(routesItemChildren, routerMapItemChildren, [])
          }
          newRoutes.push(routerMapItemcloned)
        }
      })
    })
    return newRoutes
  }
  const newRoutes = updateRoutes(routes, routerMap, [])
  currentRoutes.addRoutes(newRoutes)
  constantRoutes.unshift.apply(constantRoutes,newRoutes)
  store.dispatch('setRoutesStatus','set')
}
