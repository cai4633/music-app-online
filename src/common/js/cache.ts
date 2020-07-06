export const SEARCH_KEY = "__search__"

class Storage {
  get(key: string, value: any = undefined) {
    const ret = localStorage.getItem(key)
    if (ret) {
      return ret.split(",")
    }
    return value
  }
  set(key: string, value: any) {
    localStorage.setItem(key, value)
  }
  remove(key: string) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
}

function insertArray(array: any[], item: string, func: any) {
  const index = array.findIndex(func)
  if (index === 0) {
    return
  }
  if (index > 0) {
    array.splice(index, 1)
  }
  array.unshift(item)
}

function deleteOne(array: any[], item: string, func: any) {
  const index = array.findIndex(func)
  if (index === -1) {
    return
  }
  array.splice(index, 1)
}

const storage = new Storage()

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
