import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/case/list',
    method: 'get',
    params: query
  })
}

// 获取案例列表
export function caseList(query) {
  return request({
    url: '/service/case/',
    method: 'get',
    params: query
  })
}
// 获取案例详情
export function casedetail(query) {
  return request({
    url: '/service/case/' + query._id + '/',
    method: 'get',
    params: query
  })
}
// 删除案例
export function delcase(query) {
  return request({
    url: '/service/case/' + query.id + '/',
    method: 'delete'
  })
}