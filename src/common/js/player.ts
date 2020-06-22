export function findIndex(newList: any[], song: { id: number }) {
  return newList.findIndex(item => item.id === song.id);
}
