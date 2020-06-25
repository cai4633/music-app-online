import axios from "axios"
import { ERR_OK, xhrOptions, jsonpOptions, options } from "./config"
import jsonp from "common/js/jsonp"

function formatData(songs: any) {
  const keys = ["id", "mid"]
  return songs.map((song: any) => {
    const ret: { [key: string]: any } = {}
    const obj = song.songInfo || song
    keys.forEach((key: string) => {
      ret[key] = obj[key]
    })
    return ret
  })
}

function mergeData(songs: object[], res: any) {
  const data = res.data.req_0.data.midurlinfo
  return songs.map((song: any) => {
    for (let i = 0; i < data.length; i++) {
      const obj = song.songInfo || song
      if (data[i].songmid === obj.mid) {
        return Object.assign(obj, data[i])
        break
      }
    }
  })
}

export function getSongUrl(songs: any) {
  const ret = formatData(songs)
  const mids = ret.map((song: any) => song.mid)
  return axios
    .get("/api/getSongUrl", {
      params: {
        format: "json",
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
              platform: "20",
            },
          },
          comm: { uin: "0", format: "json", ct: 24, cv: 0 },
        },
      },
    })
    .then((res) => {
      if (res.data.code === ERR_OK) {
        return Promise.resolve(mergeData(songs, res))
      }
    })
}

export function getLyric(musicid: string) {
  const option = Object.assign(jsonpOptions, {
    "-": +new Date(),
    musicid: musicid,
  })
  return axios.get("/api/getLyric", { params: option }).then((res) => {
    const str = res.data
    if (str.match(/^jsonp1\(.*\)$/)) {
      const data = eval(str)
      return Promise.resolve(JSON.parse(JSON.stringify(data)))
    }
  })
}

function jsonp1(data: { lyric: string }) {
  return data
}
