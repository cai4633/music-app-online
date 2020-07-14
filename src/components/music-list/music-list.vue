<template>
  <div class="music-list">
    <h1 ref="title">{{ title }}</h1>
    <div class="banner" ref="banner" :style="'background-image:url(' + bgImg + ')'">
      <div class="playbtn" v-show="playbtn" @click="randomPlay(songs)">
        <icon-svg icon="#el-icon-play1"></icon-svg>
        <span>随机播放全部</span>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" :data="songs" ref="list" @scroll="getY" :probeType="3">
      <song-list :songs="songs" ref="songList" @select="playlistInit" :rank="rank"></song-list>
    </scroll>
    <div class="loading-wrap" v-show="!songs.length">
      <loading></loading>
    </div>
    <go-back class="icon-wrap" @click.native="back"></go-back>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide, Mixins } from "vue-property-decorator"
import SongList from "base/song-list/song-list.vue"
import Scroll from "base/scroll/scroll.vue"
import Loading from "base/loading/loading.vue"
import IconSvg from "base/icon-svg/icon-svg.vue"
import GoBack from "base/go-back/go-back.vue"
import { mapMutations, mapGetters, mapActions, MutationMethod } from "vuex"
import { selectPlay } from "../../store/actions"
import { PlaylistMixin } from "common/js/mixins"
import { Songs } from "common/js/config"
import { Getter, Mutation, Action } from "vuex-class"

@Component({
  components: { SongList, Scroll, Loading, IconSvg, GoBack },
})
export default class MusicList extends Mixins(PlaylistMixin) {
  top = 0
  playbtn = true
  layerTop = 0
  bgHeight = 0

  @Prop() private songs!: object[]
  @Prop() private title!: string
  @Prop() private bgImg!: string
  @Prop({ default: false }) private rank!: boolean

  @Mutation("SET_PLAYLIST") setPlaylist!: MutationMethod
  @Action("selectPlay") selectPlay!: MutationMethod
  @Action("clearSongList") clearSongList!: MutationMethod
  @Action("randomPlay") randomPlay!: MutationMethod

  mounted() {
    this.$nextTick(() => {
      this.layerTop = (<HTMLElement>this.$refs.layer).offsetTop
      this.bgHeight = (<HTMLElement>this.$refs.banner).offsetHeight
    })
  }

  playlistInit(song: Songs, index: number) {
    this.selectPlay({ list: this.songs, index: index })
  }

  handlePlaylist() {
    const BOTTOM = this.playlist.length ? 45 : 0
    const list = this.$refs.list as Scroll
    if (list) {
      list.$el.style.bottom = `${BOTTOM}px`
      list.refresh()
    }
  }

  getY(pos: number) {
    const MIN_GAP = 10 //10px
    const newTop = this.layerTop + pos //layer与顶部的距离
    const minTop = (this.$refs.title as HTMLElement).offsetTop + (this.$refs.title as HTMLElement).offsetHeight + MIN_GAP //距离top最小高度
    const banner = (this.$refs.banner as HTMLElement).style //banner引用

    if (newTop >= minTop) {
      ;(this.$refs.layer as HTMLElement).style.transform = `translateY(${pos}px)`
      this.playbtn = true
      banner.height = `${this.bgHeight}px`
      banner.zIndex = "3"
      if (pos > 0) {
        banner.transform = `scale(${1 + pos / this.bgHeight})`
      }
    } else {
      this.playbtn = false
      banner.height = minTop + "px"
      banner.zIndex = "50"
    }
  }
  back() {
    this.$router.back()
  }
  _refresh() {
    ;(this.$refs.list as Scroll).refresh()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

$h1-zindex = 60
$banner-zindex = 3
$playbtn-zindex = 10
$list-zindex = 15
$loading-wrap-zindex = 20
$icon-wrap-zindex = 80
$bg-after-zindex = 5

.music-list
  position relative
  width 100vw
  height 100vh
  h1
    position fixed
    top 10px
    left 55px
    right 40px
    font-size 18px
    color #fff
    font-weight 500
    z-index $h1-zindex
    no-wrap()
  .banner
      position relative
      transform-origin top center
      background-size cover
      background-position top center
      width 100vw
      height 70vw
      z-index $banner-zindex
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
        z-index $bg-after-zindex
      .playbtn
        position absolute
        bottom 20px
        left 50%
        transform translateX(-50%)
        border 1px solid $text-highlight-color
        color $text-highlight-color
        z-index $playbtn-zindex
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
    z-index $list-zindex
    overflow visiable
    background-color $background-color

  .bg-layer
    position relative
    height 100%
    background-color $background-color
    z-index $list-zindex

  div.icon-wrap
    position fixed
    z-index $icon-wrap-zindex
    top 8px
    left 15px

  .loading-wrap
    position fixed
    top 50%
    left 50%
    transform  translate3d(-50%,-50%,0)
    z-index $loading-wrap-zindex
</style>
