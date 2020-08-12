<template>
  <div class="singer-details">
    <music-list :songs="songs" ref="musicList" :title="singer.name" :bgImg="singer.avatar" ></music-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";
import { getSingerSongs } from "../../api/singer";
import { getSongUrl } from "../../api/songs";
import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import Player from "components/player/player.vue";
import MusicList from "components/music-list/music-list.vue";
import { Getter } from "vuex-class";
@Component({
  components: {
    MusicList,
    Player
  }
})
export default class SingerDetails extends Vue {
  songs = [];

  @Getter("singer") singer!: any;

  mounted() {
    this.$nextTick(() => {
      if (!this.singer.mid) {
        this.$router.push({ path: "/singer" });
      }
      this._getSingerSongs(this.singer.mid);
    });
  }

  normalizeData(data: any) {
    return data.map((item: any) => {
      return createSong(item);
    });
  }

  _getSingerSongs(mid: string) {
    getSingerSongs(mid).then(({ data, code }) => {
      if (code === ERR_OK) {
        this._getSongUrl(data.songList).then((res: any) => {
          this.songs = this.normalizeData(res);
        });
      }
    });
  }
  _getSongUrl(data: any) {
    return getSongUrl(data);
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.singer-details
  background-color $background-color
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  @media screen and (min-width: 720px) {
    left calc(50% - 360px)
    width 720px
  }
  z-index $singer-detail-zindex 
</style>
