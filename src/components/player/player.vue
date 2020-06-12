<template>
  <div class="player" v-show="playlist.length">
    <transition name="normal" @enter="enter">
      <div class="normal-player" v-show="fullScreen">
        <h1>{{ currentSong.name }}</h1>
        <h2>{{ currentSong.singer }}</h2>
        <div class="disk-wrap" @click="togglePlaying" :class="diskAnimation">
          <div class="disk" ref="disk"><img :src="currentSong.image" alt="" /></div>
        </div>
        <div class="control-wrap">
          <div class="control">
            <div class="play-mode">
              <icon-svg icon="#el-icon-random" v-show="mode === 2"></icon-svg>
              <icon-svg icon="#el-icon-loop" v-show="mode === 1"></icon-svg>
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
        <div class="back" @click="minimize"><icon-svg icon="#el-icon-arrowdown"></icon-svg></div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="toFullScreen">
        <div class="content">
          <div class="avatar" ref="avatar">
            <img :src="currentSong.image" alt="" />
          </div>
          <div class="text">
            <h2>{{ currentSong.name }}</h2>
            <h3>{{ currentSong.singer }}</h3>
          </div>
          <div class="control">
            <div class="play" @click.stop="togglePlaying">
              <icon-svg icon="#el-icon-play2" v-show="!playing"></icon-svg>
              <icon-svg icon="#el-icon-Pause" v-show="playing"></icon-svg>
            </div>
            <div class="list">
              <icon-svg icon="#el-icon-list"></icon-svg>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @error="error" @canplay="ready" @ended="end"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapGetters, mapMutations } from "vuex"
import IconSvg from "base/icon-svg/icon-svg"
import GoBack from "base/go-back/go-back"
import animations from "create-keyframe-animation"
@Component({
  components: { GoBack, IconSvg },
  computed: {
    ...mapGetters(["playlist", "fullScreen", "playing", "currentSong", "currentIndex", "mode"]),
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENTINDEX",
    }),
  },
})
export default class Player extends Vue {
  songReady = false
  get diskAnimation() {
    return this.playing ? "play" : "play pause"
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
  previous() {
    if (!this.songReady) return
    let index = this.currentIndex - 1
    if (index < 0) {
      index = this.playlist.length - 1
    }
    this.setCurrentIndex(index)
    this.nextOrPreToPlay()
    this.songReady = false
  }
  next() {
    if (!this.songReady) return
    let index = this.currentIndex + 1
    if (index >= this.playlist.length) {
      index = 0
    }
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
  ready() {
    this.songReady = true
  }
  error() {
    this.songReady = true
  }
  end() {
    this.next()
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

  _getPos(target, el) {
    const targetWidth = target.offsetWidth
    const elWidth = el.offsetWidth
    const x = -(document.body.clientWidth / 2 - 40 - targetWidth / 2)
    const y = document.body.clientHeight  - 30 - 64 - elWidth / 2
    // debugger
    const scale = targetWidth /elWidth 
    return { x, y, scale }
  }

  @Watch("playing")
  watchPlaying(newPlaying) {
    this.$nextTick(() => {
      const audio = this.$refs.audio
      newPlaying ? audio.play() : audio.pause()
    })
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
    h1
      margin 10px 0px
      font-size 18px
    h2

      font-size 14px

    .disk-wrap
      position relative
      margin-top 20px
      &.play
        animation myPlay 18s linear infinite
      &.pause
        animation-play-state paused
      .disk
        display inline-block
        img
          box-shadow 0px 0px 10px 0px rgba(255,255,255,.9)
          border-radius  50%
          width 200px
          height 200px
          vertical-align top
    .control-wrap
        position absolute
        width 100%
        left 0
        bottom 30px
        .control
          display flex
          padding 0 20px
          justify-content space-between

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
        svg
          fill $text-highlight-color
          width 15px
          height @width

        .list
          margin-left 15px
</style>
