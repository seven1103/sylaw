import request from '@/utils/request'

// 管理员列表 role:[admin, accounting, Clerk] 对应 [高级管理员，会计，文员]
export function adminList(query) {
  return request({
    url: '/users/admin/',
    method: 'get',
    params: query
  })
}
// 管理员详情
export function admindetail(query) {
  return request({
    url: '/users/admin/' + query.admin_id + '/',
    method: 'get'
  })
}
// 创建管理员
export function creatadmin(query) {
  return request({
    url: '/users/admin/',
    method: 'post',
    data: query
  })
}
// 编辑管理员
export function modifyadmin(query) {
  return request({
    url: '/users/admin/' + query._id + '/',
    method: 'put',
    data: query
  })
}
// 删除管理员
export function deladmin(query) {
  return request({
    url: '/users/admin/' + query.admin_id + '/',
    method: 'delete'
  })
}

// 用户列表
export function userlist(query) {
  return request({
    url: '/users/user',
    method: 'get',
    params: query
  })
}
// 用户详情
export function userdetail(query) {
  return request({
    url: '/users/user' + query.admin_id + '/',
    method: 'get',
    params: query
  })
}
// 删除用户
export function deluser(query) {
  return request({
    url: '/users/user' + query.admin_id + '/',
    method: 'delete'
  })
}

// 律师列表
export function lawyerlist(query) {
  return request({
    url: '/users/lawyer',
    method: 'get',
    params: query
  })
}
// 删除律师
export function dellawyer(query) {
  return request({
    url: '/users/lawyer' + query.lawyer_id + '/',
    method: 'delete'
  })
}

// 法院账号列表
export function courtlist(query) {
  return request({
    url: '/users/court',
    method: 'get',
    params: query
  })
}
// 法院账号详情
export function courtdetail(query) {
  return request({
    url: '/users/court' + query.court_id + '/',
    method: 'get',
    params: query
  })
}
// 创建法院账号
export function creatcourt(query) {
  return request({
    url: '/users/court',
    method: 'post',
    data: query
  })
}
// 编辑法院账号
export function editcourt(query) {
  return request({
    url: '/users/court/' + query._id + '/',
    method: 'put',
    data: query
  })
}
// 删除法院账号
export function delcourt(query) {
  return request({
    url: '/users/court/' + query.admin_id + '/',
    method: 'delete'
  })
}

// 法官账号列表
export function judgelist(query) {
  return request({
    url: '/users/judge',
    method: 'get',
    params: query
  })
}
// 法官账号详情
export function judgedetail(query) {
  return request({
    url: '/users/judge' + query.judge_id + '/',
    method: 'get',
    params: query
  })
}
// 创建法官账号
export function createjudge(query) {
  return request({
    url: '/users/judge',
    method: 'post',
    data: query
  })
}
// 编辑法官账号
export function editjudge(query) {
  return request({
    url: '/users/judge/' + query._id + '/',
    method: 'put',
    data: query
  })
}
// 删除法官账号
export function deljudge(query) {
  return request({
    url: '/users/judge/' + query.admin_id + '/',
    method: 'delete'
  })
}
