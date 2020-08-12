<template>
  <scroll class="rank" ref="rank" :data="lists">
    <div class="rank-inner">
      <ul class="content-inner">
        <li v-for="list in lists" @click="selectItem(list)" :key="list.id">
          <div class="topIcon">
            <img @load="imgLoad" v-lazy="list.picUrl" width="100" />
          </div>
          <ul class="songlist">
            <li v-for="(song, songIndex) in list.songList" :key="song.songname">
              <span>{{ songIndex + 1 }}</span>
              <span class="txt"
                >{{ song.songname }} - {{ song.singername }}</span
              >
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-wrap" v-show="!lists.length"><loading></loading></div>
    </div>
    <transition name="slide-in">
      <router-view></router-view>
    </transition>
  </scroll>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import { PlaylistMixin } from "@/common/js/mixins"
import { MutationMethod, mapGetters } from "vuex"
import Scroll from "base/scroll/scroll.vue"
import { getRank } from "api/rank.ts"
import { ERR_OK } from "api/config"
import { Mutation, Getter } from "vuex-class"
import Loading from "base/loading/loading.vue"

@Component({
  components: { Scroll, Loading }
})
export default class Rank extends Mixins(PlaylistMixin) {
  lists: RankItem[] = []
  $refs!: {
    rank: Scroll
  }

  @Getter("playlist") playlist!: any[]
  @Mutation("SET_TOPLIST") setToplist!: MutationMethod

  mounted() {
    this._getRank()
  }
  imgLoad() {
    this.$refs.rank.refresh()
  }
  selectItem(item: RankItem) {
    this.setToplist(item)
    this.$router.push({ path: `/rank/${item.id}` })
  }
  handlePlaylist() {
    const BOTTOM = this.playlist.length ? 60 : 0
    if (this.$refs.rank) {
      this.$refs.rank.$el.style.bottom = `${BOTTOM}px`
      this.$refs.rank.refresh()
    }
  }
  _getRank() {
    this.$nextTick(() => {
      return getRank().then((response: MyResponse) => {
        if (response.code === ERR_OK) {
          this.lists = response.data.topList
        }
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.rank
  content-position()
  color $text-color
  // 详情进入动画
  slide-in()

  .rank-inner
    padding 10px 20px 0px 20px
    .loading-wrap
      position-center(fixed, x)
      top 45%
    ul.content-inner
      padding-bottom 2px
      &>li
        display flex
        align-items  center
        justify-content flex-start
        margin-bottom 15px
        background-color lighten($background-color, 10%)
        div.topIcon
          flex 0 0 auto
          img
            width 100px
            vertical-align top

        ul.songlist
          display flex
          padding 0px 15px
          box-sizing border-box
          flex 1
          text-align left
          font-size 12px
          flex-direction column
          justify-content center
          min-width 0px

          li
            white-space nowrap
            text-align left
            text-overflow ellipsis
            overflow hidden
            line-height 1.8

            span
              box-sizing border-box
              padding-right 5px
              font-size 12px
</style>
