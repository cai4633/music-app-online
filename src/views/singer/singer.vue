<template>
    <scroll class="singer" :data='singerlist'>
        <div class="singer-content">
            <h2>热门</h2>
            <ul class="singer-content">
                <li v-for="item in singerlist" :key="item.id" class="clearfix">
                    <div class="avatar">
                        <img :src="item.singer_pic" alt="" />
                    </div>
                    <p class="name">{{ item.singer_name }}</p>
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getSingerLists } from "../../api/singer";
import { ERR_OK } from "api/config";
import Scroll from "base/scroll/scroll.vue";
@Component({
    components: { Scroll }
})
export default class Singer extends Vue {
    items = [
        {
            avatar:
                "https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000",
            name: "薛之谦"
        }
    ];
    singerlist = [];
    mounted() {
        this.$nextTick(() => {
            this.__getSingerLists();
        });
    }

    __getSingerLists() {
        getSingerLists().then(response => {
            if (response.code === ERR_OK) {
                this.singerlist = response.data.singerlist;
            }
        });
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.singer
    background-color $background-color
    height 100vh
    flex 1 1 auto
    overflow hidden
    color rgba(255, 255, 255, 0.5)

    h2
        text-align left
        padding-left 20px
        font-weight normal
        line-height 2.5
        height 2.5em
        font-size 12px
        background-color #333

    ul.singer-content
        li
            $line-height = 50px
            padding-left 30px
            padding-top 20px

            .avatar
                float left

                img
                    width $line-height
                    height $line-height
                    display block
                    border-radius 50%

            .name
                padding-left 70px
                text-align left
                line-height $line-height
</style>
