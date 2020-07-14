import axios from "axios";
import { xhrOptions, jsonpOptions, options } from "./config";
import jsonp0 from "../common/js/jsonp";
export function getRank() {
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
  const params = Object.assign({}, jsonpOptions, {
    format: "jsonp",
    g_tk: +new Date()
  });
  const opt = Object.assign({}, options, { name: "jsonp1" });
  return jsonp0(url, params, opt).then((response: any) => {
    return Promise.resolve(response);
  });
}

export function getSongsByTopid(id: number) {
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg";
  const params = Object.assign({}, jsonpOptions, {
    format: "jsonp",
    g_tk: +new Date(),
    topid: id,
    tpl: 3,
    page: "detail",
    type: "top"
  });
  const opt = Object.assign({}, options, { name: "__jp2" });

  return jsonp0(url, params, opt).then((response: any) => {
    return Promise.resolve(response);
  });
}
