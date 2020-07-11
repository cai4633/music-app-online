<template>
  <div class="history-list">
    <transition-group tag="ul" name='history'>
      <li v-for="item in list" class="clearfix" @click="seleteItem(item)" :key='item'>
        <span>{{ item }}</span>
        <i @click.stop="selectOne(item)"><icon-svg icon="#el-icon-clear"></icon-svg></i>
      </li>
    </transition-group>
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
  .history-leave-active
    transition transform .4s
  .history-leave-to
    transform translatex(100%)
    
  ul
    margin-top 10px
    position relative
    z-index 0
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
