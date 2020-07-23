<template>
  <scroll class="suggest" :data="lists" :pullup="true" @scrollToEnd="searchMore()" ref="suggest">
    <div class="scroll-inner">
      <ul class="suggest-list" v-show="hasMore">
        <li class="suggest-item" v-for="item in lists" :key="item.id" @click="selectItem(item)" >
          <i><icon-svg :icon="getIconCls(item)"></icon-svg></i>
          <p class="text">{{ getDisplayText(item) }}</p>
        </li>
      </ul>
      <div class="loading-wrap" v-show="hasMore"><loading></loading></div>
      <div class="no-result-wrap" v-show="!hasMore && lists.length === 0">
        <no-result text="无搜索结果"></no-result>
      </div>
    </div>
  </scroll>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import NoResult from "base/no-result/no-result.vue"
import IconSvg from "base/icon-svg/icon-svg.vue"
import Loading from "base/loading/loading.vue"
import Scroll from "base/scroll/scroll.vue"
import { getSearchInfo } from "api/search.ts"
import { ERR_OK } from "api/config"
import { createSong } from "common/js/song.ts"
import { getSongUrl } from "api/songs"

const TYPE_SINGER = "singer"
const perpage = 30

@Component({
  components: { IconSvg, Scroll, NoResult, Loading }
})
export default class Suggest extends Vue {
  lists: any[] = []
  page = 1
  hasMore = true
  $refs!: {
    suggest: Scroll
  }

  @Prop({ default: "" })
  query!: string

  @Prop({ default: true })
  showSinger!: boolean

  searchMore() {
    if (!this.hasMore) {
      return
    }
    this.page++
    this._getSearchInfo()
  }
  selectItem(item: any) {
    this.$emit("select", item)
  }
  getIconCls(item: any) {
    return item.type === TYPE_SINGER ? "#el-icon-person" : "#el-icon-music"
  }
  getDisplayText(item: any) {
    return item.type === TYPE_SINGER
      ? item.singerName
      : `${item.name}-${item.singer}`
  }

  _getSearchInfo() {
    getSearchInfo(this.query, this.page, this.showSinger, perpage).then(
      (response: any) => {
        if (response.code === ERR_OK) {
          this.getResult(response.data)
          this.checkMore(response.data)
        }
      }
    )
  }

  checkMore(data: any) {
    if (data.song) {
      const { list, curnum, curpage, totalnum } = data.song
      this.hasMore =
        list.length && curnum + (curpage - 1) * perpage < totalnum
          ? true
          : false
    }
  }

  getResult({ song: { list }, zhida }: any) {
    let ret: any[] = []
    if (zhida.type === 1 && !this.lists.length) {
      ret.push({ ...zhida.zhida_singer, type: TYPE_SINGER })
    }
    if (list) {
      const listFormat = list.map((item: any) => {
        return {
          mid: item.mid,
          id: item.id,
          name: item.name,
          album: item.album.name,
          albummid: item.album.mid
        }
      })
      return getSongUrl(listFormat).then((res: any) => {
        const songs = res.map((item: any) => {
          return createSong(item)
        })
        ret = ret.concat(songs)
        this.lists = this.lists.concat(ret)
      })
    }
  }

  initRequest() {
    this.lists = []
    this.page = 1
    this.hasMore = true
  }

  @Watch("query")
  watchQuery(newQuery: string) {
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
    position absolute
    width 100%
    top 40%
    transform translateY(-50%)
  .loading-wrap
    margin-top 10px
</style>
