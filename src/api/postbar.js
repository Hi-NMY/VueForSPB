import request from '@/utils/request';

export function queryNoVideoPostBarForDate(date) {
    return request({
        url: '/postbarlist/queryNoVideoBarListForDate',
        method: 'get',
        params:date
    })
}

export function queryVideoPostBarForDate(date) {
    return request({
        url: '/postbar/queryVideoPostBarForDate',
        method: 'get',
        params: date
    })
}

export function queryNoVideoFollowPostBarForDate(data) {
    return request({
        url: '/postbarlist/queryNoVideoFollowBarListForDate',
        method: 'get',
        params: data
    })
}

export function queryBarComment(date) {
    return request({
        url: '/postbarComment/queryCommentList/' + date,
        method: 'post',
    })
}

export function addLikeBar(data) {
    return request({
        url: '/likepb/addLike',
        method: 'post',
        data
    })
}

export function removeLikeBar(data) {
    return request({
        url: '/likepb/deleteLike',
        method: 'post',
        data
    })
}