<template>
  <div class="player" v-if="playlist.length">
    <div class="fullScreen" v-show="fullScreen">
      <h1>{{ currentSong.name }}</h1>
      <h2>{{ currentSong.singer }}</h2>
      <div class="disk-wrap">
        <div class="disk"><img :src="currentSong.image" alt="" /></div>
      </div>
      <div class="control-wrap">
        <div class="control">
          <div class="play-mode">
            <icon-svg icon="#el-icon-random" v-show="mode === 2"></icon-svg>
            <icon-svg icon="#el-icon-loop" v-show="mode === 1"></icon-svg>
          </div>
          <div class="previous">
            <icon-svg icon="#el-icon-previous"></icon-svg>
          </div>
          <div class="play">
            <icon-svg icon="#el-icon-play2" v-show="!playing"></icon-svg>
            <icon-svg icon="#el-icon-Pause" v-show="playing"></icon-svg>
          </div>
          <div class="next">
            <icon-svg icon="#el-icon-next"></icon-svg>
          </div>
          <div class="favorites">
            <icon-svg icon="#el-icon-favorites"></icon-svg>
          </div>
        </div>
      </div>
      <audio :src="currentSong.url" autoplay></audio>
      <div class="back" @click="showMiniPlayer"><go-back></go-back></div>
    </div>
    <div class="mini-player" v-show="!fullScreen">
      <div class="content">
        <div class="avatar">
          <img :src="currentSong.image" alt="" />
        </div>
        <div class="text">
          <h2>{{ currentSong.name }}</h2>
          <h3>{{ currentSong.singer }}</h3>
        </div>
        <div class="control">
          <div class="play">
            <icon-svg icon="#el-icon-play2" v-show="!playing"></icon-svg>
            <icon-svg icon="#el-icon-Pause" v-show="playing"></icon-svg>
          </div>
          <div class="list">
            <icon-svg icon="#el-icon-list"></icon-svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapGetters, mapMutations } from "vuex"
import IconSvg from "base/icon-svg/icon-svg"
import GoBack from "base/go-back/go-back"
@Component({
  components: { GoBack, IconSvg },
  computed: {
    ...mapGetters(["playlist", "fullScreen", "playing", "currentSong", "currentIndex", "mode"]),
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
    }),
  },
})
export default class Player extends Vue {
  mounted() {
    console.log(this.currentSong)
  }
  showMiniPlayer() {
    this.setFullScreen(false)
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.player
  .back
    position fixed
    top 10px
    left 10px
  .fullScreen
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
      margin-top 20px
      .disk
        display inline-block
        img
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
