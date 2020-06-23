import { Component, Vue, Watch } from "vue-property-decorator"
import { mapGetters } from "vuex"

@Component({
  computed: {
    ...mapGetters(["playlist"]),
  },
})
export class PlaylistMixin extends Vue {
  mounted() {
    this.handlePlaylist()
  }
  activated() {
    this.handlePlaylist()
  }
  handlePlaylist() {
    throw new Error("It must implement handlePlaylist method")
  }
  @Watch("playlist")
  watchPlaylist() {
    this.handlePlaylist()
  }
}
