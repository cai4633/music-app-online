<template>
  <scroll class="suggest" :data="lists" :pullup="true" @scrollToEnd="searchMore()">
    <ul class="suggest-list" v-show="hasMore">
      <li class="suggest-item" v-for="item in lists" :key="(item.name || item.singername) + Math.random()" @click="selectItem(item)">
        <i><icon-svg :icon="getIconCls(item)"></icon-svg></i>
        <p class="text">{{ getDisplayText(item) }}</p>
      </li>
    </ul>
    <div class="no-result-wrap" v-show="!hasMore && lists.length === 0">
      <no-result text="无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import { getSearchInfo } from "api/search.ts"
import { ERR_OK } from "../../api/config"
import { createSong } from "@/common/js/song.ts"
import { getSongUrl } from "../../api/songs"
import IconSvg from "base/icon-svg/icon-svg"
import Scroll from "base/scroll/scroll"
import NoResult from "base/no-result/no-result"

const TYPE_SINGER = "singer"
const perpage = 30
@Component({
  components: { IconSvg, Scroll, NoResult },
})
export default class Suggest extends Vue {
  lists = []
  page = 1
  hasMore = true

  @Prop({ default: "" })
  query!: string

  @Prop({ default: true })
  showSinger!: boolean

  created() {
    return
  }
  searchMore() {
    if (!this.hasMore) {
      return
    }
    this.page++
    this._getSearchInfo()
  }
  selectItem(item) {
    this.$emit("select", item)
  }
  getIconCls(item) {
    return item.type === TYPE_SINGER ? "#el-icon-person" : "#el-icon-music"
  }
  getDisplayText(item) {
    return item.type === TYPE_SINGER ? item.singername : `${item.name}-${item.singer}`
  }

  _getSearchInfo() {
    getSearchInfo(this.query, this.page, this.showSinger, perpage).then((response) => {
      if (response.code === ERR_OK) {
        this.getResult(response.data)
        this.checkMore(response.data)
      }
    })
  }

  checkMore(data) {
    if (data.song) {
      const { list, curnum, curpage, totalnum } = data.song
      this.hasMore = list.length && curnum + (curpage - 1) * perpage < totalnum ? true : false
    }
  }

  getResult({ song: { list }, zhida }) {
    let ret = []
    if (zhida && zhida.singerid) {
      ret.push({ ...zhida, type: TYPE_SINGER })
    }
    if (list) {
      const list_copy = list.map((item) => {
        return { mid: item.songmid, id: item.songid, name: item.songname, album: item.albumname, albummid: item.albummid }
      })
      return getSongUrl(list_copy).then((res) => {
        const songs = res.map((item) => {
          return createSong(item)
        })
        ret = ret.concat(songs)
        this.lists = this.lists.concat(ret)
      })
    }
  }

  initRequest() {
    this.lists = []
    this.zhida = 1
    this.page = 1
    this.hasMore = true
  }

  @Watch("query")
  watchQuery(newQuery) {
    if (!newQuery) {
      this.lists = []
      return
    }
    this.initRequest()
    this._getSearchInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.suggest
  height 100%
  overflow hidden
  padding 5px
  box-sizing border-box
  position relative
  ul
    text-align left
    li.suggest-item
      margin 10px 0px
      line-height 1.5
      display flex
      color $text-dark-color
      i
        flex 0
        margin-right 20px
      .text
        flex 1
        min-width 0
        no-wrap()
  .no-result-wrap
    width 100%
    position absolute
    top 40%
    transform translateY(-50%)
</style>
