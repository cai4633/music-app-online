import { Songs } from "./config"
import { insertArray } from "./util"

export const SEARCH_KEY = "__search__"
export const PLAY_KEY = "__play__"

class Storage {
  get(key: string, value: any = undefined) {
    const local = localStorage.getItem(key)
    let ret = value
    if (local) {
      ret = JSON.parse(local)
    }
    return ret
  }

  set(key: string, value: string | any[]) {
    let ret = value
    if (typeof value !== "string") {
      //limit array.length to 50
      (ret as any[]).length = Math.min(50, (ret as any[]).length)
      ret = JSON.stringify(ret)
    }
    localStorage.setItem(key, ret as string)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
}
const storage = new Storage()

function deleteOne(array: any[], item: string, func: any) {
  const index = array.findIndex(func)
  if (index === -1) {
    return
  }
  array.splice(index, 1)
}

// 搜索历史
export function saveSearch(query: string) {
  const history = storage.get(SEARCH_KEY, [])
  insertArray(history, query, (item: string) => item === query)
  storage.set(SEARCH_KEY, history)
  return history
}
export function removeSearch(query: string) {
  const history = storage.get(SEARCH_KEY, [])
  deleteOne(history, query, (item: string) => item === query)
  storage.set(SEARCH_KEY, history)
  return history
}
export function clearSearch() {
  storage.clear()
  return []
}
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

//播放历史
export class PlayedHistory {
  public static loadplay() {
    storage.get(PLAY_KEY, [])
  }
  public static clearPlay() {
    storage.clear()
    return []
  }
  public static savePlay(song: Songs) {
    const history = storage.get(PLAY_KEY, []).slice()
    insertArray(history, song, (item: Songs) => item.id === song.id)
    storage.set(PLAY_KEY, history)
    return history
  }
}
