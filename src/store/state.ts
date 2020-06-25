import { playMode } from "@/common/js/config"
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
}
export default state
