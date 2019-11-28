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
  }]
}
export default liveRouteConfig
