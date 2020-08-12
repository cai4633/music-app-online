import { insertArray } from "./util";

export function findIndex(newList: any[], song: Songs) {
  const list = newList.slice()
  return list.findIndex(item => item.id === song.id);
}
