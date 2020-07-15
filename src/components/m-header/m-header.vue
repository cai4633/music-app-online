<template>
  <div class="m-header">
    <div class="banner">
      <img src="./logo@2x.png" alt="banner" />
      <span>Music APP</span>
    </div>
    <router-link class="user" title="用户中心" to="/user-center" tag="span">
      <icon-svg icon="#el-icon-user"></icon-svg>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import IconSvg from "base/icon-svg/icon-svg.vue"

@Component({
  components: { IconSvg },
})
export default class MHeader extends Vue {}
</script>

<style lang="stylus">
@import '../../common/stylus/variable.styl'

div.m-header
    height 46px
    flex 0 0 auto
    position relative

    .banner
        display flex
        justify-content center
        align-items center
        background-color $background-color

        img
            width 30px
            padding .5em 0
            vertical-align top

        span
            color rgb(157, 138, 77)
            color $text-highlight-color
            font-family 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback'

            margin-left 0.5em
            font-size 1.3em
    .user
      position absolute
      right 25px
      top 50%
      transform translateY(-50%)
      svg
        fill $text-highlight-color
        width 24px
        height @width
</style>
