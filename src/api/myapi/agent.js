import request from '@/utils/request'

// 管理员列表 role:[admin, accounting, Clerk] 对应 [高级管理员，会计，文员]
export function agentList(query) {
  return request({
    url: '/agents/',
    method: 'get',
    params: query
  })
}
// 代理商详情
export function agentdetail(query) {
  return request({
    url: '/agents/' + query.id + '/',
    method: 'get'
  })
}
// 创建代理商
export function createAgent(query) {
  return request({
    url: '/agents/',
    method: 'post',
    data: query
  })
}
// 编辑代理商
export function editAgent(query) {
  return request({
    url: '/agents/' + query.id + '/',
    method: 'put',
    data: query
  })
}
// 删除代理商
export function delAgent(query) {
  return request({
    url: '/agents/' + query.id + '/',
    method: 'delete'
  })
}
// 添加银行卡
export function addCard(query) {
  return request({
    url: '/agents/bank/' + query.id + '/',
    method: 'post',
    data: query
  })
}
// 编辑银行卡
export function editCard(query) {
  return request({
    url: '/agents/bank/' + query.agent_id + '/' + query.bank_id + '/',
    method: 'put',
    data: query
  })
}
// 删除银行卡
export function delCard(query) {
  return request({
    url: '/agents/bank/' + query.agent_id + '/' + query.bank_id + '/',
    method: 'delete'
  })
}