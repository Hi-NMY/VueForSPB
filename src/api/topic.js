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
    data: search
  })
}

export function getTopicFull(data) {
  return request({
    url: '/topic/getTopicFull',
    method: 'post',
    data: data
  })
}

export function getNewTopicPostBar(data) {
  return request({
    url: '/postbarlist/queryNoVideoTopicBarListForDate',
    method: 'post',
    data: data
  })
}

export function getHotTopicPostBar(data) {
  return request({
    url: '/postbarlist/queryNoVideoTopicBarListForThumbNum',
    method: 'post',
    data: data
  })
}

export function getVideoTopicPostBar(data) {
  return request({
    url: '/postbarlist/queryVideoTopicBarListForDate',
    method: 'post',
    data: data
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