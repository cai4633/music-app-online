<template>
  <div id="app">
    <m-header></m-header>
    <span>{{d}}</span>
    <!-- <router-view /> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MHeader from "./components/m-header/m-header.vue";
@Component({
  components: { MHeader }
})
export default class App extends Vue {
  d = "sbsb";
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
