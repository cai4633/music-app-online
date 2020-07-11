<template>
  <div class="switches">
    <ul class="tab">
      <li v-for="(item, index) in switches" :key="item" @click.stop="selectItem(index)" :class="{ active: index === currentIndex }">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
@Component
export default class Switches extends Vue {
  @Prop({ default: () => [] })
  switches!: stirng[]
  @Prop({ default: 0 })
  currentIndex!: number

  selectItem(index) {
    this.$emit("select", index)
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.switches
  .tab
    display flex
    padding 0 60px
    li
      flex 1
      border 1px solid $text-color-l
      line-height 2
      &.active
        background-color $background-color-l
</style>
