import layout from '@/components/Layout'
const liveRouteConfig = {
  path: '/live',
  menuCode: 'live',
  name: '直播',
  component: layout,
  redirect: './live/index',
  children: [{
    path: '/live/index',
    menuCode: 'liveIndex',
    name: '直播首页',
    component: () => import('@/views/live')
  },{
    path: '/live/manager',
    menuCode: 'liveManager',
    name: '推流管理',
    component: () => import('@/views/live/manager')
  },{
    path: '/live/create',
    menuCode: 'liveCreate',
    name: '申请直播',
    component: () => import('@/views/live/create')
  }]
}
export default liveRouteConfig
