import { Songs } from "./config"
import { insertArray } from "./util"

export function findIndex(newList: any[], song: Songs) {
  return newList.findIndex((item) => item.id === song.id)
}

