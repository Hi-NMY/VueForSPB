import request from '@/utils/request'

export function getInfo(data) {
    return request({
        url: '/user/getUserInfo/' + data,
        method: 'post',
    })
}