import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import FastClick from "fastclick"
import "./common/stylus/index.styl"
import VueLazyload from "vue-lazyload"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import VueAxios from "vue-axios"
// const singerlist = require("@/common/mock/singerlist.ts")
// const Mock = require("mockjs")

(<any>FastClick).attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "./common/images/default.png",
  loading: require("./common/images/default.png"),
  attempt: 1
})

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

// axios 拦截器

// =====================================================================================================================================================================================================
// axios拦截器mock数据
// axios.interceptors.response.use(
//   response => {
//     // if ( response.config.url === "/cgi-bin/musics.fcg" && response.config.params["-"] === "getUCGI6834091127869455" ) {
//     //   return singerlist
//     // }
//     return response
//   },
//   error => {
//     console.log(error)
//     // return Promise.resolve(singerlist)
//   }
// )

// Mockjs 拦截并mock数据
// Mock.mock("<带查询参数的path或者正则表达式>", "get/post", (config: any) => {
//   console.log(config)
//   return "<数据>"
// })
