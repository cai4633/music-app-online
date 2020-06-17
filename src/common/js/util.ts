function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function shuffle(arr: any[]) {
  const length = arr.length - 1
  arr.forEach((item: any, index: number, array: any[]) => {
    const temp = getRandomInt(0, length)
    const t = array[index]
    array[index] = array[temp]
    arr[temp] = t
  })
  return arr
}
