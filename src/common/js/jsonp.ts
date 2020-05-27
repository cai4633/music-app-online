import jsonp0 from "jsonp";
function parseUrl(url: string, data: { [key: string]: any }) {
  let query = "";
  for (const key in data) {
    query += query
      ? `&${key}=${encodeURIComponent(data[key])}`
      : `${key}=${encodeURIComponent(data[key])}`;
  }
  url += url.match(/\?/) ? query : `?${query}`;

  return url;
}

export default function(url: string, data: object, opt: object) {
  url = parseUrl(url, data);
  return new Promise((resolve, reject) => {
    jsonp0(url, opt, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
}
