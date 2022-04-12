import request from '@/utils/request';

export function queryNoVideoPostBarForDate(date) {
    return request({
        url: '/postbarlist/queryNoVideoBarListForDate/' + date,
        method: 'post',
    })
}

export function queryVideoPostBarForDate(date) {
    return request({
        url: '/postbar/queryVideoPostBarForDate',
        method: 'post',
        data: date
    })
}

export function queryNoVideoFollowPostBarForDate(data) {
    return request({
        url: '/postbarlist/queryNoVideoFollowBarListForDate',
        method: 'post',
        data: data
    })
}

export function queryBarComment(date) {
    return request({
        url: '/postbarComment/queryCommentList/' + date,
        method: 'post',
    })
}