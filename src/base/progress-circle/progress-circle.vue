<template>
  <div class="progress-circle">
    <svg :height="radius" :width="radius" viewBox="0 0 40 40">
      <circle
        cx="20"
        cy="20"
        r="17"
        fill="transparent"
        stroke="#777"
        stroke-width="2"
      ></circle>
      <circle
        cx="20"
        cy="20"
        r="17"
        fill="transparent"
        stroke="#ffcd32"
        stroke-width="3"
        :stroke-dashoffset="dashoffset"
        :stroke-dasharray="dasharray"
      ></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class ProgressCircle extends Vue {
  dasharray = Math.PI * 2 * 17;

  @Prop({ default: 0 })
  percent!: number;
  @Prop({ default: 0 })
  radius!: number;

  get dashoffset() {
    return this.dasharray * (1 - this.percent);
  }
}
</script>

<style lang="stylus" scoped>
.progress-circle
  position relative
  svg
    vertical-align top
    circle
      transform-origin center
      transform rotate(-90deg)
</style>
