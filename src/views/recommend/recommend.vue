<template>
  <div class="recommend">
    <scroll class="recommend-wrap" :data="albums" ref="recommend">
      <div>
        <div class="banner" v-if="slideList.length">
          <slider>
            <li class="swiper-slide" v-for="(item, index) in slideList" :key="item.content_id" > <a :href="item.linkUrl" ><img @load="imgLoad" v-lazy="item.picUrl" /></a> </li>
          </slider>
        </div>

        <div class="descLists">
          <h2>首发专辑推荐</h2>
          <ul class="descLists-wrap">
            <li v-for="(album, index) in albums" :key="album.id" @click="selectItem(album, index)" >
              <div class="desc-icon">
                <img v-lazy="album.photo" alt="desc-icon" width="60" height="60" />
              </div>
              <div class="text">
                <h3 class="desc-name">{{ album.name }}</h3>
                <p class="listen-number">{{ album.singer }}</p>
              </div>
            </li>
          </ul>
          <div class="loading-wrap" v-show="!albums.length">
            <loading></loading>
          </div>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Mixins } from "vue-property-decorator"
import { getRecommend, getAlbums } from "api/recommend"
import { ERR_OK } from "api/config"
import Slider from "components/slider/slider.vue"
import Scroll from "base/scroll/scroll.vue"
import Loading from "base/loading/loading.vue"
import { PlaylistMixin } from "common/js/mixins"
import { createAlbum } from "common/js/recommend"
import { Mutation } from "vuex-class"
import { mapGetters, MutationMethod } from "vuex"
import jsonp from "common/js/jsonp"

@Component({
  components: { Slider, Scroll, Loading }
})
export default class Recommend extends Mixins(PlaylistMixin) {
  slideList = []
  albums = []
  timer = 0
  $refs!: {
    recommend: Scroll
  }

  @Mutation("SET_DISC") setDisc!: MutationMethod

  created() {
    this.timer = window.setTimeout(() => {
      this.__getRecommend()
      this.__getDescLists()
    }, 20) //instead of nextTick(),浏览器刷新时间一般是17ms
  }
  destroyed() {
    window.clearTimeout(this.timer)
  }

  selectItem(item: any, index: string) {
    this.setDisc(item)
    this.$router.push({ path: `/recommend/${item.mid}` })
  }
  handlePlaylist() {
    const BOTTOM = this.playlist.length ? 45 : 0
    if (this.$refs.recommend) {
      this.$refs.recommend.$el.style.bottom = `${BOTTOM}px`
      this.$refs.recommend.refresh()
    }
  }
  __getRecommend() {
    getRecommend().then((response: any): void => {
      this.slideList = response.data.slider
    })
  }
  __getDescLists() {
    getAlbums().then((res: any) => {
      if (res.code === ERR_OK) {
        this.albums = res.new_album.data.albums.map((album: any) => {
          return createAlbum(album)
        })
      }
    })
  }
  getListenNum(number: string) {
    return (parseFloat(number) / 10000).toFixed(1)
  }
  imgLoad() {
    this.$refs.recommend.refresh()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.recommend
  overflow hidden
  background-color #272727
  position fixed
  top 81px
  bottom 0px
  width 100%

  .recommend-wrap
    overflow hidden
    position absolute
    top 0
    bottom 0
    right 0
    left 0
    .banner
      position relative
      box-sizing border-box
      width 100%
      a
        display block
        box-sizing border-box
        width 100%
        overflow hidden

        &::after
          content ''
          display block
          position absolute
          top 0
          bottom 0
          left 0
          right 0
          background-color rgba(0, 0, 0, 0.4)
          z-index 0

        img
          width 100%
          display block

    .descLists
      padding-bottom 10px
      h2
        color $text-highlight-color
        font-weight normal
        padding-top 20px

      ul.descLists-wrap
        li
          font-size 12px
          margin 20px 0
          display flex
          box-sizing border-box
          padding 0px 20px

          .desc-icon
            flex 0 0 auto

            img
              width 60px
              display block
              border-radius 50%

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
              font-weight normal

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

      .loading-wrap
        position fixed
        width 100%
        top 60%
        transform translateY(-50%)
        z-index 3
</style>
