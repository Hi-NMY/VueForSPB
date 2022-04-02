import request from '@/utils/request'

export function queryHotTopic(params) {
  return request({
      url: '/topic/queryHotTopic',
      method: 'get',
      params
  })
}