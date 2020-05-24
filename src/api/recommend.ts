import jsonp from "@/common/js/jsonp"
import { queryData, options } from "./config"
export default function getRecommend() {
    const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg"
    const data = Object.assign({}, queryData, { uin: 0, platform: "h5", needNewCode: 1 })
    return jsonp(url, data, options)
}
