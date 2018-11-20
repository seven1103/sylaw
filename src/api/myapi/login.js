import request from '@/utils/request'

// 管理员登录
export function LoginByUsername(query) {
  return request({
    url: '/account/sign_in/',
    method: 'post',
    data: query
  })
}
// 账号登出
export function logout(query) {
  return request({
    url: '/account/sign_out',
    method: 'get'
  })
}
// 修改密码
export function changePsw(query) {
  return request({
    url: '/account/change_password/' + query.account_id + '/',
    method: 'post',
    data: query
  })
}
// 获取个人信息
export function profile(query) {
  return request({
    url: '/account/profile/' + query.account_id + '/',
    method: 'get'
  })
}
