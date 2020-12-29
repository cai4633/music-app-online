<template>
	<div class="recommend-details">
		<music-list :songs="songs" :title="disc.name" :bgImg="disc.photo"></music-list>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MusicList from "@/components/music-list/music-list.vue";
import { createSong } from "common/js/song";
import { getCdInfoById } from "api/recommend.ts";
import { getSongUrl } from "api/songs";
import { ERR_OK } from "api/config";
import { mapGetters } from "vuex";
import { Getter } from "vuex-class";
import { ResponseType, AxiosResponse } from "axios";

@Component({
	components: { MusicList },
})
export default class RecommendDetails extends Vue {
	songs: Songs[] = [];
	@Getter("disc") disc!: AlbumCls;

	created() {
		if (!this.$route.params.mid) {
			this.$router.push({ path: "/recommend" });
		}
		this._getCdInfoById(this.$route.params.mid);
	}
	_getCdInfoById(mid: string) {
		return getCdInfoById(mid).then((response: MyResponse) => {
			if (response.code === ERR_OK) {
				const songlist = response.data.songList;
				getSongUrl(songlist).then((response?: any[]) => {
					if (response) {
						this.songs = response.map((item: any) => {
							return createSong(item);
						});
					}
				});
			}
		});
	}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.recommend-details
  fixed-adapt()
  background-color $background-color
  color $text-color
  z-index $recommend-detail-zindex
</style>
