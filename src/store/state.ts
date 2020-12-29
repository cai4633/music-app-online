import { playMode } from "@/common/js/config"
import { json } from "body-parser"
import { loadSearch, PlayedHistory, Favorite } from "common/js/cache"

const sessionDisc = window.sessionStorage.getItem("disc")
const sessionSinger = window.sessionStorage.getItem("singer")
const sessionToplist = window.sessionStorage.getItem("toplist")
const state: any = {
  singer: sessionSinger ? JSON.parse(sessionSinger) : {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequencelist: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: sessionDisc ? JSON.parse(sessionDisc) : {},
  toplist: sessionToplist ? JSON.parse(sessionToplist) : {},
  searchHistory: loadSearch(),
  playHistory: PlayedHistory.loadplay(),
  favorite: Favorite.loadFavorite()
}
export default state
