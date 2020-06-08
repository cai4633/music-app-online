import { playMode } from "@/common/js/config"
const state: any = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequencelist: [],
  mode: playMode.loop,
  currentIndex: -1,
}
export default state
