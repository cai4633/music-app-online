<template>
  <div class="music-list">
    <h1 ref="title">{{ title }}</h1>
    <div class="banner" ref="banner" :style="'background-image:url(' + bgImg + ')'">
      <div class="playbtn" v-show="playbtn">
        <icon-svg icon="#el-icon-play1"></icon-svg>
        <span>随机播放全部</span>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" :data="songs" ref="list" @scroll="getY" :probeType="3">
      <song-list :songs="songs" ref="songList"></song-list>
    </scroll>
    <div class="loading-wrap" v-show='!songs.length'>
      <loading></loading>
    </div>
    <go-back class="icon-wrap"></go-back>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator"
import SongList from "base/song-list/song-list"
import Scroll from "base/scroll/scroll"
import Loading from "../../base/loading/loading"
import IconSvg from "base/icon-svg/icon-svg"
import GoBack from "base/go-back/go-back"

@Component({
  components: { SongList, Scroll, Loading, IconSvg, GoBack },
})
export default class MusicList extends Vue {
  @Provide()
  top = 0
  playbtn = true

  @Prop()
  private songs!: object[]
  @Prop()
  private title!: string
  @Prop()
  private bgImg!: string

  mounted() {
    this.$nextTick(() => {
      this.layerTop = this.$refs.layer.offsetTop
      this.bgHeight = this.$refs.banner.offsetHeight
    })
  }

  getY(pos) {
    const MIN_GAP = 10 //10px
    const newTop = this.layerTop + pos //layer与顶部的距离
    const minTop = this.$refs.title.offsetTop + this.$refs.title.offsetHeight + MIN_GAP //距离top最小高度
    const banner = this.$refs.banner.style //banner引用

    if (newTop >= minTop) {
      this.$refs.layer.style.transform = `translateY(${pos}px)`
      this.playbtn = true
      banner.height = `${this.bgHeight}px`
      banner.zIndex = 3
      if (pos > 0) {
        banner.transform = `scale(${1 + pos / this.bgHeight})`
      }
    } else {
      this.playbtn = false
      banner.height = minTop + "px"
      banner.zIndex = 50
    }
  }
  _refresh() {
    this.$refs.list.refresh()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.music-list
  position relative
  width 100vw
  height 100vh
  h1
    position fixed
    top 10px
    left 50%
    transform translateX(-50%)
    font-size 18px
    color #fff
    font-weight 500
    z-index 60
  .banner
      position relative
      transform-origin top center
      background-size cover
      background-position top center
      width 100vw
      height 70vw
      z-index 3
      height 70vw
      color $text-color
      background-color #000
      .bg
        position relative
        transform-origin top center
        background-size cover
        background-position top center
        width 100vw
        height 70vw
      &::after
        content ''
        display block
        position absolute
        top 0
        left 0
        height 100%
        width 100%
        background-color rgba(7,17,27,.4)
        z-index 5
      .playbtn
        position absolute
        bottom 20px
        left 50%
        transform translateX(-50%)
        border 1px solid $text-highlight-color
        color $text-highlight-color
        z-index 10
        padding 7px 25px
        line-height 1.1
        border-radius 30px

        svg
          width 14px
          height @width
          fill $text-highlight-color
          vertical-align middle
        span
          margin-left 5px
          vertical-align middle
          font-size 12px

  .list
    position fixed
    top 70vw
    bottom 0
    left 0
    width 100%
    box-sizing border-box
    z-index 15
    overflow visiable

  .bg-layer
    position relative
    height 100%
    background-color $background-color
    z-index 15

  div.icon-wrap
    position fixed
    z-index 80
    top 8px
    left 15px

  .loading-wrap
    position fixed
    top 50%
    left 50%
    transform  translate3d(-50%,-50%,0)
    z-index 20
</style>
