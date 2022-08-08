import request from '@/utils/request'

export function queryNoVideoUserBarListForDate(data) {
  return request({
    url: '/postbarlist/queryNoVideoUserBarListForDate',
    method: 'get',
    params:data
  })
}

export function queryVideoUserBarListForDate(data) {
  return request({
    url: '/postbarlist/queryVideoUserBarListForDate',
    method: 'get',
    params:data
  })
}

export function queryCollectBarListForDate(data) {
  return request({
    url: '/collectbar/queryCollectBarFullList',
    method: 'get',
    params:data
  })
}

