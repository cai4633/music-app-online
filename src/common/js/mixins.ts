import { Component, Vue, Mixins, Watch } from "vue-property-decorator"
import { mapGetters, mapMutations, mapActions } from "vuex"
import { playMode } from "common/js/config"
import { shuffle, lyricParser } from "common/js/util.ts"
import { findIndex } from "common/js/player.ts"
import { extend } from "vue/types/umd"
import Singer from "common/js/singer"
const TYPE_SINGER = "singer"

export const PlayerMixin = Vue.extend({
  computed: {
    ...mapGetters(["playlist", "fullScreen", "playing", "currentSong", "currentIndex", "mode", "sequencelist"]),
  },

  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENTINDEX",
      setMode: "SET_MODE",
      setPlaylist: "SET_PLAYLIST",
    }),
    toggleMode() {
      this.setMode((this.mode + 1) % 3)
      const originList = JSON.parse(JSON.stringify(this.sequencelist))
      const newList = this.mode === playMode.random ? shuffle(originList) : originList
      const index = findIndex(newList, this.currentSong)
      this.setPlaylist(newList)
      this.setCurrentIndex(index)
    },
  },
})

export const PlaylistMixin = Vue.extend({
  computed: {
    ...mapGetters(["playlist", "fullScreen", "playing"]),
  },
  mounted() {
    this.handlePlaylist()
  },

  activated() {
    this.handlePlaylist()
  },

  methods: {
    handlePlaylist() {
      throw new Error("It must implement handlePlaylist method")
    },
  },

  watch: {
    playlist(newVal) {
      this.handlePlaylist()
    },
  },
})

export const SearchMixin = Vue.extend({
  data() {
    return {
      query: "",
    }
  },
  computed: {
    ...mapGetters(["searchHistory", "playlist"]),
  },
  methods: {
    ...mapMutations({ setSinger: "SET_SINGER" }),
    ...mapActions(["suggestToPlay", "saveSearchHistory", "removeSearchHistory", "clearSearchHistory"]),

    onQueryChange(newQuery: string) {
      this.query = newQuery
    },
    onSelectEvent(item: any) {
      this.gotoMusic(item)
      this.saveSearchHistory(this.query)
      this.hide()
      this.$emit("hide", item)
    },
    selectItem(key: string) {
      // this.$refs.searchBox.setQuery(key)
      throw new Error("It must be implement selectItem method")
    },
    hide() {
      return
    },
    gotoMusic(item: any) {
      if (item.type === TYPE_SINGER) {
        this.setSinger(new Singer({ id: item.singerid, name: item.singername, mid: item.singermid }))
        this.$router.push({ path: `/search/${item.singermid}` })
      } else {
        this.suggestToPlay(item)
      }
    },
  },
})
