<template>
  <div class="playlist" v-show="showFlag" @click.stop.self="hide">
    <div class="playlist-inner">
      <h1>
        <div class="play-mode" @click.stop="toggleMode">
          <icon-svg icon="#el-icon-loop" v-show="mode === 0"></icon-svg>
          <icon-svg icon="#el-icon-single-cycle" v-show="mode === 1"></icon-svg>
          <icon-svg icon="#el-icon-random" v-show="mode === 2"></icon-svg>
        </div>
        <span class="play-mode-text">{{ playModeText }}</span>
        <span class="clear" @click.stop="showConfirm"><icon-svg icon="#el-icon-clearAll"></icon-svg></span>
      </h1>
      <scroll class="mini-songlist" :data="sequencelist" ref="miniSonglist">
        <ul>
          <li v-for="(song, index) in sequencelist" :key="song.id" @click.stop="toPlay(song)">
            <icon-svg icon="#el-icon-play" class="playIcon" :class="showPlayIcon(index)"></icon-svg>
            <div class="text">
              <span class="name">{{ song.name }}</span>
              -
              <span class="singer">{{ song.singer }}</span>
            </div>
            <icon-svg class="favorite" icon="#el-icon-favorites" @click.stop.native="addFavorite(song)"></icon-svg>
            <icon-svg class="delete" icon="#el-icon-clear" @click.stop.native="deleteOne(song)"></icon-svg>
          </li>
          <div class="addsong">
            <span class="text">
              <icon-svg icon="#el-icon-add" class="add"></icon-svg>
              添加歌曲到队列
            </span>
          </div>
        </ul>
      </scroll>
      <confirm title="是否全部删除播放列表" ref="playlistConfirm" @enter="clearList"></confirm>
      <footer @click.stop="hide">关闭</footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import IconSvg from "base/icon-svg/icon-svg"
import { playMode } from "common/js/config"
import { PlayerMixin } from "common/js/mixins"
import Scroll from "base/scroll/scroll"
import Confirm from "base/confirm/confirm"
import { mapGetters, mapMutations, mapActions } from "vuex"
import { findIndex } from "common/js/player"

@Component({
  components: { IconSvg, Scroll, Confirm },
  computed: {
    ...mapGetters(["playlist"]),
  },
  methods: {
    ...mapActions(["clearSongList", "removeSongFromList"]),
    ...mapMutations({
      setCurrentIndex: "SET_CURRENTINDEX",
    }),
  },
})
export default class Playlist extends Mixins(PlayerMixin) {
  showFlag = false

  get playModeText() {
    const text = ["顺序播放", "单曲循环", "随机播放"]
    return text[this.mode]
  }

  toPlay(song) {
    const index = findIndex(this.playlist, song)
    this.setCurrentIndex(index)
  }
  clearList() {
    this.clearSongList()
    this.hide()
  }
  showPlayIcon(index) {
    return index === findIndex(this.sequencelist, this.currentSong) ? "playing" : "pause"
  }

  deleteOne(song) {
    this.removeSongFromList(song)
    if (!this.playlist.length) {
      this.hide()
    }
  }
  addFavorite(song) {
    this.$emit("favorite", song)
    return
  }
  showConfirm() {
    this.$refs.playlistConfirm.show()
  }
  show() {
    this.showFlag = true
    this.$nextTick(() => {
      this.$refs.miniSonglist.refresh()
    })
  }
  hide() {
    this.showFlag = false
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
$padding-x = 20px

.playlist
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $background-color-a
  z-index $playlist-zindex
  .playlist-inner
    position absolute
    bottom 0
    left 0
    right 0
    top 40%
    // border 1px solid red
    background-color $background-color
    h1
      display flex
      padding 3px $padding-x
      align-items center
      font-weight normal
      margin 6px 0
      .play-mode
        flex 0
        svg
          vertical-align middle
          width 16px
          height @width
          fill $text-highlight-color
      span.play-mode-text
        flex 1
        text-align left
        margin-left 10px
        font-size 14px
      span.clear
        svg
          vertical-align middle
          width 16px
          height @width
    .mini-songlist
      // border 1px solid blue
      position absolute
      top 35px
      left 0
      right 0
      bottom 3em
      overflow hidden
      padding 0px $padding-x
      color $text-color
      li
        text-align left
        margin 5px 0
        line-height 2
        display flex
        align-items center
        .playIcon
          width 12px
          height  @width
          margin-right 10px
          &.playing
            fill $text-highlight-color
          &.pause
            fill transparent
        .text
          flex 1
          no-wrap()
          .name
            font-size 14px
          .singer
            font-size 14px
        .delete
          fill $text-highlight-color
        .favorite
          fill $text-highlight-color
          margin 0 15px
      .addsong
        padding 10px 0
        margin-top -5px
        .text
          line-height 2
          border-radius 40px
          padding 0 1.5em
          display inline-block
          border 1px solid $text-color
          .add
            margin-right 8px

    footer
      background-color $background-color-d
      position absolute
      bottom 0
      left 0
      right 0
      line-height 3
</style>
