<template>
  <svg class="icon icon-svg" aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class IconSvg extends Vue {
  @Prop()
  icon!: string;
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/font.styl';
</style>
