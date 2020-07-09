<template>
  <transition name="slide">
    <div class="add-songs" v-show="showFlag">
      <div class="header">
        <h1>添加歌曲到列表</h1>
        <span class="close" @click.stop="hide"><icon-svg icon="#el-icon-clear"></icon-svg></span>
      </div>
      <div class="search-box-wrap">
        <search-box ref="searchBox" @query="onQueryChange"></search-box>
      </div>
      <div class="search-result" v-show="query" ref="suggest"><suggest :query="query" @select="onSelectEvent"></suggest></div>
      <ul class="tab">
        <li :class="{ active: showHistory }" @click.stop="toPlayHistory">最近播放</li>
        <li :class="{ active: !showHistory }" @click.stop="toSearchHistory">搜索历史</li>
      </ul>
      <scroll class="history-wrap" :data="history" ref="historyWrap">
        <div class="history-inner">
          <div class="playHistory" v-show="showHistory">
            <ul>
              <li
                ref="historyLi"
                v-for="(song, index) in playHistory"
                :key="index + Math.random() * 10000000"
                v-html="song.name"
                @click.stop="playRecently(song)"
              ></li>
            </ul>
          </div>
          <div class="searchHistory" v-show="!showHistory">
            <history-list :list="searchHistory" @delete="removeSearchHistory" @select="selectItem"></history-list>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import SearchBox from "base/search-box/search-box"
import { mapGetters, mapActions } from "vuex"
import HistoryList from "base/history-list/history-list"
import IconSvg from "base/icon-svg/icon-svg"
import Suggest from "@/components/suggest/suggest"
import { SearchMixin } from "common/js/mixins"
import Scroll from "base/scroll/scroll"
import { findIndex } from "../../common/js/player"

@Component({
  computed: {
    ...mapGetters(["playHistory", "searchHistory", "currentSong", "sequencelist"]),
  },
  methods: {
    ...mapActions(["suggestToPlay"]),
  },
  components: { Suggest, SearchBox, HistoryList, IconSvg, Scroll },
})
export default class AddSongs extends Mixins(SearchMixin) {
  showFlag = false
  showHistory = true
  query = ""
  get history() {
    return this.playHistory ? this.playHistory.concat(this.searchHistory) : []
  }
  playRecently(song) {
    this.suggestToPlay(song)
    this.hide()
    this.$emit("hide")
  }

  selectItem(key) {
    this.$refs.searchBox.setQuery(key)
  }
  toPlayHistory() {
    this.showHistory = true
  }
  toSearchHistory() {
    this.showHistory = false
  }
  scrollToCurrent() {
    if (!this.currentSong) {
      return
    }
    const index = findIndex(this.sequencelist, this.currentSong)
    this.$refs.historyWrap.scrollToElement(this.$refs.historyLi[index], 20)
  }
  show() {
    this.showFlag = true
  }
  hide() {
    this.showFlag = false
  }
  @Watch("showHistory")
  __showHistory(newflag) {
    this.$nextTick(() => {
      this.$refs.historyWrap.refresh()
    })
  }
  @Watch("showFlag")
  __showFlag(newflag) {
    this.$nextTick(() => {
      this.$refs.historyWrap.refresh()
    })
  }
  @Watch("currentSong")
  __currentSong(newsong) {
    this.$nextTick(() => {
      this.scrollToCurrent()
    })
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
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  background-color $background-color-d
  .header
    position relative
    h1
      margin-top 5px
      line-height 3
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
    top 86px
    bottom 0px
    left 0
    right 0
    z-index 100
    background-color $background-color
    padding 10px 30px 0px 30px

  .tab
    margin-top 20px
    display flex
    padding 0 60px
    li
      flex 1
      border 1px solid $text-color-l
      line-height 2
      &.active
        background-color $background-color-l

  .history-wrap
      position absolute
      top 140px
      bottom 0
      right 0
      left 0
      padding 0px 35px
      color $text-dark-color
      overflow hidden
    .playHistory
      box-sizing border-box
      height 100%
      text-align left
      padding-top 10px
      line-height 2
    .searchHistory
      box-sizing border-box
      height 100%
</style>
