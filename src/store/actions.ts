import * as types from "./mutation-types"
import { playMode } from "@/common/js/config"

function shuffle(list: string[]) {
  return list
}

export const selectPlay = ({ commit, state }: any, { list, index }: any) => {
  commit(types.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYIGG_STATE, true)
}
