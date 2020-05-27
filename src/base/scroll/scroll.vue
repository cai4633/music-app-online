<template>
    <div class="scroll" ref="scroll">
        <slot></slot>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BScroll from "@better-scroll/core";
@Component
export default class Scroll extends Vue {
    scroll: object = null;

    @Prop({
        default: () => {
            return [];
        }
    })
    data;

    mounted() {
        this.$nextTick(() => {
            this.__initScroll();
        });
    }

    __initScroll() {
        const options: object = {
            click: true,
            probetype: 1
        };
        if (this.$refs.scroll) {
            this.scroll = new BScroll(".scroll", options);
        }
    }

    refresh() {
        this.scroll && this.scroll.refresh();
    }

    @Watch("data")
    getData() {
        this.$nextTick(() => {
            this.refresh();
        });
    }
}
</script>

<style lang='stylus' scoped></style>