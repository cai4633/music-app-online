interface State {
  singer: any
  playing: boolean
  fullScreen: boolean
  playlist: any[]
  sequencelist: any[]
  mode: number
  currentIndex: number
  disc: any
  toplist: any
  searchHistory: string[]
}

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
