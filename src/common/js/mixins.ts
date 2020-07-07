import { Component, Vue, Mixins, Watch } from "vue-property-decorator"
import { mapGetters, mapMutations } from "vuex"
import { playMode } from "common/js/config"
import { shuffle, lyricParser } from "common/js/util.ts"
import { findIndex } from "common/js/player.ts"
import { extend } from "vue/types/umd"

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
