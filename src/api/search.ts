import jsonp0 from "common/js/jsonp"
import { jsonpOptions, options } from "./config"

export function getHotKey() {
  const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg"
  const data = Object.assign({}, jsonpOptions, { g_tk: +new Date() })
  const opt = Object.assign({},options,{name: "jsonp678"})
  return jsonp0(url, data, opt)
}

export function getSearchInfo(key = "", page = 1, zhida = true, perpage = 20) {
  const url = "https://c.y.qq.com/soso/fcgi-bin/client_search_cp"
  const data = Object.assign({}, jsonpOptions, {
    g_tk: +new Date(),
    w: key,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: "utf-8",
    sem: 1,
    aggr: 1,
    cr: 1,
    lossless: 0,
    searchid: "52790765911700286",
    flag_qc: 0,
    loginUin: 0,
    hostUin: 0,
    remoteplace: "txt.yqq.center",
    format: "jsonp",
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    needNewCode: 0,
    platform: "yqq.json"
  })
  // return axios.get("/soso/fcgi-bin/search_for_qq_cp", { params: data }).then(res => {
  //   return Promise.resolve(res.data);
  // });
  const opt = Object.assign({},options,{name: "jsonp789"})

  return jsonp0(url, data, opt).then((res: any) => {
    return Promise.resolve(res)
  })
}
