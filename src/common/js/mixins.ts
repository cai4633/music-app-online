import { Component, Vue, Mixins, Watch } from "vue-property-decorator"
import { mapGetters, mapMutations, mapActions } from "vuex"
import { playMode, Songs } from "common/js/config"
import { shuffle, lyricParser } from "common/js/util.ts"
import { findIndex } from "common/js/player.ts"
import Singer from "common/js/singer"
const TYPE_SINGER = "singer"

export const PlayerMixin = Vue.extend({
  computed: {
    ...mapGetters(["playlist", "fullScreen", "playing", "currentSong", "currentIndex", "mode", "sequencelist", "favorite"]),
  },

  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENTINDEX",
      setMode: "SET_MODE",
      setPlaylist: "SET_PLAYLIST",
    }),

    ...mapActions(["saveFavoriteList", "deleteFromFavoriteList"]),
    toggleMode() {
      this.setMode((this.mode + 1) % 3)
      const originList = this.sequencelist.slice()
      const newList = this.mode === playMode.random ? shuffle(originList) : originList
      const index = findIndex(newList, this.currentSong)
      this.setPlaylist(newList)
      this.setCurrentIndex(index)
    },
    toggleFavorite(song: Songs) {
      if (this.isFavorite(song)) {
        this.deleteFromFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getIcon(song: Songs): string {
      return this.isFavorite(song) ? "#el-icon-favorite-red" : "#el-icon-favorites"
    },

    isFavorite(song: Songs) {
      return findIndex(this.favorite.slice(), song) > -1
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
      console.log("It must implement handlePlaylist method")
    },
  },

  watch: {
    playlist() {
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
    ...mapGetters(["searchHistory", "playlist", "playHistory"]),
  },
  methods: {
    ...mapMutations({ setSinger: "SET_SINGER" }),
    ...mapActions(["suggestToPlay", "saveSearchHistory", "removeSearchHistory", "clearSearchHistory", "insertSong"]),
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
      console.log("It must be implement selectItem method")
    },
    hide() {
      return
    },
    gotoMusic(item: any) {
      if (item.type === TYPE_SINGER) {
        this.setSinger(
          new Singer({
            id: item.singerid,
            name: item.singername,
            mid: item.singermid,
          })
        )
        this.$router.push({ path: `/search/${item.singermid}` })
      } else {
        this.suggestToPlay(item)
      }
    },
  },
})
