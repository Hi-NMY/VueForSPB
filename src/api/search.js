import request from '@/utils/request';

export function queryNoVideoSearchBarList(data) {
  return request({
    url: '/postbarlist/queryNoVideoSearchBarListForDate?search=' + data,
    method: 'get',
  })
}

export function queryVideoSearchBarListForDate(data) {
  return request({
    url: '/postbarlist/queryVideoSearchBarListForDate?search=' + data,
    method: 'get',
  })
}

export function querySearchUser(data) {
  return request({
    url: '/user/querySearchUser?search=' + data,
    method: 'get',
  })
}

export function querySearchTopicList(data) {
  return request({
    url: '/topic/querySearchTopicList?search=' + data,
    method: 'get',
  })
}