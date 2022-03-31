import request from '@/utils/request'

export function queryFollowList(data) {
  return request({
    url: '/follow/queryFollowList',
    method: 'post',
    data
  })
}

export function queryFollowedList(data) {
  return request({
    url: '/follow/queryFollowedList',
    method: 'post',
    data
  })
}