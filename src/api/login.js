import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data: data
    })
}

export function logout(data) {
    return request({
        url: '/users/logout',
        method: 'post',
        data: data
    })
}

export function register(data) {
    return request({
        url: '/users/register',
        method: 'post',
        data: data
    })
}