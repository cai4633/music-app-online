<template>
  <scroll class="rank" ref="rank" :data="lists">
    <ul class="content-inner">
      <li v-for="list in lists" @click="selectItem(list)" :key="'rank' + list.id">
        <div class="topIcon"><img @load="imgLoad" v-lazy="list.picUrl" width="100" /></div>
        <ul class="songlist">
          <li v-for="(song, songIndex) in list.songList" :key="song.songname + ((Math.random() * 10000) | 0)">
            <span>{{ songIndex + 1 }}</span>
            <span class="txt">{{ song.songname }} - {{ song.singername }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <router-view></router-view>
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

@Component({
  components: { Scroll },
})
export default class Rank extends Mixins(PlaylistMixin) {
  lists: any[] = []

  @Getter("playlist") playlist!: any[]
  @Mutation("SET_TOPLIST") setToplist!: MutationMethod

  mounted() {
    this._getRank()
  }
  imgLoad() {
    ;(this.$refs.rank as Scroll).refresh()
  }
  selectItem(item: any) {
    this.setToplist(item)
    this.$router.push({ path: `/rank/${item.id}` })
  }
  handlePlaylist() {
    const BOTTOM = this.playlist.length ? 60 : 0
    if (this.$refs.rank) {
      ;(<Scroll>this.$refs.rank).$el.style.bottom = `${BOTTOM}px`
      ;(this.$refs.rank as Scroll).refresh()
    }
  }
  _getRank() {
    this.$nextTick(() => {
      return getRank().then((response: any) => {
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
.rank
  position fixed
  top 81px
  bottom 0
  left 0
  right 0
  padding 20px 10px
  background-color $background-color
  color $text-color
  overflow hidden
  ul.content-inner
    &>li
      display flex
      align-items  center
      justify-content flex-start
      padding-bottom 15px
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
