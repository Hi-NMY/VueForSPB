import request from '@/utils/request'

export function getInfo(data) {
    return request({
        url: '/user/getUserInfo/' + data,
        method: 'get',
    })
}

export function getAlInfo() {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
    })
}

export function changeInfo(data) {
    return request({
        url: '/user/updateUserPersonalInformation',
        method: 'post',
        data: data
    })
}

export function updateUserPwd(data) {
    return request({
        url: '/users/updatePassword',
        method: 'post',
        data: data
    })
}