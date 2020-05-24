<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MHeader from "./components/m-header/m-header.vue";
import Tab from "./components/tab/tab.vue";
@Component({
  components: { MHeader, Tab }
})
export default class App extends Vue {}
</script>

<style lang="stylus">
#app
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
</style>
