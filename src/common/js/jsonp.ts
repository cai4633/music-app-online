import jsonp0 from "jsonp"

function parseUrl(url: string, data: { [key: string]: any }) {
  let query = ""
  for (const key in data) {
    let value =
      typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key]
    query += query
      ? `&${key}=${encodeURIComponent(value)}`
      : `${key}=${encodeURIComponent(value)}`
  }
  url += url.match(/\?/) ? query : `?${query}`

  return url
}

export default function(url: string, data: object, opt: object) {
  const newUrl = parseUrl(url, data)
  return new Promise<any>((resolve, reject) => {
    jsonp0(newUrl, opt, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(data)
      }
    })
  })
}
