import request from '@/utils/request'

export function queryFollowList(data) {
  return request({
    url: '/follow/queryFollowedUserList',
    method: 'get',
    params: data
  })
}

export function queryFollowedList(data) {
  return request({
    url: '/follow/queryFollowUserList',
    method: 'get',
    params: data
  })
}

export function addFollow(data) {
  return request({
    url: '/follow/addFollow',
    method: 'post',
    data: data
  })
}

export function deleteFollow(data) {
  return request({
    url: '/follow/deleteFollow',
    method: 'post',
    data: data
  })
}