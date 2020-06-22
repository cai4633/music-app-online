<template>
  <div class="player" v-show="playlist.length">
    <transition name="normal" @enter="enter">
      <div class="normal-player" v-show="fullScreen">
        <h1>{{ currentSong.name }}</h1>
        <h2>{{ currentSong.singer }}</h2>
        <div class="main" @touchstart="lyricStart" @touchmove="lyricMove" @touchend="lyricEnd" ref="main">
          <div class="main-disk-wrap" ref="mainDiskWrap">
            <div class="disk-wrap" @click="togglePlaying" :class="diskAnimation">
              <div class="disk" ref="disk"><img :src="currentSong.image" alt="" ref="diskImg" @error="changeSrc" /></div>
            </div>
            <div class="current-lyric">
              <p class="txt" v-html="currentLyric"></p>
            </div>
          </div>
          <scroll class="lyric-wrap" ref="lyrics" :data="lyrics && lyrics.lines">
            <div class="lyric" ref="lyric">
              <p
                class="txt"
                v-for="(item, index) in lyrics.lines"
                v-html="item.txt"
                :key="'lyric' + index"
                :id="'line-' + index"
                :class="{ current: currentLine === index }"
                ref="lyricTxt"
              ></p>
            </div>
          </scroll>
        </div>
        <div class="control-wrap">
          <div class="control">
            <div class="progress-bar-wrap">
              <progress-bar :currentTime="currentTime" :totalTime="totalTime" @drag-bar="dragBar"></progress-bar>
            </div>
            <div class="play-mode" @click="toggleMode">
              <icon-svg icon="#el-icon-loop" v-show="mode === 0"></icon-svg>
              <icon-svg icon="#el-icon-single-cycle" v-show="mode === 1"></icon-svg>
              <icon-svg icon="#el-icon-random" v-show="mode === 2"></icon-svg>
            </div>
            <div class="previous" @click="previous">
              <icon-svg icon="#el-icon-previous"></icon-svg>
            </div>
            <div class="play" @click="togglePlaying" ref="play">
              <icon-svg icon="#el-icon-play2" v-show="!playing"></icon-svg>
              <icon-svg icon="#el-icon-Pause" v-show="playing"></icon-svg>
            </div>
            <div class="next" @click="next">
              <icon-svg icon="#el-icon-next"></icon-svg>
            </div>
            <div class="favorites">
              <icon-svg icon="#el-icon-favorites"></icon-svg>
            </div>
          </div>
        </div>
        <div class="back" @click="minimize">
          <icon-svg icon="#el-icon-arrowdown"></icon-svg>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="toFullScreen">
        <div class="content">
          <div class="avatar" ref="avatar"></div>
          <div class="text">
            <h2>{{ currentSong.name }}</h2>
            <h3>{{ currentSong.singer }}</h3>
          </div>
          <div class="control">
            <progress-circle :percent="percent" radius="36">
              <div class="play" @click.stop="togglePlaying">
                <icon-svg icon="#el-icon-play2" v-show="!playing"></icon-svg>
                <icon-svg icon="#el-icon-Pause" v-show="playing"></icon-svg>
              </div>
            </progress-circle>

            <div class="list">
              <icon-svg icon="#el-icon-list"></icon-svg>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <audio :src="currentSong.url" ref="audio" @error="error" @canplay="ready" @ended="end" @timeupdate="updataTime"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapGetters, mapMutations } from "vuex"
import IconSvg from "base/icon-svg/icon-svg"
import GoBack from "base/go-back/go-back"
import animations from "create-keyframe-animation"
import ProgressBar from "base/progress-bar/progress-bar"
import ProgressCircle from "base/progress-circle/progress-circle"
import { playMode } from "common/js/config.ts"
import { shuffle, lyricParser } from "common/js/util.ts"
import { findIndex } from "common/js/player.ts"
import { Base64 } from "js-base64"
import Scroll from "@/base/scroll/scroll.vue"
import disc_default from "@/common/images/disc_default.png"
@Component({
  components: { Scroll, GoBack, IconSvg, ProgressBar, ProgressCircle },
  computed: {
    ...mapGetters(["playlist", "fullScreen", "playing", "currentSong", "currentIndex", "mode", "sequencelist"]),
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENTINDEX",
      setMode: "SET_MODE",
      setPlaylist: "SET_PLAYLIST",
    }),
  },
})
export default class Player extends Vue {
  songReady = false
  currentTime = 0
  currentShow = "cd" //'cd' or 'lyric'
  totalTime = 0
  lyrics: { [key: string]: any } = {}
  touch: { [key: string]: any } = { startX: 0, startY: 0, endY: 0, endX: 0, init: false, percent: 0, moved: false }
  get diskAnimation() {
    return this.playing ? "play" : "play pause"
  }
  get percent() {
    return this.currentTime / this.totalTime
  }
  get currentLine() {
    return this.lyrics ? this.lyrics.curline : 0
  }
  get currentLyric() {
    return this.lyrics && this.currentLine >= 0 ? this.lyrics.lines[this.currentLine].txt : ""
  }

