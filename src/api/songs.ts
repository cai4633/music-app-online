import axios from "axios"
import { ERR_OK, jsonpOptions } from "./config"
import jsonp from "common/js/jsonp"

function formatData(songs: any) {
  const keys = ["id", "mid"]
  return songs.map((song: any) => {
    const ret: { [key: string]: any } = {}
    const obj = song.songInfo || song
    keys.forEach((key: string) => {
      ret[key] = obj[key] || obj.data[`song${key}`]
    })
    return ret
  })
}

function mergeData(songs: object[], res: any) {
  const data = res.req_0.data.midurlinfo
  const ret = songs.map((song: any) => {
    for (let i = 0; i < data.length; i++) {
      const obj = song.songInfo || song.data || song
      if (data[i].songmid === (obj.mid || obj.songmid)) {
        return Object.assign({}, obj, data[i])
      }
    }
  })
  return ret.filter(item => item.id || item.songid)
}

export function getSongUrl(songs: any) {
  if (Array.isArray(songs)) {
    songs.length = Math.min(100, songs.length) //length limited 100
  }
  const ret = formatData(songs)
  const mids = ret.map((song: any) => song.mid)
  return jsonp( "https://u.y.qq.com/cgi-bin/musicu.fcg",
    {
      format: "jsonp",
      data: {
        req_0: {
          module: "vkey.GetVkeyServer",
          method: "CgiGetVkey",
          param: {
            guid: "358840384",
            songmid: mids,
            songtype: [0],
            uin: "1443481947",
            loginflag: 1,
            platform: "20"
          }
        },
        comm: { uin: "0", format: "jsonp", ct: 24, cv: 0 }
      }
    },
    { param: "callback", name: "callback123" }
  ).then((res: any) => {
    if (res.code === ERR_OK) {
      return Promise.resolve(mergeData(songs, res))
    }
  })
}

export function getLyric(musicid: number) {
  const option = Object.assign(jsonpOptions, {
    "-": +new Date(),
    musicid: musicid
  })
  return axios
    .get("/lyric/fcgi-bin/fcg_query_lyric.fcg", { params: option })
    .then(res => {
      const str = res.data
      if (str.match(/^MusicJsonCallback\(.*\)$/)) {
        const data = eval(str)
        return Promise.resolve(JSON.parse(JSON.stringify(data)))
      }
    })
}

function MusicJsonCallback(data: { lyric: string }) {
  return data
}
