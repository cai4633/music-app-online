import * as types from "./mutation-types"
import { playMode, Songs } from "@/common/js/config"
import { shuffle } from "@/common/js/util.ts"
import { findIndex, removeSong } from "@/common/js/player.ts"
import { saveSearch, removeSearch, clearSearch } from "common/js/cache"
import { State } from "./config"

export const selectPlay = ({ commit, state }: any, { list, index }: any) => {
  commit(types.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    index = findIndex(randomList, list[index])
    list = randomList
  }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const clearSongList = ({ commit, state }: any) => {
  commit(types.SET_PLAYING_STATE, false)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCELIST, [])
  commit(types.SET_CURRENTINDEX, -1)
}

export const randomPlay = ({ commit }: any, { list }: any) => {
  commit()
}
export const suggestToPlay = ({ commit, state }: any, song: any) => {
  const playlist = state.playlist.slice()
  const sequencelist = state.sequencelist.slice()
  playlist.splice(Math.max(0, state.currentIndex), 0, song)
  const index = findIndex(playlist, song)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_CURRENTINDEX, index)
}

export const saveSearchHistory = ({ commit, state }: any, query: string) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const removeSearchHistory = ({ commit, state }: any, query: string) => {
  commit(types.SET_SEARCH_HISTORY, removeSearch(query))
}

export const clearSearchHistory = ({ commit, state }: any) => {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const removeSongFromList = ({ commit, state }: any, song: Songs) => {
  const { list: sequencelist, flag } = removeSong(state.sequencelist, song)
  const playlist = removeSong(state.playlist, song).list
  const index = flag ? state.currentIndex - 1 : state.currentIndex

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCELIST, sequencelist)
  commit(types.SET_CURRENTINDEX, index)
  return
}
