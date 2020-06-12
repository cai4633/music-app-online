import * as types from "./mutation-types"

const mutations = {
  [types.SET_SINGER](state: any, singer: any) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state: any, flag: boolean) {
    state.playing = flag
  },
  [types.SET_FULLSCREEN](state: any, flag: boolean) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state: any, list: any) {
    state.playlist = list
  },
  [types.SET_SEQUENCELIST](state: any, list: any) {
    state.sequencelist = list
  },
  [types.SET_MODE](state: any, mode: number) {
    state.mode = mode
  },
  [types.SET_CURRENTINDEX](state: any, index: number) {
    state.currentIndex = index
  },
}

export default mutations