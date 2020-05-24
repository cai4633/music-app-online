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
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import getRecommend from "../../api/recommend";
import Slider from "../slider/slider.vue";
@Component({
    components: { Slider }
})
export default class Recommend extends Vue {
    slideList = [];
    created() {
        getRecommend().then(({ err, data }) => {
            this.slideList = data.slider;
            console.log(this.slideList);
        });
    }
}
</script>

<style lang="stylus" scoped>
.banner
    position relative
    box-sizing border-box

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
            width 100vw
            vertical-align top
</style>
