<template>
  <div class="singer-details">
    <div class="banner">
      <h1>{{ singer.singer_name }}</h1>
      <img :src="bgImg" alt="" />
      <div class="playbtn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#el-icon-play1"></use>
        </svg>
        <span>随机播放全部</span>
      </div>
    </div>
    <scroll class="songlist" :data="items">
      <ul>
        <li v-for="item in items" :key="item.id">
          <h2>{{ item.name }}</h2>
          <p>{{ getDesc(item) }}</p>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapGetters } from "vuex"
import { getSingerSongs } from "../../api/singer"
import { ERR_OK } from "api/config"
import { createSong } from "common/js/song"
import Scroll from "@/base/scroll/scroll"
@Component({
  components: {
    Scroll,
  },
  computed: {
    ...mapGetters(["singer"]),
    bgImg() {
      return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.singer_mid}.jpg?max_age=2592000`
    },
  },
})
export default class SingerDetails extends Vue {
  items = []
  mounted() {
    this.$nextTick(() => {
      if (!this.singer.singer_mid) {
        this.$router.push({ path: "/singer" })
      }
      this._getSingerSongs(this.singer.singer_mid)
    })
  }

  getDesc(item) {
    return item.singer + "·" + item.album
  }

  normalizeData({ songList }) {
    return songList.map((item) => {
      return createSong(item)
    })
  }
  _getSingerSongs(mid) {
    getSingerSongs(mid).then(({ data, code }) => {
      if (code === ERR_OK) {
        this.items = this.normalizeData(data)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
// @import '~common/stylus/font.styl';
.singer-details
  background-color $background-color
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 20
  color $text-color
  .banner
    height 40vh
    overflow hidden
    position relative
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


  .songlist
    padding  20px   30px
    height 60vh
    overflow hidden
    ul
      li
        text-align left
        padding  10px 0
        line-height 1.6
        h2
         font-weight normal
         color #fff
        p
         margin-top 2px
         color rgba(255,255,255,.3)
         white-space nowrap
         text-overflow ellipsis
         overflow hidden
</style>
