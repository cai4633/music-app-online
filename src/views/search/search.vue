<template>
  <div class="search">
    <div class="search-box-wrap">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="search-result" v-show="query" ref="suggest"><suggest :query="query" @select="onSelectEvent"></suggest></div>
    <scroll :data="shortcutList" class="shortcut" ref="shortcut">
      <div class="shortcut-inner">
        <div class="hotkey-wrap">
          <h1>热门搜索</h1>
          <div class="hotkey">
            <span class="key" v-for="key in hotkeys" :key="key.k + key.n" @click="selectItem(key.k)">{{ key.k }}</span>
          </div>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="clearfix">
            <span>搜索历史</span>
            <i @click="showConfirm"><icon-svg icon="#el-icon-clearAll"></icon-svg></i>
          </h1>
          <history-list :list="searchHistory" @delete="removeSearchHistory" @select="selectItem"></history-list>
        </div>
      </div>
    </scroll>
    <confirm @enter="clearSearchHistory" ref="confirm" enterBtnText="清除"></confirm>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import HistoryList from "base/history-list/history-list.vue"
import SearchBox from "base/search-box/search-box.vue"
import Suggest from "components/suggest/suggest.vue"
import IconSvg from "base/icon-svg/icon-svg.vue"
import Confirm from "base/confirm/confirm.vue"
import Scroll from "base/scroll/scroll.vue"
import Singer from "common/js/singer.vue"
import { getHotKey, getSearchInfo } from "api/search"
import { ERR_OK } from "api/config"
import { mapMutations, mapActions, mapGetters } from "vuex"
import axios from "axios"
import { PlaylistMixin, SearchMixin } from "common/js/mixins"

const TYPE_SINGER = "singer"
@Component({
  components: { SearchBox, Suggest, HistoryList, IconSvg, Scroll, Confirm },
  computed: {
    ...mapGetters(["searchHistory", "playlist"]),
  },
  methods: {
    ...mapMutations({ setSinger: "SET_SINGER" }),
    ...mapActions(["suggestToPlay", "saveSearchHistory", "removeSearchHistory", "clearSearchHistory"]),
  },
})
export default class Search extends Mixins(PlaylistMixin, SearchMixin) {
  hotkeys: any[] = []
  query = ""

  get shortcutList() {
    return this.hotkeys.concat(this.searchHistory)
  }
  created() {
    this._getHotKey()
  }
  selectItem(key: string) {
    ;(<SearchBox>this.$refs.searchBox).setQuery(key)
  }
  handlePlaylist() {
    const bottom = this.playlist.length ? 60 : 0
    ;(<Scroll>this.$refs.shortcut).$el.style.bottom = `${bottom}px`
    ;(<HTMLElement>this.$refs.suggest).style.bottom = `${bottom}px`
  }
  showConfirm() {
    ;(this.$refs.confirm as Confirm).show()
  }
  _getHotKey() {
    getHotKey().then((response: any) => {
      if (response.code === ERR_OK) {
        this.hotkeys = response.data.hotkey.slice(0, 10)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
.search
  background-color $background-color
  position fixed
  top 81px
  bottom 0px
  left 0px
  right 0px
  padding 0px 20px
  .search-box-wrap
    margin-top 20px
    position relative

  .search-result
    position fixed
    top 143px
    bottom 0px
    left 0
    right 0
    z-index 100
    background-color $background-color
    padding 10px 20px 0px 20px
  .shortcut
    position fixed
    top 155 px
    bottom 0px
    left 0
    right 0
    padding 0px 20px
    overflow hidden
    .hotkey-wrap
      color $text-color
      h1
        text-align left
        font-weight normal
      .hotkey
        margin-top 5px
        display flex
        flex-wrap wrap
        .key
          margin 6px 20px 6px 0px
          background-color $background-color-l
          line-height 1em
          padding 5px
          border-radius 5px
          color $text-dark-color
    .search-history
      color $text-color
      margin-top 10px
      h1
        font-weight normal
        text-align left
        i
          float right
          svg
            width 16px
            height @width
</style>
