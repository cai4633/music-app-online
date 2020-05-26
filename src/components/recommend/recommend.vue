<template>
    <div class="recommend">
        <div class="banner" v-if="slideList.length">
            <slider>
                <div
                    class="swiper-slide"
                    v-for="(item, index) in slideList"
                    :key="'slider' + index"
                >
                    <a :href="item.linkUrl"><img :src="item.picUrl" alt=""/></a>
                </div>
            </slider>
        </div>
        <div class="descLists">
            <h2>热门歌单推荐</h2>
            <ul class="descLists-wrap">
                <li v-for="desc in descList" :key="desc.contend_id">
                    <div class="icon">
                        <img
                            :src="desc.cover"
                            alt="icon"
                            width="60"
                            height="60"
                        />
                    </div>
                    <div class="text">
                        <h3 class="desc-name">{{ desc.title }}</h3>
                        <p class="listen-number">
                            播放量：{{ getListenNum(desc.listen_num) }}万
                     
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { getRecommend, getDescLists } from "../../api/recommend";
import { ERR_OK } from "../../api/config";
import Slider from "../slider/slider.vue";
@Component({
    components: { Slider }
})
export default class Recommend extends Vue {
    slideList = [];
    descList = [];
    timer = 0;
    created() {
        this.timer = setTimeout(() => {
            this.__getRecommend();
            this.__getDescLists();
        }, 20); //instead of nextTick(),浏览器刷新时间一般是17ms
    }
    destroyed() {
        window.clearTimeout(this.timer);
    }

    __getRecommend() {
        getRecommend().then(({ err, data }) => {
            this.slideList = data.slider;
        });
    }
    __getDescLists() {
        getDescLists().then(res => {
            if (res.code === ERR_OK) {
                console.dir(res["recomPlaylist"].data.v_hot);
                this.descList = Array.from(res["recomPlaylist"].data.v_hot);
            }
        });
    }
    getListenNum(number: string) {
        return (parseFloat(number) / 10000).toFixed(1);
    }
}
</script>

<style lang="stylus" scoped>
.banner
    position relative
    box-sizing border-box
    width 100%

    a
        display block
        box-sizing border-box

        &::after
            content ''
            display block
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            background-color rgba(0, 0, 0, 0.4)

        img
            width 100%
            vertical-align top

.descLists
    background-color #272727

    h2
        color rgb(157, 138, 77)

    ul.descLists-wrap
        li
            font-size 12px
            margin 20px 0
            display flex
            box-sizing border-box
            padding 0px 20px

            .icon
                flex 0 0 auto

                img
                    width 60px
                    display block

            .text
                width 50vw
                display flex
                flex-direction column
                justify-content space-between
                color #fff
                margin-left 20px
                flex 1 0 50vw
                text-align left
                font-size 12px
                padding 2px 0

                .desc-name
                    font-size 12px

                .listen-number
                    font-size 12px
                    color #928d8d
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 2
                    line-height 1.2
                    height 2.4em
                    text-overflow ellipsis
                    overflow hidden
</style>
