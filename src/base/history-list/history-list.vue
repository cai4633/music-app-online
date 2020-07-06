<template>
  <div class="history-list">
    <ul>
      <li v-for="item in list" class="clearfix" @click="seleteItem(item)">
        <span>{{ item }}</span>
        <i @click.stop="selectOne(item)"><icon-svg icon="#el-icon-clear"></icon-svg></i>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import IconSvg from "base/icon-svg/icon-svg"
@Component({
  components: { IconSvg },
})
export default class HistoryList extends Vue {
  @Prop({ default: () => [] })
  list!: string[]
  seleteItem(item) {
    this.$emit("select", item)
  }
  selectOne(item) {
    this.$emit("delete", item)
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
.history-list
  ul
    margin-top 10px
    li
      color $text-dark-color
      padding 3px 0px
      text-align left
      i
        float right
        svg
          width 16px
          height 16px
</style>
