<template>
    <div class="m-header">
        <div class="banner">
            <img src="../../common/images/default.png" alt="banner" /><span
                >Music APP</span
            >
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class MHeader extends Vue {}
</script>
    
<style lang="stylus">
div.m-header
    .banner
        display flex
        justify-content center
        align-items center
        background-color #272727

        img
            width 40px
            padding 1em 0
            vertical-align top

        span
            color rgb(157, 138, 77)
            font-family 'Helvetica Neue', Helvetica, Arial
            margin-left 0.5em
            font-size 1.3em
</style>