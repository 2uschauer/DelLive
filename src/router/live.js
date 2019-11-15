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
    path: '/live/list',
    menuCode: 'liveList',
    name: '直播列表',
    component: () => import('@/views/live/list')
  },{
    path: '/live/detail',
    menuCode: 'liveDetail',
    name: '直播详情',
    component: () => import('@/views/live/detail')
  }]
}
export default liveRouteConfig
