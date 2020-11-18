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
  scroll: BScroll | null = null
  timer = 0

  @Prop({
    default: null,
  })
  private data!: any[]

  @Prop({
    default: 1,
  })
  readonly probeType!: number

  @Prop({
    default: false,
  })
  readonly pullup!: boolean

  @Prop({
    default: true,
  })
  readonly click!: boolean

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  }

  init() {
    const options: Partial<BScroll['options']> = {
      click: this.click,
      probeType: this.probeType,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300,
      },
    }
    if (this.$refs.scroll) {
      this.scroll = new BScroll(this.$refs.scroll as HTMLElement, options)
      this.bindEvents()
    }
  }

  scrollTo(x: number, y: number, duaring = 300) {
    if (this.scroll) {
      this.scroll.scrollTo(x, y, duaring)
    }
  }

  bindEvents() {
    if (this.scroll) {
      this.scroll.on("scroll", (pos: { y: number }) => {
        this.$emit("scroll", pos.y)
      })
      this.scroll.on("scrollEnd", (pos: { y: number }) => {
        this.$emit("scrollEnd", pos.y)
        if (this.pullup && pos.y <= (this.scroll as BScroll).maxScrollY + 10) {
          this.$emit("scrollToEnd")
        }
      })
    }
  }

  refresh(delay = 10) {
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      this.scroll && this.scroll.refresh()
    }, delay)
  }

  enable() {
    this.scroll && this.scroll.enable()
  }
  disable() {
    this.scroll && this.scroll.disable()
  }
  stop() {
    this.scroll && this.scroll.stop()
  }
  scrollToElement(el: HTMLElement, duration: number) {
    this.scroll && this.scroll.scrollToElement(el, duration, false, true)
  }

  @Watch("data")
  dataChange() {
    this.refresh()
  }
}
</script>

<style lang="stylus" scoped></style>
