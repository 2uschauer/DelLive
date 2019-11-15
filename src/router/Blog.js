import layout from '@/components/Layout'
const blogRouteConfig = {
  path: '/blog',
  menuCode: 'blog',
  name: '博客',
  component: layout,
  redirect: './blog/index',
  children: [{
    path: '/blog/index',
    menuCode: 'blogIndex',
    name: '博客主页',
    component: () => import('@/views/blog')
  },{
    path: '/blog/list',
    menuCode: 'blogList',
    name: '博客列表',
    component: () => import('@/views/blog/list')
  },{
    path: '/blog/detail',
    menuCode: 'blogDetail',
    name: '博客详情',
    component: () => import('@/views/blog/detail')
  }]
}
export default blogRouteConfig
