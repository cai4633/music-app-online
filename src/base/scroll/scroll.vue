<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
BScroll.use(MouseWheel);
@Component({})
export default class Scroll extends Vue {
  scroll: any = null;

  @Prop({
    default: null
  })
  private data!: any[];

  @Prop({
    default: 1
  })
  private probeType!: number;

  @Prop({
    default: false
  })
  private pullup!: boolean;

  @Prop({
    default: true
  })
  private click!: boolean;

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  }

  init() {
    const options: object = {
      click: this.click,
      probeType: this.probeType,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    };
    if (this.$refs.scroll) {
      this.scroll = new BScroll(this.$refs.scroll as HTMLElement, options);
      this.bindEvents();
    }
  }

  scrollTo(x: number, y: number, duaring = 300) {
    this.scroll.scrollTo(x, y, duaring);
  }

  bindEvents() {
    this.scroll.on("scroll", (pos: { y: number }) => {
      this.$emit("scroll", pos.y);
    });
    this.scroll.on("scrollEnd", (pos: { y: number }) => {
      this.$emit("scrollEnd", pos.y);
      if (this.pullup && pos.y <= this.scroll.maxScrollY + 10) {
        this.$emit("scrollToEnd");
      }
    });
  }

  refresh() {
    this.scroll && this.scroll.refresh();
  }
  enable() {
    this.scroll && this.scroll.enable();
  }
  disable() {
    this.scroll && this.scroll.disable();
  }
  scrollToElement(el: Element, duration: number) {
    this.scroll && this.scroll.scrollToElement(el, duration);
  }

  @Watch("data")
  getData(newVal: any) {
    this.$nextTick(() => {
      this.refresh();
    });
  }
}
</script>

<style lang="stylus" scoped></style>
