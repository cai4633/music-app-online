<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class NoResult extends Vue {
  @Prop({ default: "暂时没有搜素结果" })
  text!: string;
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.no-result
  color $text-color
  .no-result-icon
    margin 0 auto
    width 172px
    height 175px
    bg-url('no-result')
  .text
    margin-top 10px
    text-align center
</style>
