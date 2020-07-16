import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import FastClick from "fastclick"
import "./common/stylus/index.styl"
import VueLazyload from "vue-lazyload"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
const singerlistMock = require("./common/mock/singerlist.ts")

const fastclick = FastClick as any
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "./common/images/default.png",
  loading: require("./common/images/default.png"),
  attempt: 1
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

// axios 拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// axios拦截器mock数据
axios.interceptors.response.use(
  response => {
    // singerlists
    if ( response.config.url === "/cgi-bin/musics.fcg" && response.config.params["-"] === "getUCGI6834091127869455" ) {
      response.data = singerlistMock
      return response.data
    }
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
