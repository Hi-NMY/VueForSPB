import request from '@/utils/request'

export function queryAllTopic(search) {
  return request({
    url: '/topic/querySearchTopicFullList',
    method: 'get',
    params: search
  })
}

export function queryAttentionTopic(search) {
  return request({
    url: '/attentiontopic/queryAttentionTopic',
    method: 'post',
    data:search
  })
}

export function getTopicFull(data) {
  return request({
    url: '/topic/getTopicFull',
    method: 'post',
    data:data
  })
}

export function getNewTopicPostBar(data) {
  return request({
    url: '/postbarlist/queryNoVideoTopicBarListForDate',
    method: 'post',
    data:data
  })
}

// export function getHotTopicPostBar(data) {
//   return request({
//     url: '/topic/queryNoVideoTopicBarListForDate',
//     method: 'post',
//     data:data
//   })
// }