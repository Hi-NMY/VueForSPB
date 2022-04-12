import request from '@/utils/request'

// export const randomUser = (params) => {
export function randomUser(num) {
    return request({
        url: '/follow/queryRandomUserList?num=' + num,
        method: 'get',
    })
}
export function hotTopic() {
    return request({
        url: '/topic/queryHotTopicList',
        method: 'get',
    })
}