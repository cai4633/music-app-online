<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MHeader from "components/m-header/m-header.vue";
import Tab from "components/tab/tab.vue";
import Player from "components/player/player.vue";

// TODO: 优化web端体验
@Component({
  components: { MHeader, Tab, Player }
})
export default class App extends Vue { }
</script>

<style lang="stylus">
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  height 100%
  position relative
  text-align center
  color #2c3e50
  box-sizing border-box
  display flex
  flex-direction column
  overflow hidden
  max-width 720px
  margin auto
  background-color $background-color
</style>

