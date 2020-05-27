<template>
  <div class="loading">
    <img src="./loading.gif" alt="loading" width="24" height="24" />
    <p class="desc">正在加载...</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class Loading extends Vue {}
</script>

<style lang="stylus" scoped>
.loading
    width 100%
    text-align center
    img
        display inline-block
        vertical-align top
        text-align center
    p
        margin-top 5px
        font-size 12px
        color #fff
</style>
