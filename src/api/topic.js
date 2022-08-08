import request from '@/utils/request'

export function queryAllTopic(data) {
  return request({
    url: '/topic/querySearchTopicFullList',
    method: 'get',
    params: data
  })
}

export function queryAttentionTopic(data) {
  return request({
    url: '/attentiontopic/queryAttentionTopic',
    method: 'get',
    params: data
  })
}

export function getTopicFull(data) {
  return request({
    url: '/topic/getTopicFull',
    method: 'get',
    params: data
  })
}

export function getNewTopicPostBar(data) {
  return request({
    url: '/postbarlist/queryNoVideoTopicBarListForDate',
    method: 'get',
    params: data
  })
}

export function getHotTopicPostBar(data) {
  return request({
    url: '/postbarlist/queryNoVideoTopicBarListForThumbNum',
    method: 'get',
    params: data
  })
}

export function getVideoTopicPostBar(data) {
  return request({
    url: '/postbarlist/queryVideoTopicBarListForDate',
    method: 'get',
    params: data
  })
}

export function addAttention(data) {
  return request({
    url: '/attentiontopic/addAttentionTopic',
    method: 'post',
    data: data
  })
}

export function deleteAttention(data) {
  return request({
    url: '/attentiontopic/deleteAttentionTopicById',
    method: 'post',
    data: data
  })
}

export function querySearchTopicName(data) {
  return request({
    url: '/topic/querySearchTopicNameList?topicSearch=' + data,
    method: 'get'
  })
}

// export function getHotTopicPostBar(data) {
//   return request({
//     url: '/topic/queryNoVideoTopicBarListForDate',
//     method: 'post',
//     data:data
//   })
// }