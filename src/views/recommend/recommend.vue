<template>
	<div class="recommend">
		<div class="recommend-wrap">
			<div>
				<div class="banner" v-if="slideList.length" ref="banner">
					<slider>
						<li class="swiper-slide" v-for="item in slideList" :key="item.id">
							<a :href="item.linkUrl">
								<img @load="imgLoad" :src="item.picUrl" />
							</a>
						</li>
					</slider>
				</div>
				<div class="descLists" ref="descLists">
					<h2>首发专辑推荐</h2>
					<scroll class="descLists-wrap" :data="albums" ref="recommend">
						<ul class="desc-content">
							<li
								v-for="(album, index) in albums"
								:key="album.id"
								@click="selectItem(album, index)"
							>
								<div class="li-inner">
									<div class="desc-icon">
										<img v-lazy="album.photo" alt="desc-icon" width="60" height="60" />
									</div>
									<div class="text">
										<h3 class="album-name">{{ album.name }}</h3>
										<p class="album-singer">{{ album.singer }}</p>
									</div>
								</div>
							</li>
						</ul>
					</scroll>
					<div class="loading-wrap" v-show="!albums.length">
						<loading></loading>
					</div>
				</div>
			</div>
		</div>
		<transition name="slide-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Mixins } from "vue-property-decorator";
import { getRecommend, getAlbums } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "components/slider/slider.vue";
import Scroll from "base/scroll/scroll.vue";
import Loading from "base/loading/loading.vue";
import { PlaylistMixin } from "common/js/mixins";
import { createAlbum } from "common/js/recommend";
import { Mutation } from "vuex-class";
import { mapGetters, MutationMethod } from "vuex";
import jsonp from "common/js/jsonp";

@Component({
	components: { Slider, Scroll, Loading },
})
export default class Recommend extends Mixins(PlaylistMixin) {
	slideList = [];
	albums: AlbumCls[] = [];
	timer = 0;
	$refs!: {
		recommend: Scroll;
		banner: HTMLElement;
		descLists: HTMLElement;
	};

	@Mutation("SET_DISC") setDisc!: MutationMethod;

	created() {
		this.timer = window.setTimeout(() => {
			this.__getRecommend();
			this.__getDescLists();
		}, 20); //instead of nextTick(),浏览器刷新时间一般是17ms

	}
	mounted() {
		window.onresize = this.descListRefresh; //resize 更新位置
	}

	destroyed() {
		window.clearTimeout(this.timer);
	}

	selectItem(item: AlbumCls, index: string) {
		this.setDisc(item);
		this.$router.push(`/recommend/${item.mid}`);
	}

	handlePlaylist() {
		const BOTTOM = this.playlist.length ? 65 : 0;
		if (this.$refs.recommend) {
			this.$refs.recommend.$el.style.bottom = `${BOTTOM}px`;
			this.$refs.recommend.refresh();
		}
	}
	__getRecommend() {
		getRecommend().then((response: MyResponse): void => {
			this.slideList = response.data.slider;
			this.$nextTick(() => {
				//更新desclists 的top值
				this.descListRefresh();
			});
		});
	}

	__getDescLists() {
		getAlbums().then((res: MyResponse) => {
			if (res.code === ERR_OK && res.new_album) {
				this.albums = res.new_album.data.albums.map((album: AlbumCls) => {
					return createAlbum(album);
				});
			}
		});
	}

	descListRefresh() {
		if (this.$refs.banner) {
			this.$refs.descLists.style.top = `${this.$refs.banner.offsetHeight}px`;
		}
	}

	getListenNum(number: string) {
		return (parseFloat(number) / 10000).toFixed(1);
	}

	imgLoad() {
		this.$refs.recommend.refresh();
	}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl';

.recommend
  content-position()
  // 详情进入动画
  slide-in()

  .recommend-wrap
    height 100%
    box-sizing border-box
    position relative
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
      position absolute
      top 128px
      bottom 0px
      left 0
      right 0
      box-sizing border-box
      h2
        color $text-highlight-color
        font-weight normal
        padding-top 15px
        cursor pointer

      div.descLists-wrap
        position absolute
        top calc(15px + 2em)
        bottom 0
        right 0
        left 0
        overflow hidden
        .desc-content
          li
            font-size 12px
            box-sizing border-box
            padding 10px 25px
            .li-inner
              display flex
              cursor pointer
              .desc-icon
                flex 0 0 auto
                img
                  width 60px
                  display block

              .text
                width 50vw
                display flex
                flex-direction column
                justify-content space-around
                color #fff
                margin-left 20px
                flex 1 0 50vw
                text-align left
                font-size 12px
                padding 2px 0

                .album-name
                  font-size 12px
                  font-weight normal
                  no-wrap()

                .album-singer
                  font-size 12px
                  color #928d8d
                  no-wrap()

      .loading-wrap
        position absolute
        width 100%
        top 60%
        transform translateY(-50%)
        z-index 3
</style>
