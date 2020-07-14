<template>
  <div class="search-box">
    <i class="icon-search">
      <icon-svg icon="#el-icon-search"></icon-svg>
    </i>
    <input v-model="query" type="text" :placeholder="placeholder" />
    <i class="icon-clear" v-show="query" @click="clearQuery">
      <icon-svg icon="#el-icon-clear"></icon-svg>
    </i>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import IconSvg from "base/icon-svg/icon-svg.vue";
import { debounce } from "common/js/util";
@Component({
  components: { IconSvg }
})
export default class SearchBox extends Vue {
  query = "";

  @Prop({ default: "搜索歌曲、歌手" })
  private placeholder!: string;

  created() {
    this.$watch(
      "query",
      debounce((newQuery: string) => {
        this.$emit("query", newQuery);
      }, 200)
    );
  }
  clearQuery() {
    this.query = "";
  }
  setQuery(newQuery: string) {
    this.query = newQuery;
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.search-box
  position relative
  background-color $background-color-l
  border-radius 10px
  padding 8px 12px
  $left = 16px
  .icon-search
    position-center(absolute,y)
    left $left
    svg
      width 16px
      height @width
      fill $text-dark-color
  .icon-clear
    position-center(absolute,y)
    right $left
    svg
      fill $text-dark-color

  input[type='text']
    background-color $background-color-l
    display block
    height 1.8em
    line-height @height
    box-sizing border-box
    width 100%
    padding 0px 22px
    margin 0
    color #fff
    border 2px solid transparent
    outline none
    &:focus
      border 2px solid $theme-dark-yellow
      border-radius 5px
</style>