  mounted() {
    this.$nextTick(() => {
      return
    })
  }
  changeSrc() {
    this.$refs.diskImg.src = disc_default
  }
  minimize() {
    this.setFullScreen(false)
  }
  toFullScreen() {
    this.setFullScreen(true)
  }
  togglePlaying() {
    this.setPlayingState(!this.playing)
  }
  toggleMode() {
    this.setMode((this.mode + 1) % 3)
    const originList = JSON.parse(JSON.stringify(this.sequencelist))
    const newList = this.mode === playMode.random ? shuffle(originList) : originList
    const index = findIndex(newList, this.currentSong)
    this.setPlaylist(newList)
    this.setCurrentIndex(index)
  }
  previous() {
    if (!this.songReady) return
    const index = this.currentIndex - 1 < 0 ? this.playlist.length - 1 : this.currentIndex - 1
    this.setCurrentIndex(index)
    this.nextOrPreToPlay()
    this.songReady = false
  }
  next() {
    if (!this.songReady) return
    const index = this.currentIndex + 1 >= this.playlist.length ? 0 : this.currentIndex + 1
    this.setCurrentIndex(index)
    this.nextOrPreToPlay()
    this.songReady = false
  }
  nextOrPreToPlay() {
    const audio = this.$refs.audio
    this.$nextTick(() => {
      this.playing ? audio.play() : this.togglePlaying()
    })
  }
  updataTime(e) {
    this.currentTime = e.target.currentTime
    this.lyrics.play && this.lyrics.play(this.currentTime)
    this.lyricScroll(this.currentLine)
  }
  lyricStart(e) {
    this.touch.init = true
    this.touch.startX = e.touches[0].pageX
    this.touch.startY = e.touches[0].pageY
    return
  }
  lyricMove(e) {
    if (!this.touch.init) { 
      return
    }
    const dx = e.touches[0].pageX - this.touch.startX
    const dy = e.touches[0].pageY - this.touch.startY
    if (Math.abs(dy) > Math.abs(dx)) {
      return
    }
    this.touch.moved = true
    const width = document.documentElement.clientWidth
    const left = this.currentShow === "cd" ? 0 : -width
    const offsetWidth = Math.min(0, Math.max(-width, left + dx))
    this.touch.percent = Math.abs(offsetWidth / width)
    this.$refs.lyrics.$el.style["transform"] = `translateX(${offsetWidth}px)`
    return
  }
  lyricEnd() {
    const width = document.documentElement.clientWidth
    if (this.currentShow === "cd") {
      //cd
      if (this.touch.percent > 0.05 && this.touch.moved) {
        this.$refs.lyrics.$el.style["transform"] = `translateX(${-width}px)`
        this.$refs.mainDiskWrap.style.opacity = 0
        this.currentShow = "lyric"
      }
    } else {
      //lyric
      if (this.touch.percent < 0.95 && this.touch.moved) {
        this.$refs.lyrics.$el.style["transform"] = `translateX(0px)`
        this.$refs.mainDiskWrap.style.opacity = 1
        this.currentShow = "cd"
      }
    }
    this.touch.moved = false
    this.touch.init = false
    return
  }
  ready(e) {
    this.totalTime = e.target.duration
    this.songReady = true
  }
  error() {
    this.songReady = true
  }
  end() {
    if (this.mode === playMode.loop) {
      this.loop()
    } else {
      this.next()
    }
  }
  loop() {
    this.$refs.audio.currentTime = 0
    this.$refs.audio.play()
  }
  enter(el, done) {
    this.$nextTick(() => {
      const disk = this.$refs.disk
      const avatar = this.$refs.avatar
      const { x, y, scale } = this._getPos(avatar, disk)
      const animation = {
        "0%": { transform: `translate3d(${x}px,${y}px,0) scale(${scale})` },
        "70%": { transform: `translate3d(0,0,0) scale(1.2)` },
        "100%": { transform: `translate3d(0,0,0) scale(1)` },
      }
      animations.registerAnimation({
        name: "move",
        animation: animation,
        presets: {
          duration: 400,
          delay: 10,
        },
      })
      animations.runAnimation(disk, "move", done)
    })
  }
  dragBar(newCurrentTime) {
    this.$refs.audio.currentTime = newCurrentTime
    !this.playing && this.togglePlaying()
  }

