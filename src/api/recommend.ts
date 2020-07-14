import jsonp from "@/common/js/jsonp";
import { queryData, options, descQuery, xhrOptions } from "./config";
import axios from "axios";

function getRecommend() {
  const url =
    "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  const data = Object.assign({}, queryData, {
    uin: 0,
    platform: "h5",
    needNewCode: 1
  });
  return jsonp(url, data, options);
}

function getDescLists() {
  const param = Object.assign({}, xhrOptions, descQuery);
  return axios.get("/api/getDiscLists", { params: param }).then(res => {
    return Promise.resolve(res.data.data);
  });
}

function getCdInfoById(disstid: number) {
  const param = Object.assign({}, xhrOptions, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: disstid,
    g_tk_new_20200303: 5381
  });
  return axios.get("/api/getCdInfoById", { params: param }).then(response => {
    return Promise.resolve(response.data);
  });
}
export { getDescLists, getRecommend, getCdInfoById };
