<template>
  <div class="toplist">
    <music-list
      :bgImg="toplist.picUrl"
      :songs="songs"
      :title="toplist.topTitle"
      :rank="rank"
    ></music-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MusicList from "components/music-list/music-list.vue";
import { getSongsByTopid } from "../../api/rank";
import { ERR_OK } from "../../api/config";
import { Songs } from "common/js/config";
import { createSong } from "common/js/song.ts";
import { getSongUrl } from "../../api/songs";
import { mapGetters, MutationMethod } from "vuex";
import { Getter } from "vuex-class";

@Component({
  components: { MusicList }
})
export default class Toplist extends Vue {
  songs: Songs[] = [];
  rank = true;

  @Getter("toplist") toplist!: any;

  mounted() {
    if (!this.toplist.id) {
      this.$router.push({ path: "/rank" });
    }
    this._getSongsByTopid(this.toplist.id);
  }
  _getSongsByTopid(id: number) {
    return getSongsByTopid(id).then((res: any) => {
      if (res.code === ERR_OK) {
        const ret = res.songlist;
        getSongUrl(ret).then((response: any) => {
          this.songs = response.map((song: any) => {
            return createSong(song);
          });
        });
      }
    });
  }
}
</script>

<style lang="stylus" scoped>
.toplist
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background-color #000
</style>
