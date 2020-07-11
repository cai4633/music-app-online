<template>
  <transition name='top-slide'>
    <div class="top-tip" v-show="showflag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
@Component()
export default class TopTip extends Vue {
  showflag = false
  timer = 0
  show(){
    this.showflag = true
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.hide()
    }, 1000);
  }
  hide(){
    this.showflag = false
  }
}
</script>

<style lang="stylus" scoped>
.top-slide-enter-active, .top-slide-leave-active
  transition all .4s
.top-slide-enter, .top-slide-leave-to
  transform translateY(-100%)

.top-tip
  position fixed
  z-index $toptip-zindex
  top 0
  left 0
  right 0
</style>
