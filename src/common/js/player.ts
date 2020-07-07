import { Songs } from "./config"

export function findIndex(newList: any[], song: { id: number }) {
  return newList.findIndex((item) => item.id === song.id)
}

export function removeSong(list: any[], song: Songs) {
  const arr = list.slice(0)
  const index = findIndex(arr, song)
  let flag = false
  if (index >= 0) {
    arr.splice(index, 1)
    flag = true
  }
  return { list: arr, flag }
}
