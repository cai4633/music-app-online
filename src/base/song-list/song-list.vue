<template>
  <div class="songlist" ref="songList">
    <ul>
      <li v-for="(item, index) in songs" :key="item.id" @click.stop="selectItem(item, index)">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
        </div>
        <div class="content">
          <h2>{{ item.name }}</h2>
          <p>{{ getDesc(item) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator"
import { mapGetters, mapMutations } from "vuex"
import Song from "common/js/song"

@Component({
  components: {},
})
export default class SongList extends Vue {
  @Prop()
  private songs!: object[]

  @Prop({ default: false })
  private rank!: boolean

  getDesc(item: Songs) {
    return item.singer ? item.singer + "·" + item.album : "未知歌手"
  }
  getRankCls(index: number) {
    return index <= 2 ? `icon-${index + 1}` : "txt"
  }

  getRankText(index: number) {
    return index <= 2 ? "" : index + 1
  }
  selectItem(item: Songs, index: number) {
    this.$emit("select", item, index)
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl';

.songlist
  padding  5px  30px  15px 30px
  ul
    li
      text-align left
      padding  8px 0
      line-height 1.6
      display flex
      .rank
        flex 0 0 25px
        display flex
        justify-content center
        align-items center
        width 25px
        margin-right 25px
        span
          display block
          width 25px
          height 24px
          text-align center
          line-height 24px
          &.icon-1
            bg-url('first')
          &.icon-2
            bg-url('second')
          &.icon-3
            bg-url('third')
          &.txt
            font-size 16px
            color $text-highlight-color

      .content
        flex 1
        min-width 0
        h2
          font-weight normal
          color #fff
        p
          margin-top 2px
          color $text-dark-color
          font-size 0.9em
          no-wrap()
</style>
