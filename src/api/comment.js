import request from '@/utils/request';

export function addComment(data) {
  return request({
    url: '/postbarComment/addComment',
    method: 'post',
    data: data
  })
}

export function deleteComment(data) {
  return request({
    url: '/postbarComment/deleteComment',
    method: 'post',
    data: data
  })
}
