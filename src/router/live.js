import Live from '@/views/live'
const liveRouteConfig = {
  path: '/live',
  menuCode: 'live',
  component: Live,
  redirect: './live/liveList',
  children: [{
    path: '/live/liveList',
    menuCode: 'liveList',
    component: () => import('@/views/live/list'),
    children: null
  },{
    path: '/live/liveDetail',
    menuCode: 'liveDetail',
    component: () => import('@/views/live/detail'),
    children: null
  }]
}
export default liveRouteConfig
