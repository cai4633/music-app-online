<template>
  <div class="tab">
    <ul>
      <router-link v-for="item in items" :key="item.id" :to="item.path" tag="li" :class="item.class" ><span>{{ item.content }}</span></router-link >
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class Tab extends Vue {
  items = [
    { id: "nav-1", content: "推荐", path: "/recommend", class: "" },
    { id: "nav-2", content: "歌手", path: "/singer", class: "" },
    { id: "nav-3", content: "排行", path: "/rank", class: "" },
    { id: "nav-4", content: "搜索", path: "/search", class: "" }
  ];
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
div.tab
    height 35px
    flex 0 0 auto
    color $text-color
    background-color $background-color
    ul
        display flex
        li
            flex 1
            background-color $background-color
            box-sizing border-box
            height 2.5em
            line-height @height
            vertical-align top
            span
              position relative
              color $text-color
              display inline-flex
            &.router-link-active
                span
                  color $text-highlight-color
                  &::after
                      position absolute
                      bottom 0.3em
                      left 0
                      content ''
                      display inline-block
                      width 100%
                      border-bottom 2px solid $text-highlight-color
</style>
