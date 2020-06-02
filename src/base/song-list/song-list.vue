<template>
  <scroll class="songlist" :data="songs" ref="songList">
    <ul>
      <li v-for="item in songs" :key="item.id">
        <h2>{{ item.name }}</h2>
        <p>{{ getDesc(item) }}</p>
      </li>
    </ul>
  </scroll>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator"
import Scroll from "base/scroll/scroll"

@Component({
  components: { Scroll },
})
export default class SongList extends Vue {
  @Prop()
  private songs!: object[]
  @Prop({ default: false })
  private refresh!: boolean

  getDesc(item) {
    return item.singer + "·" + item.album
  }
  _refresh() {
    this.$refs.songList.refresh()
  }

  @Watch("refresh")
  scrollRefresh() {
    this._refresh()
  }
}
</script>

<style lang="stylus" scoped>
.songlist
  position fixed
  top 70vw
  bottom 0
  left 0
  width 100%
  box-sizing border-box
  overflow hidden
  ul
    padding  5px  30px  15px 30px
    li
      text-align left
      padding  10px 0
      line-height 1.6
      h2
       font-weight normal
       color #fff
      p
       margin-top 2px
       color rgba(255,255,255,.3)
       white-space nowrap
       text-overflow ellipsis
       overflow hidden
</style>
