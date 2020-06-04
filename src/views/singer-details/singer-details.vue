<template>
  <div class="singer-details">
    <music-list :songs="songs" ref="musicList" :title="singer.singer_name" :bgImg="bgImg"></music-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapGetters } from "vuex"
import { getSingerSongs } from "../../api/singer"
import { getSongUrl } from "../../api/songs"
import { ERR_OK } from "api/config"
import { createSong } from "common/js/song"

import MusicList from "components/music-list/music-list"
@Component({
  components: {
    MusicList,
  },
  computed: {
    ...mapGetters(["singer"]),
    bgImg() {
      return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.singer_mid}.jpg?max_age=2592000`
    },
  },
})
export default class SingerDetails extends Vue {
  songs = []

  mounted() {
    this.$nextTick(() => {
      if (!this.singer.singer_mid) {
        this.$router.push({ path: "/singer" })
      }
      this._getSingerSongs(this.singer.singer_mid)
    })
  }

  normalizeData(data) {
    return data.map((item) => {
      return createSong(item)
    })
  }
  _getSingerSongs(mid) {
    getSingerSongs(mid).then(({ data, code }) => {
      if (code === ERR_OK) {
        this._getSongUrl(data.songList).then((res) => {
          this.songs = this.normalizeData(res)
          console.log(this.songs);
          
        })
      }
    })
  }
  _getSongUrl(data) {
    return getSongUrl(data)
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.come-enter,.come-leave-to
  transform translateX(-100%)
.come-enter-to,.come-leave
  transform translateX(0)
.come-enter-active,.come-leave-active
  transition all 0.5s

.singer-details
  background-color $background-color
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 20
</style>
