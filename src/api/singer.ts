import { singerQuery, xhrOptions } from "./config";
import { sign_generator } from "@/common/js/xhr";
import axios from "axios";

// const url = "https://u.y.qq.com/cgi-bin/musics.fcg"
function getSingerLists() {
  const param = Object.assign({}, xhrOptions, singerQuery);
  return axios.get("/api/getSingerLists", { params: param }).then(response => {
    return Promise.resolve(response.data.data);
  });
}

function getSingerSongs(mid: string) {
  const data = {
    comm: { ct: 24, cv: 0 },
    singerSongList: {
      method: "GetSingerSongList",
      param: { order: 1, singerMid: mid, begin: 0, num: 30 },
      module: "musichall.song_list_server"
    }
  };

  const query = Object.assign({}, xhrOptions, {
    "-": "getSingerSong09973278224209037",
    sign: sign_generator(data),
    data: data
  });

  return axios.get("/api/getSingerSongs", { params: query }).then(response => {
    return Promise.resolve(response.data.singerSongList);
  });
}

export { getSingerLists, getSingerSongs };
