<template>
  <scroll class="list-view" :data="singerlist" :probeType="3" @scroll="getPosY" ref="listView" @scrollEnd="scrollEnd">
    <div class="singer-wrap">
      <ul class="singer-content">
        <li v-for="item in singerlist" :key="item.id" ref="listgroup">
          <ul class="singer-inner">
            <h3 ref="title">{{ item.title }}</h3>
            <li v-for="singer in item.items" :key="singer.id" class="clearfix" @click="selectItem(singer)">
              <div class="avatar">
                <img v-lazy="webp2jpg(singer.singer_pic)" />
              </div>
              <p class="name">{{ singer.singer_name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <h2 class="fixed-title" ref="fixed">{{ titleList[currentIndex] }}</h2>
    <div class="loading-wrap" v-show="!singerlist.length">
      <loading></loading>
    </div>
    <div class="list-shortcut">
      <ul>
        <li
          v-for="(item, index) in shotcutList"
          :key="item + Math.random() * 100"
          :class="{ active: currentIndex === index }"
          :data-index="index"
          @click="shortcutClick"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script lang="ts">
import Scroll from "base/scroll/scroll.vue"
import Loading from "base/loading/loading.vue"
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import { mapGetters } from "vuex"
import { PlaylistMixin } from "common/js/playlistMixin"
import Singer from "common/js/singer"
@Component({
  components: { Scroll, Loading },
  computed: {
    ...mapGetters(["playlist", "fullScreen"]),
  },
})
export default class ListView extends Mixins(PlaylistMixin) {
  shotcutList: string[] = []
  heightlist: any[] = []
  titleList: string[] = []
  currentIndex = 0
  titleHeight = 0
  isClick = false

  @Prop()
  private singerlist!: object[]

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  }

  handlePlaylist() {
    const BOTTOM = this.playlist.length ? 45 : 0
    if (this.$refs.listView) {
      this.$refs.listView.$el.style.bottom = `${BOTTOM}px`
      this.$refs.listView.refresh()
    }
  }

  init() {
    this.calHeight()
    this._getShortcutList()
  }

  webp2jpg(img) {
    return img.replace(/webp$/, "jpg")
  }
  scrollEnd() {
    this.isClick = false
  }
  shortcutClick(e: any) {
    this.currentIndex = parseInt(e.currentTarget.dataset.index)
    this._scrollTo(this.currentIndex)
    this.isClick = true
  }

  // 计算热门,[a-z] li的高度
  calHeight() {
    this.$nextTick(() => {
      const listgroup: Element[] = (this.$refs.listgroup as Element[]) || []
      let height = 0
      if (listgroup.length) {
        this.titleHeight = (this.$refs.title as HTMLElement[])[0].offsetHeight
        this.heightlist = Array.prototype.map.call(listgroup, (li: { [key: string]: number }): number => {
          height += li.offsetHeight
          return height
        })
      }
    })
  }

  _scrollTo(index: number) {
    if (this.heightlist.length) {
      const y: number = index >= 1 ? -this.heightlist[index - 1] : 0
      ;(this.$refs.listView as Scroll).scrollTo(0, y)
    }
  }

  //滚动事件
  getPosY(y: number) {
    if (this.heightlist.length && !this.isClick) {
      for (let i = 0; i < this.heightlist.length; i++) {
        if (this.heightlist[i] >= -y) {
          this.currentIndex = i
          break
        }
      }
    }
    this.diff(y)
  }

  //fixed bar 滚动切换效果
  diff(y: number) {
    let distance = this.heightlist.length ? this.heightlist[this.currentIndex] + y - this.titleHeight : 0
    distance = distance > 0 ? 0 : distance
    this.fixedTransfrom(distance)
  }

  fixedTransfrom(distance: number) {
    ;(this.$refs.fixed as HTMLElement).style.transform = `translateY(${distance}px)`
  }

  //获取list-shortcut的content
  _getShortcutList() {
    this.singerlist.forEach((item: any) => {
      this.shotcutList.push(item.title[0])
      this.titleList.push(item.title)
    })
  }

  selectItem(item: object) {
    const singer = new Singer({ id: item.singer_id, name: item.singer_name, mid: item.singer_mid })
    this.$emit("select", singer)
  }

  @Watch("singerlist")
  watchSingerlist() {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

header-style()
  text-align left
  padding-left 20px
  font-weight normal
  line-height 2.5
  height 2.5em
  font-size 12px
  background-color #333
  text-transform uppercase

.list-view
  background-color $background-color
  color $text-color
  overflow hidden
  position absolute
  top 0
  bottom 0
  left 0
  right 0

  h2.fixed-title
    header-style()
    position absolute
    top 0px
    width 100%
    left 0
    z-index 6

  .singer-wrap
    padding-bottom 1px
    position relative
    ul.singer-content
      li
        padding-bottom 18px
        ul.singer-inner
          h3
            header-style()
          li
            $line-height = 50px
            padding 20px 0 0px 30px
            .avatar
              float left

              img
                width $line-height
                height $line-height
                display block
                border-radius 50%

            .name
              padding-left 70px
              text-align left
              line-height $line-height


  .list-shortcut
    position absolute
    top 50%
    transform translateY(-50%)
    right 8px
    color red
    font-size 12px
    z-index 16

    ul
      background-color $list-shortcut-bc
      padding 10px 2px
      border-radius 2em

      li
        color $text-color
        padding 2px 0

        &.active
          color $text-highlight-color

.loading-wrap
  position fixed
  width 100%
  top 50%
  transform translateY(-50%)
  z-index 3
</style>
