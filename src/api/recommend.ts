import jsonp from "@/common/js/jsonp";
import { queryData, options, descQuery } from "./config";
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
  const param = Object.assign({}, descQuery);
  return axios
    .get("/api/getDescLists", {
      params: param
    })
    .then(res => {
      return Promise.resolve(res.data.data);
    });
}

export { getDescLists, getRecommend };
