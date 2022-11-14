import request from '@/utils/request'

export function collect(data) {
    return request({
        url: '/collectbar/addCollectBar',
        method: 'post',
        data: data
    })
}

export function delCollect(data) {
    return request({
        url: '/collectbar/deleteCollectBar',
        method: 'post',
        data: data
    })
}

export function delBar(data) {
    return request({
        url: '/postbarlist/deleteBar',
        method: 'post',
        params:data
    })
}