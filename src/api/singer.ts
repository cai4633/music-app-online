import jsonp from "@/common/js/jsonp"
import { singerQuery } from "./config"
import axios from "axios"

function getSingerLists() {
    // const url = "https://u.y.qq.com/cgi-bin/musics.fcg"
    const query = Object.assign({}, singerQuery)
    return axios.get("/api/getSingerLists", { params: query }).then((response) => {
        return Promise.resolve(response.data.data)
    })
}

export { getSingerLists }
