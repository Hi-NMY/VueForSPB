import request from '@/utils/request'

// export const randomUser = (params) => {
export function randomUser(params){
    return request({
        url:'/index/randomUser',
        method:'get',
        params
    })
}