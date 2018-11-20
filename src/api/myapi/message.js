import request from '@/utils/request'

// 官方消息列表
export function MessageList(query) {
    return request({
        url: '/official_msg/' + query.type + '/',
        method: 'get',
        params: query 
    })
}
// 律师消息列表
export function LawMessageList(query) {
    return request({
        url: '/official_msg/lawyer/',
        method: 'get',
        params: query 
    })
}
// 用户好消息列表
export function UserMessageList(query) {
    return request({
        url: '/official_msg/user/',
        method: 'get',
        params: query 
    })
}

//  消息详情
export function MessageDetail(query) {
    return request({
        url: '/official_msg/' + query.type + '/' + query.msg_id + '/',
        method: 'get',
        params: query
    })
}
// 创建消息
export function addMessage(query) {
    return request({
        url: '/official_msg/' + query.type + '/',
        method: 'post',
        data: query
    })
}
// 编辑消息
export function editMessage(query) {
    return request({
        url: '/official_msg/' + query.msg_id + '/',
        method: 'put',
        data: query
    })
}
// 删除消息
export function delMessage(query) {
    return request({
        url: '/official_msg/' +query.msg_id + '/',
        method: 'delete'
    })
}