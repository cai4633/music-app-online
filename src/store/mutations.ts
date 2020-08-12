import * as types from "./mutation-types";
import { State } from "./config";

const mutations = {
  [types.SET_SINGER](state: any, singer: any) {
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE](state: any, flag: boolean) {
    state.playing = flag;
  },
  [types.SET_FULLSCREEN](state: any, flag: boolean) {
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state: any, list: any) {
    state.playlist = list;
  },
  [types.SET_SEQUENCELIST](state: any, list: any) {
    state.sequencelist = list;
  },
  [types.SET_MODE](state: any, mode: number) {
    state.mode = mode;
  },
  [types.SET_CURRENTINDEX](state: any, index: number) {
    state.currentIndex = index;
  },
  [types.SET_DISC](state: any, cd: any) {
    state.disc = cd;
  },
  [types.SET_TOPLIST](state: any, toplist: any) {
    state.toplist = toplist;
  },
  [types.SET_SEARCH_HISTORY](state: State, list: string[]) {
    state.searchHistory = list;
  },
  [types.SET_PLAY_HISTORY](state: State, list: Songs[]) {
    state.playHistory = list;
  },
  [types.SET_FAVORITE](state: State, list: Songs[]) {
    state.favorite = list;
  },
};

export default mutations;
