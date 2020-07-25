<template>
  <div class="singer">
    <list-view :singerlist="singerlist" @select="gotoDetails"></list-view>
    <transition name="slide-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import { getSingerLists } from "../../api/singer"
import { ERR_OK } from "api/config"
import { Singers } from "common/js/singer"
import Scroll from "base/scroll/scroll.vue"
import ListView from "@/components/list-view/list-view.vue"
import { mapMutations, MutationMethod } from "vuex"
import { Mutation } from "vuex-class"
import { AxiosResponse } from "axios"
import jsonp0 from "common/js/jsonp"

const HOT_NAME = "热门"
const HOT_SONG_LENGTH = 10
@Component({
  components: { Scroll, ListView }
})
export default class Singer extends Vue {
  items = [
    {
      avatar:
        "https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000",
      name: "薛之谦"
    }
  ]
  singerlist: any[] = []

  @Mutation("SET_SINGER") setSinger!: MutationMethod

  mounted() {
    this.$nextTick(() => {
      this._getSingerLists()
    })
  }

  normalizeSinger(data: { title: string }[]) {
    const map: any = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    data.forEach((item, index, arr) => {
      if (index <= HOT_SONG_LENGTH - 1) {
        map.hot.items.push(item)
      }
      const key = item.title
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(item)
    })

    // 处理map.items 得到有序列表
    const hot: object[] = []
    const ret: object[] = []
    for (const key in map) {
      if (key.match(/^[a-zA-Z]$/g)) {
        ret.push(map[key])
      } else if (key === "hot") {
        hot.push(map[key])
      }
    }
    ret.sort((a: any, b: any): any => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })

    return hot.concat(ret)
  }

  gotoDetails(singer: Singers) {
    this.$router.push({ path: `/singer/${singer.mid}` })
    this.setSinger(singer)
  }

  _getSingerLists() {
    getSingerLists().then(response => {
      if (response.code === ERR_OK) {
        this.singerlist = this.normalizeSinger(response.data.singerlist)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl';

.singer
  content-position()

  // 详情进入动画
  slide-in()
</style>
