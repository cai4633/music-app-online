<template>
	<div class="go-back">
		<icon-svg icon="#el-icon-back" class="back"></icon-svg>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import IconSvg from "base/icon-svg/icon-svg.vue";
@Component({
	components: {
		IconSvg,
	},
})
export default class GoBack extends Vue {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
.go-back
  cursor pointer
  svg
    width 20px
    height @width
    fill $text-highlight-color
    padding 5px
</style>
