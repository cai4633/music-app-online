function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle(arr: any[]) {
  const _arr = arr.slice()
  const length = _arr.length - 1
  _arr.forEach((item: any, index: number, array: any[]) => {
    const temp = getRandomInt(0, length)
    const t = array[index]
    array[index] = array[temp]
    _arr[temp] = t
  })
  return _arr
}
