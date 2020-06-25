<template>
  <div class="toplist">
    <music-list :bgImg="toplist.picUrl" :songs="songs" :title="toplist.topTitle"></music-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapGetters } from "vuex"
import MusicList from "components/music-list/music-list.vue"
import { toplist } from "../../store/getter"
import { getSongsByTopid } from "../../api/rank"
import { ERR_OK } from "../../api/config"
import { createSong } from "common/js/song.js"
import { getSongUrl } from "../../api/songs"
@Component({
  components: { MusicList },
  computed: {
    ...mapGetters(["toplist"]),
  },
})
export default class Toplist extends Vue {
  songs = []
  mounted() {
    if (!this.toplist.id) {
      this.$router.push({ path: "/rank" })
    }
    this._getSongsByTopid(this.toplist.id)
  }
  _getSongsByTopid(id) {
    return getSongsByTopid(id).then((res) => {
      if (res.code === ERR_OK) {
        const ret = res.songlist
        getSongUrl(ret).then((response) => {
          this.songs = response.map((song) => {
            return createSong(song)
          })
        })
      }
    })
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
