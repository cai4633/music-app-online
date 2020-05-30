import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import FastClick from "fastclick"
const fastclick = FastClick as any
fastclick.attach(document.body)
import "./common/stylus/index.styl"
import VueLazyload from "vue-lazyload"
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: "./common/images/default.png",
    loading: require("./common/images/default.png"),
    attempt: 1,
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app")
