import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import recommend from "@/components/recommend/recommend.vue"
import rank from "@/components/rank/rank.vue"
import search from "@/components/search/search.vue"
import singer from "@/components/singer/singer.vue"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: "/",
        redirect: "/recommend",
    },
    {
        path: "/recommend",
        component: recommend,
    },
    {
        path: "/rank",
        component: rank,
    },
    {
        path: "/search",
        component: search,
    },
    {
        path: "/singer",
        component: singer,
    },
    {
        path: "/home",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    },
]

const router = new VueRouter({
    routes,
})

export default router
