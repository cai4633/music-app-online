import jsonp0 from "common/js/jsonp";
import { jsonpOptions, options } from "./config";
import axios from "axios";

export function getHotKey() {
  const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";
  const data = Object.assign({}, jsonpOptions, { g_tk: +new Date() });
  return jsonp0(url, data, options);
}

export function getSearchInfo(key = "", page = 1, zhida = true, perpage = 20) {
  // const url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp"
  const url = "/api/getSearchInfo";
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
    aggr: 0,
    remoteplace: "txt.mqq.all"
  });
  return axios.get(url, { params: data }).then(res => {
    return Promise.resolve(res.data);
  });
}
