import request from '@/utils/request'

export function getSign(data) {
  return request({
    url: '/userSign/queryUserSign',
    method: 'get',
    params: data
  })
}

export function sign(data) {
  return request({
    url: '/userSign/updateSignDayAndRightAndCoin',
    method: 'post',
    data: data
  })
}

export function updateStarBadge(data) {
  return request({
    url: '/userSign/updateSignStarBadge',
    method: 'post',
    data: data
  })
}

export function queryUserBarLikeCount(data) {
  return request({
    url: '/postbarlist/queryUserBarLikeCount?userAccount=' + data,
    method: 'get'
  })
}

export function updateSignTaskBadge(data) {
  return request({
    url: '/userSign/updateSignTaskBadge',
    method: 'post',
    data: data
  })
}

export function updateSignLikeBadge(data) {
  return request({
    url: '/userSign/updateSignLikeBadge',
    method: 'post',
    data: data
  })
}