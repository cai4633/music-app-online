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
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import MusicList from "components/music-list/music-list.vue"
import { getSongsByTopid } from "../../api/rank"
import { ERR_OK } from "../../api/config"
import { createSong } from "common/js/song"
import { getSongUrl } from "../../api/songs"
import { mapGetters, MutationMethod } from "vuex"
import { Getter } from "vuex-class"

@Component({
  components: { MusicList }
})
export default class Toplist extends Vue {
  songs: Songs[] = []
  rank = true

  @Getter("toplist") toplist!: any

  mounted() {
    if (!this.$route.params.id) {
      this.$router.push({ path: "/rank" })
    }
    this._getSongsByTopid(parseInt(this.$route.params.id))
  }
  _getSongsByTopid(id: number) {
    return getSongsByTopid(id).then((res: MyResponse) => {
      if (res.code === ERR_OK && res.songlist) {
        const ret = res.songlist
        getSongUrl(ret).then((response: any) => {
          this.songs = response.map((song: any) => {
            return createSong(song)
          })
        })
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';
.toplist
  fixed-adapt()
  background-color $background-color
</style>
