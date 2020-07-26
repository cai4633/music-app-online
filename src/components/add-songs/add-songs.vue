<template>
  <transition name="slide">
    <div class="add-songs" v-show="showFlag">
      <div class="header">
        <h1>添加歌曲到列表</h1>
        <span class="close" @click.stop="hide"><icon-svg icon="#el-icon-clear"></icon-svg></span>
      </div>
      <div class="search-box-wrap">
        <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="search-result" v-show="query" ref="suggest">
        <suggest :query="query" @select="onSelectEvent" :showSinger="false"></suggest>
      </div>
      <ul class="switch-wrap">
        <switches :currentIndex="tabIndex" :switches="switches" @select="switchTab"></switches>
      </ul>
      <div class="content-wrap">
        <scroll class="list-scroll0" v-if="tabIndex === 0" ref="playHistory" :data="playHistory" key="scroll0">
          <div class="list-inner0">
            <song-list :songs="playHistory" @select="playRecently"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll1" v-if="tabIndex === 1" ref="searchHistory" :data="searchHistory" key="scroll1">
          <div class="list-inner1">
            <history-list :list="searchHistory" @delete="removeSearchHistory" @select="selectItem"></history-list>
          </div>
        </scroll>
      </div>
      <top-tip ref="toptip">
        <div class="tip">
          <span class="icon-ok"><icon-svg icon="#el-icon-ok"></icon-svg></span>
          <span>歌曲添加成功</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import HistoryList from "base/history-list/history-list.vue"
import Suggest from "@/components/suggest/suggest.vue"
import SearchBox from "base/search-box/search-box.vue"
import SongList from "base/song-list/song-list.vue"
import Switches from "base/switches/switches.vue"
import IconSvg from "base/icon-svg/icon-svg.vue"
import Scroll from "base/scroll/scroll.vue"
import TopTip from "base/top-tip/top-tip.vue"
import { mapGetters, mapActions } from "vuex"
import { SearchMixin } from "common/js/mixins"
import { findIndex } from "../../common/js/player"
import { Songs } from "common/js/config"

@Component({
  computed: {
    ...mapGetters(["playHistory", "searchHistory", "currentSong", "sequencelist"]),
  },
  methods: {
    ...mapActions(["suggestToPlay", "insertSong"]),
  },
  components: {
    Suggest,
    SearchBox,
    HistoryList,
    IconSvg,
    Scroll,
    Switches,
    SongList,
    TopTip,
  },
})
export default class AddSongs extends Mixins(SearchMixin) {
  showFlag = false
  query = ""
  switches = ["最近播放", "搜索历史"]
  tabIndex = 0
  $refs!: {
    playHistory: Scroll
    searchHistory: Scroll
    toptip: TopTip
    searchBox: SearchBox
  }

  switchTab(index: number) {
    this.tabIndex = index
  }
  playRecently(song: Songs, index: number) {
    if (index !== 0) {
      this.insertSong(song)
      this.$refs.toptip.show()
    }
  }
  onSelectEvent(item: Songs) {
    this.insertSong(item)
    this.saveSearchHistory(this.query)
    this.$refs.toptip.show()
  }
  selectItem(key: string) {
    this.$refs.searchBox.setQuery(key)
  }
  show() {
    this.showFlag = true
  }
  hide() {
    this.showFlag = false
  }
  scrollFresh() {
    this.$nextTick(() => {
      this.$refs.playHistory ? this.$refs.playHistory.refresh() : this.$refs.searchHistory.refresh()
    })
  }

  @Watch("tabIndex")
  tabIndexChange() {
    this.scrollFresh()
  }
  @Watch("showFlag")
  showFlagchanage(newflag: boolean) {
    if (!newflag) {
      return
    }
    this.scrollFresh()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.slide-enter-active, .slide-leave-active
  transition transform .4s
.slide-enter, .slide-leave-to
  transform translateX(100%)

.add-songs
  position absolute
  top 0
  bottom 0
  right 0
  left 0
  background-color $background-color-d
  .header
    position relative
    h1
      margin-top 5px
      line-height 2
      font-size 18px
    span.close
      position absolute
      top .7em
      right 20px
      svg
        width 18px
        height @width
        fill $text-highlight-color
  .search-box-wrap
    width 80%
    margin auto
    max-width 500px
  .search-result
    position fixed
    top 80px
    bottom 0px
    left 0
    right 0
    z-index 100
    background-color $background-color
    padding 10px 30px 0px 30px

  .switch-wrap
    margin-top 20px

  .content-wrap
      position absolute
      top 140px
      bottom 0
      width 100%
      color $text-dark-color
      overflow hidden
    .list-scroll0
      box-sizing border-box
      height 100%
      text-align left
      // padding-top 10px
      line-height 2
      overflow hidden
    .list-scroll1
      box-sizing border-box
      height 100%
      padding 0 30px
      overflow hidden

  .tip
    line-height 4em
    color lighten($text-color,20%)
    background-color $background-color
    .icon-ok
      margin-right 8px
      svg
        fill $text-highlight-color
</style>
