import request from '@/utils/request'

export function getInfo(data) {
    return request({
        url: '/user/info',
        method: 'post',
        data: data
    })
}