const head = 'upload/'

export function urlJudge(url) {
  if (!url) {
    return 'https://tva4.sinaimg.cn/large/005LlRGlgy1h0k69p2l15j30tz0tzjxv.jpg'
  }
  if (url.substr(0,head.length) == head) {
    return 'http://localhost:8888/' + url
  }
  return url
}

export function urlBadgeImg(url) {
  return 'http://localhost:8888/upload/UserImageServer/badge/' + url
} 