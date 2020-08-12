import { insertArray } from "./util"
export const SEARCH_KEY = "__search__"
export const PLAY_KEY = "__play__"
export const FAVORITE_KEY = "__favorite__"

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
      ;(ret as any[]).length = Math.min(50, (ret as any[]).length)
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

function deleteOne(array: any[], item: string | Songs, func:(item:any) => boolean) {
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
    return storage.get(PLAY_KEY, [])
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

//我的喜欢
export class Favorite {
  public static loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
  }
  public static clearFavorite() {
    storage.clear()
    return []
  }
  public static saveFavorite(song: Songs) {
    const favorite = storage.get(FAVORITE_KEY, []).slice()
    insertArray(favorite, song, (item: Songs) => item.id === song.id)
    storage.set(FAVORITE_KEY, favorite)
    return favorite
  }
  public static removeFavorite(song: Songs) {
    const favorite = storage.get(FAVORITE_KEY, []).slice()
    deleteOne(favorite, song, (item: Songs) => item.id === song.id)
    storage.set(FAVORITE_KEY, favorite)
    return favorite
  }
}
