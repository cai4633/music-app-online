import axios from "axios"
import { ERR_OK } from "./config"

function formatData(data: any) {
  const keys = ["id", "mid"]
  return data.map((item: any) => {
    const ret: { [key: string]: any } = {}
    keys.forEach((key: string) => {
      ret[key] = item.songInfo[key]
    })
    return ret
  })
}

function mergeData(songs: object[], res: any) {
  const data = res.data.req_0.data.midurlinfo
  return songs.map((song: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].songmid === song.songInfo.mid) {
        return Object.assign(song.songInfo, data[i])
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
            param: { guid: "358840384", songmid: mids, songtype: [0], uin: "1443481947", loginflag: 1, platform: "20" },
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
