import request from '@/utils/request'

export function queryFollowList(data) {
  return request({
    url: '/follow/queryFollowedUserList',
    method: 'post',
    data: data
  })
}

export function queryFollowedList(data) {
  return request({
    url: '/follow/queryFollowUserList',
    method: 'post',
    data: data
  })
}