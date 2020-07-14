<template>
  <div class="recommend-details">
    <music-list
      :songs="songs"
      :title="disc.title"
      :bgImg="disc.cover"
    ></music-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MusicList from "@/components/music-list/music-list.vue";
import { createSong } from "common/js/song";
import { Songs } from "common/js/config";
import { getCdInfoById } from "api/recommend.ts";
import { getSongUrl } from "api/songs";
import { ERR_OK } from "api/config";
import { mapGetters } from "vuex";
import { Getter } from "vuex-class";

@Component({
  components: { MusicList }
})
export default class RecommendDetails extends Vue {
  songs: Songs[] = [];

  @Getter("disc") disc!: any;

  mounted() {
    if (!this.disc.content_id) {
      this.$router.push({ path: "/recommend" });
    }
    this._getCdInfoById(this.disc.content_id);
  }
  _getCdInfoById(id: number) {
    return getCdInfoById(id).then((response: any) => {
      if (response.code === ERR_OK) {
        const songlist = response.cdlist[0].songlist;
        getSongUrl(songlist).then((response: any) => {
          this.songs = response.map((item: any) => {
            return createSong(item);
          });
        });
      }
    });
  }
}
</script>

<style lang="stylus" scoped>
.recommend-details
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background-color #000
  color #FFF
  z-index 200
</style>
