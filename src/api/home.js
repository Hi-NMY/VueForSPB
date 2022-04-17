import request from '@/utils/request'

export function queryNoVideoUserBarListForDate(data) {
  return request({
    url: '/postbarlist/queryNoVideoUserBarListForDate',
    method: 'post',
    data
  })
}

export function queryCollectBarListForDate(data) {
  return request({
    url: '/collectbar/queryCollectBarFullList',
    method: 'get',
    params:data
  })
}

