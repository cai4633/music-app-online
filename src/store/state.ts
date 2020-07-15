import { playMode } from "@/common/js/config"
import { loadSearch, PlayedHistory, Favorite } from "common/js/cache"

const state: any = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequencelist: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  toplist: {},
  searchHistory: loadSearch(),
  playHistory: PlayedHistory.loadplay(),
  favorite: Favorite.loadFavorite(),
}
export default state
