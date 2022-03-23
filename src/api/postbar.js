import request from '@/utils/request';

export function queryNoVideoPostBarForDate(date){
    return request({
        url:'/postbar/queryNoVideoPostBarForDate',
        method:'post',
        data:date
    })
}