import * as types from "./mutation-types";
import { playMode, Songs } from "@/common/js/config";
import { shuffle } from "@/common/js/util.ts";
import { findIndex } from "@/common/js/player.ts";
import {
  saveSearch,
  removeSearch,
  clearSearch,
  PlayedHistory
} from "common/js/cache";
import { State } from "./config";

export const selectPlay = ({ commit, state }: any, { list, index }: any) => {
  commit(types.SET_SEQUENCELIST, list);
  if (state.mode === playMode.random) {
    const randomList = shuffle(list);
    index = findIndex(randomList, list[index]);
    list = randomList;
  }
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_CURRENTINDEX, index);
  commit(types.SET_FULLSCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const clearSongList = ({ commit, state }: any) => {
  commit(types.SET_PLAYING_STATE, false);
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_SEQUENCELIST, []);
  commit(types.SET_CURRENTINDEX, -1);
};

export const randomPlay = ({ commit }: any, list: any) => {
  const randomList = shuffle(list);

  commit(types.SET_MODE, playMode.random);
  commit(types.SET_SEQUENCELIST, list);
  commit(types.SET_PLAYLIST, randomList);
  commit(types.SET_CURRENTINDEX, 0);
  commit(types.SET_FULLSCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

//工具函数
const insert = (
  playlist: any[],
  sequencelist: any[],
  currentIndex: number,
  song: Songs
) => {
  const plist = playlist.slice();
  const slist = sequencelist.slice();
  const currentSong = plist[currentIndex];
  const index = findIndex(plist, song);
  if (index === -1) {
    //列表没有新添加歌曲
    plist.splice(currentIndex + 1, 0, song);
    slist.splice(findIndex(slist, currentSong) + 1, 0, song);
  }
  return { plist, slist };
};

export const insertSong = ({ commit, state }: any, song: Songs) => {
  const { plist, slist } = insert(
    state.playlist,
    state.sequencelist,
    state.currentIndex,
    song
  );
  const index = findIndex(plist, state.playlist[state.currentIndex]);
  commit(types.SET_PLAYLIST, plist);
  commit(types.SET_SEQUENCELIST, slist);
  commit(types.SET_CURRENTINDEX, index);
};

export const suggestToPlay = ({ commit, state }: any, song: Songs) => {
  const { plist, slist } = insert(
    state.playlist,
    state.sequencelist,
    state.currentIndex,
    song
  );
  const index = findIndex(plist, song);
  commit(types.SET_PLAYLIST, plist);
  commit(types.SET_SEQUENCELIST, slist);
  commit(types.SET_CURRENTINDEX, index);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULLSCREEN, true);
};

export const saveSearchHistory = ({ commit, state }: any, query: string) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query));
};

export const removeSearchHistory = ({ commit, state }: any, query: string) => {
  commit(types.SET_SEARCH_HISTORY, removeSearch(query));
};

export const clearSearchHistory = ({ commit, state }: any) => {
  commit(types.SET_SEARCH_HISTORY, clearSearch());
};

export const removeSongFromList = ({ commit, state }: any, song: Songs) => {
  const playlist = state.playlist.slice();
  const sequencelist = state.sequencelist.slice();
  const pIndex = findIndex(playlist, song);
  const sIndex = findIndex(sequencelist, song);
  let cIndex = state.currentIndex;
  if ((pIndex < cIndex && cIndex > 0) || cIndex === playlist.length - 1) {
    //处理边界情况
    cIndex--;
  }
  playlist.splice(pIndex, 1);
  sequencelist.splice(sIndex, 1);
  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCELIST, sequencelist);
  commit(types.SET_CURRENTINDEX, cIndex);
  commit(types.SET_PLAYING_STATE, !!playlist.length);
};

export const savePlayHistory = ({ commit, state }: any, song: Songs) => {
  commit(types.SET_PLAY_HISTORY, PlayedHistory.savePlay(song));
};