  lyricScroll(lineNum) {
    const GAP = 5
    if (lineNum > GAP) {
      this.$refs.lyrics && this.$refs.lyrics.scrollToElement(this.$refs.lyricTxt[lineNum - 5], 1000)
    }
    return
  }

  _getPos(target, el) {
    const targetWidth = target.offsetWidth
    const elWidth = el.offsetWidth
    const x = -(document.body.clientWidth / 2 - 40 - targetWidth / 2)
    const y = document.body.clientHeight - 30 - 64 - elWidth / 2
    const scale = targetWidth / elWidth
    return { x, y, scale }
  }

  @Watch("playing")
  watchPlaying(newPlaying) {
    this.$nextTick(() => {
      newPlaying ? this.$refs.audio.play() : this.$refs.audio.pause()
    })
  }
  @Watch("currentSong")
  watchCurrentSong(newSong, oldSong) {
    newSong &&
      newSong._getLyric().then((res) => {
        this.lyrics = lyricParser(newSong.lyric)
        return
      })

    if (newSong.id === oldSong.id) return
    this.$refs.audio.play()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.normal-enter-active,.normal-leave-to-active,.mini-enter-active,.mini-leave-active
  transition all 0.4s cubic-bezier(.51,.77,.62,1.42)
.normal-enter,.normal-leave-to
  transform translateY(-5%)
  opacity 0
.mini-enter,.mini-leave-to
  transform translateY(100%)
  opacity 0

@keyframes myPlay
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)


.player
  .back
    position fixed
    top 10px
    left 20px
    svg
      width 20px
      height @width
      fill $text-highlight-color
  .normal-player
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 100
    background-color $background-color
    color #fff
    .bg
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      background-repeat no-repeat
      background-position center
      background-size cover
      filter blur(3px)
      z-index -1
      &::after
        content ""
        display block
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        background-color rgba(0,0,0,.6)
    h1
      margin 10px 0px
      font-size 18px
    h2

      font-size 14px

    .main
      position absolute
      left 0
      right 0
      top 50px
      bottom 20px
      margin-top 16px
      .main-disk-wrap
        transition all 0.5s linear
        .disk-wrap
          position relative
          margin-top 20px
          transition all 0.5s linear
          &.play
            animation myPlay 18s linear infinite
          &.pause
            animation-play-state paused
          .disk
            display inline-block
            transition all 0.5s linear
            img
              box-shadow 0px 0px 0px 8px rgba(255,255,255,.1)
              border-radius  50%
              width 200px
              height 200px
              vertical-align top
            img[src='']
              opacity 0
        .current-lyric
          margin-top 20px
          color $text-highlight-color
      .lyric-wrap
        position: absolute
        overflow hidden
        top 10px
        bottom 100px
        left 100%
        width 100%
        color $text-color
        transition all 0.5s linear
        .lyric
          p
            line-height 1.5
            &.current
              color $text-highlight-color
    .control-wrap
        position absolute
        width 100%
        left 0
        bottom 30px
        .control
          display flex
          padding 0 20px
          justify-content space-between
          flex-wrap wrap
          .progress-bar-wrap
            width 100%
            margin-bottom 10px

        svg
          width 20px
          height 20px
          fill $text-highlight-color
  .mini-player
    position fixed
    z-index 100
    bottom 0px
    height 60px
    background-color #333
    left 0
    width 100%
    color #fff
    .content
      display flex
      align-items center
      height 100%
      padding  0 20px
      .avatar
        img
          width 40px
          height @width
          border-radius 50%
          display block
      .text
        margin 0 10px
        h2
          font-size 12px
          font-weight normal
          text-align left
        h3
          font-size 12px
          font-weight normal
          color #777
          text-align left
      .control
        flex 1 1 auto
        display flex
        justify-content flex-end
        align-items center
        .progress-circle
          .play
            position absolute
            margin auto
            top 50%
            left 50%
            transform translate3d(-50%,-50%,0)
        svg
          display block
          fill $text-highlight-color
          width 15px
          height @width

        .list
          margin-left 15px
</style>
