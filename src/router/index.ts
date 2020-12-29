import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
Vue.use(VueRouter)

// 路由懒加载
const recommend = () => import("@/views/recommend/recommend.vue")
const rank = () => import("@/views/rank/rank.vue")
const search = () => import("@/views/search/search.vue")
const singer = () => import("@/views/singer/singer.vue")
const singerDetails = () => import("@/views/singer-details/singer-details.vue")
const RecommendDetails = () =>
  import("@/views/recommend-details/recommend-details.vue")
const Toplist = () => import("@/views/toplist/toplist.vue")
const UserCenter = () => import("@/views/user-center/user-center.vue")

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    component: recommend,
    children: [
      {
        name: "recommendDetails",
        path: ":mid",
        component: RecommendDetails
      }
    ]
  },
  {
    path: "/rank",
    component: rank,
    children: [
      {
        path: ":id",
        component: Toplist
      }
    ]
  },
  {
    path: "/search",
    component: search,
    children: [
      {
        path: ":id",
        component: singerDetails
      }
    ]
  },
  {
    path: "/singer",
    component: singer,
    children: [
      {
        path: ":mid",
        component: singerDetails
      }
    ]
  },
  {
    path: "/user-center",
    component: UserCenter
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
