<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click.stop.self="hide">
      <div class="playlist-inner">
        <h1>
          <div class="play-mode" @click.stop="toggleMode">
            <icon-svg icon="#el-icon-loop" v-show="mode === 0"></icon-svg>
            <icon-svg
              icon="#el-icon-single-cycle"
              v-show="mode === 1"
            ></icon-svg>
            <icon-svg icon="#el-icon-random" v-show="mode === 2"></icon-svg>
          </div>
          <span class="play-mode-text">{{ playModeText }}</span>
          <span class="clear" @click.stop="showConfirm"
            ><icon-svg icon="#el-icon-clearAll"></icon-svg
          ></span>
        </h1>
        <div class="mini-songlist-wrap">
          <scroll class="mini-songlist" :data="sequencelist" ref="miniSonglist">
            <div class="scroll-inner">
              <transition-group name="slide" tag="ul" ref="slideOut">
                <li
                  v-for="(song, index) in sequencelist"
                  :key="song.id"
                  @click.stop="toPlay(song)"
                  ref="mini"
                >
                  <icon-svg
                    icon="#el-icon-play"
                    class="playIcon"
                    :class="showPlayIcon(index)"
                  ></icon-svg>
                  <div class="text">
                    <span class="name">{{ song.name }}</span> -
                    <span class="singer">{{ song.singer }}</span>
                  </div>
                  <span class="favorite" @click.stop="toggleFavorite(song)">
                    <icon-svg :icon="getIcon(song)"></icon-svg>
                  </span>
                  <icon-svg
                    class="delete"
                    icon="#el-icon-clear"
                    @click.stop.native="deleteOne(song)"
                  ></icon-svg>
                </li>
              </transition-group>
            </div>
          </scroll>
          <div class="addsong">
            <span class="text" @click.stop="showAddSongs">
              <icon-svg icon="#el-icon-add" class="add"></icon-svg>
              添加歌曲到队列
            </span>
          </div>
        </div>
        <confirm
          title="是否全部删除播放列表"
          ref="playlistConfirm"
          @enter="clearList"
        ></confirm>
        <footer @click.stop="hide">关闭</footer>
      </div>
      <add-songs ref="addsongs" @hide="hide"></add-songs>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import IconSvg from "base/icon-svg/icon-svg.vue"
import { playMode, Songs } from "common/js/config"
import { PlayerMixin } from "common/js/mixins"
import Scroll from "base/scroll/scroll.vue"
import Confirm from "base/confirm/confirm.vue"
import { mapGetters, mapMutations, mapActions, MutationMethod } from "vuex"
import { findIndex } from "common/js/player"
import AddSongs from "components/add-songs/add-songs.vue"
import { Action, Mutation, Getter } from "vuex-class"

@Component({
  components: { IconSvg, Scroll, Confirm, AddSongs }
})
export default class Playlist extends Mixins(PlayerMixin) {
  showFlag = false
  iconIndex = -1

  $refs!: {
    slideOut: Vue
    miniSonglist: Scroll
    playlistConfirm: Confirm
    addsongs: AddSongs
    favorite: HTMLElement[]
    favoriteIcon: Vue[]
  }

  @Getter("playlist") playlist!: any
  @Getter("currentIndex") currentIndex!: number
  @Action("removeSongFromList") removeSongFromList!: MutationMethod
  @Action("clearSongList") clearSongList!: MutationMethod
  @Mutation("SET_CURRENTINDEX") setCurrentIndex!: MutationMethod

  get playModeText() {
    const text = ["顺序播放", "单曲循环", "随机播放"]
    return text[this.mode]
  }

  showAddSongs() {
    this.$refs.addsongs.show()
  }
  toPlay(song: Songs) {
    const index = findIndex(this.playlist, song)
    this.setCurrentIndex(index)
  }
  clearList() {
    this.clearSongList()
    this.hide()
  }
  showPlayIcon(index: number) {
    return index === findIndex(this.sequencelist, this.currentSong)
      ? "playing"
      : "pause"
  }

  deleteOne(song: Songs) {
    this.removeSongFromList(song)
    setTimeout(() => {
      this.$refs.miniSonglist.refresh()
    }, 100)
    if (!this.playlist.length) {
      this.hide()
    }
  }
  showConfirm() {
    this.$refs.playlistConfirm.show()
  }
  show() {
    this.showFlag = true
    window.setTimeout(() => {
      this.$refs.miniSonglist.refresh()
      this.scrollToCurrent(200)
    }, 120) // 延迟滚动
  }
  hide() {
    this.showFlag = false
  }
  scrollToCurrent(delay = 400) {
    if (!this.currentSong) {
      return
    }
    const index = findIndex(this.sequencelist, this.currentSong)
    if (this.$refs.miniSonglist && this.$refs.slideOut) {
      this.$refs.miniSonglist.scrollToElement( this.$refs.slideOut.$el.children[index], delay )
    }
  }

  @Watch("currentSong")
  currentSongChange(newsong: Songs, oldsong: Songs) {
    if (!newsong.id || newsong.id === oldsong.id || !this.showFlag) {
      return
    }
    window.setTimeout(() => {
      this.$refs.miniSonglist.refresh()
    }, 150)
  }
  @Watch("currentIndex")
  currentIndexChange(newIndex: number) {
    this.$nextTick(()=>{
      this.scrollToCurrent(200)
    })
    return
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
$padding-x = 20px

.list-fade-enter, .list-fade-leave-to
  opacity 0
  .playlist-inner
    transform translateY(100%)
.list-fade-enter-active, .list-fade-leave-active
  transition opacity  0.4s
  .playlist-inner
    transition all  0.4s

.playlist
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $background-color-a
  z-index $playlist-zindex
  color $text-color
  .playlist-inner
    position absolute
    bottom 0
    left 0
    right 0
    top 35%
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
    .mini-songlist-wrap
      position absolute
      top 35px
      left 0
      right 0
      bottom 3em
      padding 0px $padding-x
      color $text-color
      .mini-songlist
        overflow hidden
        position absolute
        padding 0 20px
        top 0
        left 0
        right 0
        bottom 55px
        .slide-leave-to
          opacity 0
        .slide-leave-active
          transition all .1s
        ul
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
              margin 0 15px
              svg
                fill $text-highlight-color
      .addsong
        position-center(absolute, x)
        bottom 8px
        padding 5px 0
        .text
          line-height 2
          border-radius 40px
          padding 0 1.5em
          display inline-block
          white-space nowrap
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
