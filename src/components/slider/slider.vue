<template>
  <div class="slider">
    <div class="swiper-wrapper"><slot></slot></div>
    <div class="swiper-pagination"></div>
    <!-- 
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script lang="ts">
import "swiper/js/swiper.js";
import "swiper/css/swiper.min.css";
import Swiper from "swiper";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Slider extends Vue {
  mounted() {
    const mySwiper = new Swiper(".slider", {
      direction: "horizontal",
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 500,
      pagination: {
        el: ".swiper-pagination"
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },

      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar"
      }
    });
  }
}
</script>

<style lang="stylus" scoped>
.slider
    margin auto
    width 100vw
    height 40vw
    position relative
    overflow hidden
    font-size 0px
</style>

<style lang="stylus">
.swiper-pagination-bullet
    background-color #d4d4d4
    opacity 0.5
    &.swiper-pagination-bullet-active
        opacity 1
</style>
