import request from '@/utils/request';
import axios from 'axios'
import Cookies from 'js-cookie'

export function queryNoVideoPostBarForDate(data) {
    return request({
        url: '/postbarlist/queryNoVideoBarListForDate',
        method: 'get',
        params: data
    })
}

export function queryVideoPostBarForDate(data) {
    return request({
        url: '/postbarlist/queryVideoBarListForDate',
        method: 'get',
        params: data
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
        method: 'get',
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

export function addBar(data,onReturn) {
    axios({
        method: 'post',
        url: '/api/postbarlist/addBar',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token' : Cookies.get('token')
        },
        data: data
    }).then((res) => {
        onReturn(res)
    }).catch((err) => {
        reject(err)
    });
}

export function addBarVideo(data,onReturn) {
    axios({
        method: 'post',
        url: '/api/postbarlist/addBarVideo',
        headers: {
            'Content-Type': 'multipart/form-data',
            'token' : Cookies.get('token')
        },
        data: data
    }).then((res) => {
        onReturn(res)
    }).catch((err) => {
        reject(err)
    });
}