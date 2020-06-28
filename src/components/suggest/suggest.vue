<template>
  <scroll class="suggest" :data="lists">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in lists" :key="item.id || item.singerid">
        <i><icon-svg :icon="getIconCls(item)"></icon-svg></i>
        <p class="text">{{ getDisplayText(item) }}</p>
      </li>
    </ul>
  </scroll>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { getSearchInfo } from "api/search.ts"
import { ERR_OK } from "../../api/config"
import { createSong } from "@/common/js/song"
import IconSvg from "base/icon-svg/icon-svg"
import Scroll from "base/scroll/scroll"

const TYPE_SINGER = "singer"
@Component({
  components: { IconSvg, Scroll },
})
export default class Suggest extends Vue {
  lists = []
  @Prop({ default: "" })
  query!: string

  created() {
    return
  }

  getIconCls(item) {
    return item.type === TYPE_SINGER ? "#el-icon-person" : "#el-icon-music"
  }
  getDisplayText(item) {
    return item.type === TYPE_SINGER ? item.singername : `${item.name}-${item.singer}`
  }

  _getSearchInfo(key) {
    getSearchInfo(key).then((response) => {
      if (response.data.code === ERR_OK) {
        this.lists = this.getResult(response.data)
        console.log(this.lists)
      }
    })
  }

  getResult(data) {
    let ret = []
    const {
      song: { list },
      zhida,
    } = data.data
    if (zhida && zhida.singerid) {
      ret.push({ ...zhida, type: TYPE_SINGER })
    }
    if (list) {
      const songs = list.map((item) => {
        return createSong(item)
      })
      ret = ret.concat(songs)
    }
    return ret
  }

  @Watch("query")
  watchQuery(newQuery) {
    if (!newQuery) {
      this.lists = []
      return
    }
    this._getSearchInfo(newQuery)
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
  ul
    text-align left
    li.suggest-item
      margin 10px 0px
      line-height 1.5
      display flex
      color darken($text-color,40)
      i
        flex 0
        margin-right 20px
      .text
        flex 1
        min-width 0
        no-wrap()
</style>
