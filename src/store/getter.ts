import {State} from './config'

export const singer = (state: State) => state.singer
export const playing = (state: State) => state.playing
export const fullScreen = (state: { fullScreen: boolean }) => state.fullScreen
export const playlist = (state: State) => state.playlist
export const sequencelist = (state: State) => state.sequencelist
export const mode = (state: State) => state.mode
export const currentIndex = (state: State) => state.currentIndex
export const toplist = (state: State) => state.toplist
export const disc = (state: State) => state.disc
export const currentSong = (state: State) => {
  return state.playlist[state.currentIndex] || {}
}
export const searchHistory = (state: State) => state.searchHistory
export const playHistory = (state: State) => state.playHistory

