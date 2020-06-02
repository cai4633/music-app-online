<template>
  <div class="music-list">
    <div class="banner">
      <h1>{{ title }}</h1>
      <img :src="bgImg" alt="找不到图片" @load="refresh = !refresh" />
      <div class="playbtn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#el-icon-play1"></use>
        </svg>
        <span>随机播放全部</span>
      </div>
    </div>
    <song-list :songs="songs" ref="songList" :refresh="refresh"></song-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator"
import SongList from "base/song-list/song-list"

@Component({
  components: { SongList },
})
export default class MusicList extends Vue {
  @Provide()
  refresh = false
  @Prop()
  private songs!: object[]
  @Prop()
  private title!: string
  @Prop()
  private bgImg!: string
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/font.styl';

.banner
    height 70vw
    overflow hidden
    position relative
    color $text-color
    h1
      position fixed
      top 10px
      left 50%
      transform translateX(-50%)
      font-size 18px
      color #fff
      font-weight 500
      z-index 10
    img
      width 100%
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
      z-index 6
      padding 7px 25px
      line-height 1.1
      border-radius 30px

      svg
        width 16px
        height @width
        fill $text-highlight-color
        vertical-align middle
      span
        margin-left 5px
        vertical-align middle
        font-size 12px
</style>
