<template>
  <transition name="slide-in">
    <div class="user-center">
      <div class="back" @click.stop="back"><go-back></go-back></div>
      <div class="switches-wrap">
        <switches :switches="switches" :currentIndex="tabIndex" @select="tabSwitch"></switches>
      </div>
      <div class="playbtn" @click="random">
        <icon-svg icon="#el-icon-play1"></icon-svg>
        <span>随机播放全部</span>
      </div>
      <div class="content" ref="content">
        <scroll class="favorite-wrap" v-if="tabIndex === 0" ref="favorite" :data="favorite" key="favorite">
          <div class="list-inner">
            <song-list :songs="favorite" @select="favoriteToPlay"></song-list>
          </div>
        </scroll>
        <scroll class="playhistory" v-if="tabIndex === 1" ref="history" :data="playHistory" key="history">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="historyToPlay"></song-list>
          </div>
        </scroll>
        <div class="no-result-wrap" v-show="noResult()">
          <no-result :text="noResultText()"></no-result>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import Switches from "base/switches/switches.vue"
import GoBack from "base/go-back/go-back.vue"
import SongList from "base/song-list/song-list.vue"
import { Songs } from "common/js/config"
import { Getter, Action } from "vuex-class"
import { ActionMethod } from "vuex"
import Song from "common/js/song"
import Scroll from "base/scroll/scroll.vue"
import { PlaylistMixin } from "common/js/mixins"
import IconSvg from "base/icon-svg/icon-svg.vue"
import NoResult from "base/no-result/no-result.vue"
import HistoryList from "../../base/history-list/history-list.vue"

@Component({
  components: { Switches, GoBack, SongList, Scroll, IconSvg, NoResult },
})
export default class UserCenter extends Mixins(PlaylistMixin) {
  switches: string[] = ["我的喜欢", "最近收听"]
  tabIndex = 0
  $refs!: {
    favorite: Scroll
    history: Scroll
    content: HTMLElement
  }

  @Getter("playHistory") playHistory!: Songs[]
  @Getter("playing") playing!: boolean
  @Getter("favorite") favorite!: Songs[]
  @Action("insertSong") insertSong!: ActionMethod
  @Action("suggestToPlay") suggestToPlay!: ActionMethod
  @Action("randomPlay") randomPlay!: ActionMethod

  get list() {
    return this.playHistory.concat(this.favorite)
  }

  handlePlaylist() {
    const BOTTOM = this.playlist.length ? 60 : 0
    if (this.$refs.content) {
      this.$refs.content.style.bottom = `${BOTTOM}px`
      this.scrollFresh()
    }
  }
  random() {
    const list = this.tabIndex === 0 ? this.favorite : this.playHistory
    if (!list.length) {
      return
    }
    const newlist = list.map((song) => new Song(song))
    this.randomPlay(newlist)
  }
  favoriteToPlay(song: Songs) {
    this.suggestToPlay(new Song(song))
  }
  historyToPlay(song: Songs, index: number) {
    if (index === 0 && this.playing) {
      return
    }
    this.suggestToPlay(new Song(song)) //song丢失了原型方法，重新构造后生成
  }
  back() {
    this.$router.back()
  }
  noResult() {
    return this.tabIndex ? !this.playHistory.length : !this.favorite.length
  }
  noResultText() {
    return this.tabIndex ? "暂无最近收听歌曲" : "暂无收藏歌曲"
  }
  tabSwitch(index: number) {
    this.tabIndex = index
  }
  scrollFresh() {
    this.$refs.favorite ? this.$refs.favorite.refresh(0) : this.$refs.history.refresh(0)
  }

  @Watch("tabIndex")
  tabIndexChange() {
    this.scrollFresh()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

slide-in()
.user-center
  fixed-adapt()
  background-color $background-color
  color $text-color
  z-index $user-center-zindex
  .back
    position absolute
    top 10px
    left 10px
  .switches-wrap
    margin-top 10px

  .playbtn
    margin-top 10px
    display inline-block
    border 1px solid $text-color
    padding 7px 25px
    line-height 1.1
    border-radius 30px

  .content
    position absolute
    top 90px
    left 0
    bottom 0
    right 0
    overflow hidden
    .favorite-wrap
      height 100%
      box-sizing border-box
    .playhistory
      height 100%
      box-sizing border-box
    .no-result-wrap
      position absolute
      top 10%
      left 0
      right 0
      height 100%
</style>
