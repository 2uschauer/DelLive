import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

export const constantRoutes = [{
  path: "/article",
  component: () => import("@/views/article/index"),
  hidden: false
}, {
  path: "/login",
  component: () => import("@/views/login/index"),
  hidden: true
}, {
  path: "/404",
  component: () => import("@/views/404"),
  hidden: true
}, {
  path: "/homePage",
  name: "homePage",
  redirect: "/homePage/test1",
  component: Layout,
  meta: { title: "HomePage", icon: "homePage" },
  children: [{
    path: "/homePage/test1",
    name: "homePagetest1",
    component: () => import("@/views/homePage/test1/index"),
    meta: { title: "test1", icon: "test1" }
  }, {
    path: "/homePage/test2",
    name: "homePagetest2",
    component: () => import("@/views/homePage/test2/index"),
    meta: { title: "test2", icon: "test2" }
  }]
}, {
  path: "/live",
  name: "Live",
  redirect: "/live/index",
  component: Layout,
  meta: { title: "Live", icon: "live" },
  children: [{
    path: "/live/index",
    name: "LiveIndex",
    component: () => import("@/views/live/index"),
    meta: { title: "Live", icon: "test1" }
  }]
}, {
  path: "*",
  redirect: "/404",
  hidden: true
}];// 404 page must be placed at the end !!!

const createRouter = () => new Router({
  mode: "history", // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;// reset router
}

export default router;
