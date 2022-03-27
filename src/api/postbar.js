import request from '@/utils/request';

export function queryNoVideoPostBarForDate(date) {
    return request({
        url: '/postbar/queryNoVideoPostBarForDate',
        method: 'post',
        data: date
    })
}

export function queryVideoPostBarForDate(date) {
    return request({
        url: '/postbar/queryVideoPostBarForDate',
        method: 'post',
        data: date
    })
}

export function queryNoVideoFollowPostBarForDate(date) {
    return request({
        url: '/postbar/queryNoVideoFollowPostBarForDate',
        method: 'post',
        data: date
    })
}

export function queryBarComment(date) {
    return request({
        url: '/postbar/queryComment',
        method: 'post',
        data: date
    })
}