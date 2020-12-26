<template>
	<div class="list-view" ref="listView">
		<scroll
			class="singer-wrap"
			:data="singerlist"
			:probeType="3"
			@scroll="getPosY"
			ref="singerWrap"
			@scrollEnd="scrollEnd"
		>
			<ul class="singer-content">
				<li v-for="item in singerlist" :key="item.id" ref="listgroup">
					<ul class="singer-inner">
						<h3 ref="title">{{ item.title }}</h3>
						<li
							v-for="singer in item.items"
							:key="singer.id"
							class="clearfix"
							@click="selectItem(singer)"
						>
							<div class="avatar">
								<img v-lazy="webp2jpg(singer.singer_pic)" />
							</div>
							<p class="name">{{ singer.singer_name }}</p>
						</li>
					</ul>
				</li>
			</ul>
		</scroll>
		<h2 class="fixed-title" ref="fixed">{{ titleList[currentIndex] }}</h2>
		<div class="loading-wrap" v-show="!singerlist.length">
			<loading></loading>
		</div>
		<div class="list-shortcut">
			<ul>
				<li
					v-for="(item, index) in shotcutList"
					:key="item"
					:class="{ active: currentIndex === index }"
					:data-index="index"
					@click="shortcutClick"
				>
					{{ item }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import Scroll from "base/scroll/scroll.vue";
import Loading from "base/loading/loading.vue";
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { PlaylistMixin } from "common/js/mixins";
import Singer from "common/js/singer";
@Component({
	components: { Scroll, Loading },
	computed: {
		...mapGetters(["playlist", "fullScreen"]),
	},
})
export default class ListView extends Mixins(PlaylistMixin) {
	shotcutList: string[] = [];
	heightlist: any[] = [];
	titleList: string[] = [];
	currentIndex = 0;
	titleHeight = 0;
	isClick = false;
	$refs!: {
		listView: HTMLElement;
		singerWrap: Scroll;
		fixed: HTMLElement;
		listgroup: Element[];
		title: HTMLElement[];
	};

	@Prop()
	readonly singerlist!: object[];

	mounted() {
		this.$nextTick(() => {
			this.init();
		});
	}

	deactivated() {
		this.$nextTick(() => {
			this.$refs.singerWrap.disable();
		});
	}
	activated() {
		this.$nextTick(() => {
			this.$refs.singerWrap.enable();
		});
	}

	handlePlaylist() {
		const BOTTOM = this.playlist.length ? 45 : 0;
		if (this.$refs.singerWrap) {
			this.$refs.listView.style.bottom = `${BOTTOM}px`;
			this.$refs.singerWrap.refresh();
		}
	}

	init() {
		this.calHeight();
		this._getShortcutList();
	}

	webp2jpg(img: string) {
		return img.replace(/webp$/, "jpg");
	}
	scrollEnd() {
		this.isClick = false;
	}
	shortcutClick(e: MouseEvent) {
		const index = (e.currentTarget as HTMLElement).dataset.index;
		if (index) {
			this.currentIndex = parseInt(index);
			this._scrollTo(this.currentIndex);
			this.isClick = true;
		}
	}

	// 计算热门,[a-z] li的高度
	calHeight() {
		this.$nextTick(() => {
			const listgroup = this.$refs.listgroup || [];
			let height = 0;
			if (listgroup.length) {
				this.titleHeight = this.$refs.title[0].offsetHeight;
				this.heightlist = Array.prototype.map.call(
					listgroup,
					(li: { [key: string]: number }): number => {
						height += li.offsetHeight;
						return height;
					}
				);
			}
		});
	}

	_scrollTo(index: number) {
		if (this.heightlist.length) {
			const y: number = index >= 1 ? -this.heightlist[index - 1] : 0;
			this.$refs.singerWrap.scrollTo(0, y);
		}
	}

	//滚动事件
	getPosY(y: number) {
		if (this.heightlist.length && !this.isClick) {
			for (let i = 0; i < this.heightlist.length; i++) {
				if (this.heightlist[i] >= -y) {
					this.currentIndex = i;
					break;
				}
			}
		}
		this.diff(y);
	}

	//fixed bar 滚动切换效果
	diff(y: number) {
		let distance = this.heightlist.length
			? this.heightlist[this.currentIndex] + y - this.titleHeight
			: 0;
		distance = distance > 0 ? 0 : distance;
		this.fixedTransfrom(distance);
	}

	fixedTransfrom(distance: number) {
		this.$refs.fixed.style.transform = `translateY(${distance}px)`;
	}

	//获取list-shortcut的content
	_getShortcutList() {
		this.singerlist.forEach((item: any) => {
			this.shotcutList.push(item.title[0]);
			this.titleList.push(item.title);
		});
	}

	selectItem(item: any) {
		const singer = new Singer({
			id: item.singer_id,
			name: item.singer_name,
			mid: item.singer_mid,
		});
		this.$emit("select", singer);
	}

	@Watch("singerlist")
	watchSingerlist() {
		this.init();
	}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

header-style()
  text-align left
  padding-left 20px
  font-weight normal
  line-height 2.5
  height 2.5em
  font-size 12px
  background-color #333
  text-transform uppercase

.list-view
  background-color $background-color
  color $text-color
  overflow hidden
  position absolute
  top 0
  bottom 0
  left 0
  right 0

  h2.fixed-title
    header-style()
    position absolute
    top 0px
    width 100%
    left 0
    z-index 6

  .singer-wrap
    padding-bottom 1px
    overflow hidden
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    ul.singer-content
      li
        padding-bottom 18px
        ul.singer-inner
          h3
            header-style()
          li
            $line-height = 50px
            padding 20px 0 0px 30px
            .avatar
              cursor pointer
              float left
              img
                width $line-height
                height $line-height
                display block
                border-radius 50%

            .name
              cursor pointer
              padding-left 70px
              text-align left
              line-height $line-height


  .list-shortcut
    position absolute
    top 50%
    transform translateY(-50%)
    right 8px
    color red
    z-index $list-shortcut-zindex
    font-size 12px
    ul
      background-color darken($background-color, 70%)
      padding 10px 2px
      border-radius 2em

      li
        color $text-color
        font-size 12px
        line-height 1.2
        vertical-align top
        cursor pointer
        padding 2px
        text-transform uppercase
        &.active
          color $text-highlight-color

.loading-wrap
  position absolute
  width 100%
  top 50%
  transform translateY(-50%)
  z-index 3
</style>
