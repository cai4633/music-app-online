interface State {
  singer: string
  playing: boolean
  fullScreen: boolean
  playlist: any[]
  squencelist: any[]
  mode: number
  currentIndex: number
}

export const singer = (state: State) => state.singer
export const playing = (state: State) => state.playing
export const fullScreen = (state: { fullScreen: boolean }) => state.fullScreen
export const playlist = (state: State) => state.playlist
export const squencelist = (state: State) => state.squencelist
export const mode = (state: State) => state.mode
export const currentIndex = (state: State) => state.currentIndex
export const currentSong = (state: State) => {
  return state.playlist[state.currentIndex] || {}
}
