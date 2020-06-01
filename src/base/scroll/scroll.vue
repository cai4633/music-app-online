<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import BScroll from "@better-scroll/core"
import MouseWheel from "@better-scroll/mouse-wheel"
BScroll.use(MouseWheel)
@Component({})
export default class Scroll extends Vue {
  scroll: any = null

  @Prop({
    default: null,
  })
  private data!: any[]

  @Prop({
    default: 1,
  })
  private probeType!: number

  @Prop({
    default: true,
  })
  private click!: boolean

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  }

  init() {
    const options: object = {
      click: this.click,
      probeType: 3,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300,
      },
    }
    if (this.$refs.scroll) {
      this.scroll = new BScroll(this.$refs.scroll, options)
      this.bindEvents()
    }
  }

  scrollTo(x: number, y: number) {
    this.scroll.scrollTo(x, y, 300)
  }

  bindEvents() {
    this.scroll.on("scroll", (pos: { y: number }) => {
      this.$emit("scroll", pos.y)
    })
    this.scroll.on("scrollEnd", (pos: { y: number }) => {
      this.$emit("scrollEnd", pos.y)
    })
  }
  refresh() {
    this.scroll && this.scroll.refresh()
  }

  @Watch("data")
  getData() {
    this.$nextTick(() => {
      this.refresh()
    })
  }
}
</script>

<style lang="stylus" scoped></style>
