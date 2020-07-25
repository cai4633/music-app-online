<template>
    <div class="recommend-details">
      <music-list :songs="songs" :title="disc.name" :bgImg="disc.photo" ></music-list>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import MusicList from "@/components/music-list/music-list.vue"
import { createSong } from "common/js/song"
import { Songs } from "common/js/config"
import { getCdInfoById } from "api/recommend.ts"
import { getSongUrl } from "api/songs"
import { ERR_OK } from "api/config"
import { mapGetters } from "vuex"
import { Getter } from "vuex-class"
import { ResponseType, AxiosResponse } from "axios"

@Component({
  components: { MusicList }
})
export default class RecommendDetails extends Vue {
  songs: Songs[] = []

  @Getter("disc") disc!: any

  mounted() {
    if (!this.disc.mid) {
      this.$router.push({ path: "/recommend" })
    }
    this._getCdInfoById(this.disc.mid)
  }
  _getCdInfoById(mid: string) {
    return getCdInfoById(mid).then((response: any) => {
      if (response.code === ERR_OK) {
        const songlist = response.data.songList
        getSongUrl(songlist).then((response: any) => {
          this.songs = response.map((item: any) => {
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
