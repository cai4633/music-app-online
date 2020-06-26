<template>
  <div class="recommend-details">
    <music-list :songs="songs" :title="disc.title" :bgImg="disc.cover"></music-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import MusicList from "@/components/music-list/music-list"
import { mapGetters } from "vuex"
import { getCdInfoById } from "api/recommend.ts"
import { ERR_OK } from "api/config"
import { createSong } from "../../common/js/song"
import { getSongUrl } from "api/songs"
@Component({
  components: { MusicList },
  computed: {
    ...mapGetters(["disc"]),
  },
})
export default class RecommendDetails extends Vue {
  songs = []
  mounted() {
    if (!this.disc.content_id) {
      this.$router.push({ path: "/recommend" })
      return
    }
    this._getCdInfoById(this.disc.content_id)
  }
  _getCdInfoById(id) {
    return getCdInfoById(id).then((response) => {
      if (response.code === ERR_OK) {
        const songlist = response.cdlist[0].songlist
        getSongUrl(songlist).then((response) => {
          this.songs = response.map((item) => {
            return createSong(item)
          })
        })
      }
    })
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
