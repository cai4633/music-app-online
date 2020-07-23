import { Songs } from "./config"

function getTime(time:string, offset = 0) {
  const regexp = time.match(/^(\d{0,2}):(\d{0,2}\.\d{0,2})$/)
  const minute = regexp ? regexp[1] : 0
  const second = regexp ? regexp[2] : 0
  const dt = offset + 0.5
  return +minute * 60 + +second - dt
}

export function insertArray(array: any[], item: string | Songs, func: any) {
  const index = array.findIndex(func)
  if (index === 0) {
    return
  }
  if (index > 0) {
    array.splice(index, 1)
  }
  array.unshift(item)
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle(arr: any[]) {
  //数组每个元素都与另外一个随机元素互换位置
  const _arr = arr.slice()
  const length = _arr.length - 1
  _arr.forEach((item: any, index: number, array: any[]) => {
    const temp = getRandomInt(0, length)
    const t = array[index]
    array[index] = array[temp]
    array[temp] = t
  })
  return _arr
}

export function debounce(func: any, delay: number) {
  let timer: number | undefined
  return function(this: void, ...args: any) {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    timer = window.setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timer)
      timer = undefined
    }, delay)
  }
}

export function lyricParser(lyric: string) {
  const regexp = [
    /&#58;/g,
    /&#46;/g,
    /&#60;/g,
    /&#62;/g,
    /&#32;/g,
    /&#10;/g,
    /&#40;/g,
    /&#41;/g,
    /&#59;/g,
    /&#124;/g,
    /&#45;/g
  ]
  const replacement = [":", ".", "<", ">", " ", "\n", "(", ")", ";", "|", "-"]
  let lines: string[] = []
  const ret: { [key: string]: any } = {
    lines: [],
    curline: 0,
    lrc: "",
    tags: { album: "", artist: "", by: "", offset: "", title: "", play: "" }
  }
  const shortcut: { [key: string]: string } = {
    ti: "title",
    ar: "artist",
    al: "album",
    by: "by",
    offset: "offset"
  }

  if (lyric) {
    regexp.forEach((item, index) => {
      lyric = lyric.replace(item, replacement[index])
    })
    ret.lrc = lyric //ret.lrc
    lines = lyric.split("\n")
  }
  if (lines.length) {
    //分行解析 artist, album, title, offset, by
    lines.forEach((item, index) => {
      const regexp: { [key: string]: any } = {
        ti: item.match(/^\[ti:(.*)\]/),
        ar: item.match(/^\[ar:(.*)\]/),
        by: item.match(/^\[by:(.*)\]/),
        al: item.match(/^\[al:(.*)\]/),
        offset: item.match(/^\[offset:(.*)\]/),
        time: item.match(/^\[(\w{0,2}:\w{0,2}\.\w{0,2})\](.*)$/)
      }
      for (const key in regexp) {
        if (regexp[key]) {
          if (key === "time" && regexp.time[2]) {
            ret.lines.push({ time: regexp.time[1], txt: regexp.time[2] }) //ret.lines
          } else {
            ret.tags[shortcut[key]] = ret.tags[shortcut[key]] || regexp[key][1] //ret.tags
          }
          return
        }
      }
    })
  }

  ret.play = function(currentTime: number) {
    this.lines.length &&
      this.lines.forEach((item: any, index: number, array: any[]) => {
        if (
          currentTime >= getTime(item.time) &&
          currentTime <=
            getTime(array[Math.min(index + 1, array.length - 1)].time)
        ) {
          this.curline = index
          return
        }
        if (currentTime >= getTime(array[array.length - 1].time)) {
          this.curline = array.length - 1
        }
      })
  }
  return ret
}
