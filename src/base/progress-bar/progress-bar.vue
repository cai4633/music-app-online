<template>
  <div class="progress-bar">
    <span class="ct">{{ formatTime(currentTime) }}</span>
    <div class="bar" ref="bar">
      <div class="bar-inner" ref="barInner" :style="{ width: !this.touch.init && `${this.percent}` }">
        <div class="progress"></div>
        <div class="progress-btn-wrap" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @click="click">
          <div class="progress-btn"></div>
        </div>
      </div>
    </div>
    <span class="tt">{{ formatTime(totalTime) }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
@Component
export default class ProgressBar extends Vue {
  touch = { init: false, startX: 0, endX: 0, currentWidth: 0 }

  @Prop({ default: "0" })
  currentTime!: number
  @Prop({ default: "0" })
  totalTime!: number

  get percent() {
    return `${(this.currentTime / this.totalTime) * 100}%`
  }

  formatTime(time = 0) {
    const min = (time / 60) | 0
    const second = time % 60 | 0
    return `${min}:${second < 10 ? "0" + second : second}`
  }

  click(e) {
    return
  }
  touchstart(e) {
    this.touch.startX = e.touches[0].pageX
    this.touch.currentWidth = this.$refs.barInner.offsetWidth
    this.touch.init = true
    return
  }
  touchmove(e) {
    // e.preventDefault()
    const width = this.$refs.bar.offsetWidth

    this.touch.endX = e.touches[0].pageX
    const newWidth = this.touch.currentWidth + this.touch.endX - this.touch.startX
    this.$refs.barInner.style.width = `${Math.min(width, newWidth)}px`
    return
  }
  touchend(e) {
    //touchend e.touches.length === 0
    const width = this.$refs.bar.offsetWidth
    const dx = this.touch.endX - this.touch.startX
    let newCurrentTime = this.currentTime + (this.totalTime * dx) / width
    newCurrentTime = newCurrentTime >= 0 && newCurrentTime < this.totalTime ? newCurrentTime : 0
    this.$emit("drag-bar", newCurrentTime)
    this.touch.init = false
    return
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.progress-bar
  display flex
  justify-content center
  align-items center

  .ct , .tt
    flex 0
  .bar
    $barHeight = 6px
    $btnHeight = 14px
    width 40%
    height $barHeight
    margin 0 16px
    flex 1
    background-color #000
    border-radius  20px

    .bar-inner
      height 100%
      text-align left
      width 0%
      position relative
      .progress
        display inline-block
        vertical-align top
        background-color $text-highlight-color
        height 100%
        width 100%
        border-radius 20px
      .progress-btn-wrap
        position absolute
        display inline-flex
        justify-content center
        align-items center
        vertical-align  top
        background-color #fff
        width $btnHeight
        height $btnHeight
        margin-top ($btnHeight - $barHeight) * (-0.5)
        margin-left $btnHeight * (-0.5)
        border-radius 100%

        .progress-btn
          width 0.6 * $btnHeight
          height @width
          background-color $text-highlight-color
          border-radius 50%
</style>
