import { playMode } from "@/common/js/config";
import { loadSearch, PlayedHistory } from "common/js/cache";
import { playHistory } from "./getters";

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
  playHistory: PlayedHistory.loadplay()
};
export default state;
