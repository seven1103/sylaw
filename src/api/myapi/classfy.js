import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/service/cate/case',
    method: 'get',
    params: query
  })
}
// 拉取案例分类列表
export function fetchCaseList(query) {
  return request({
    url: '/service/cate/case',
    method: 'get',
    params: query
  })
}
// 拉取文书模板分类
export function fetchTemList(query) {
  return request({
    url: '/service/cate/template',
    method: 'get',
    params: query
  })
}

// 添加一级分类
export function addfist(query) {
  return request({
    url: '/service/cate/' + query.type + '/',
    method: 'post',
    data: query
  })
}
// 添加二级分类
export function addsed(query) {
  return request({
    url: '/service/cate/' + query.cate_id + '/',
    method: 'put',
    data: query
  })
}
// 删除一级分类
export function delfirst(query) {
  return request({
    url: '/cate/' + query.cate_id + '/',
    method: 'delete',
    data: query
  })
}
// 删除二级分类
export function delsed(query) {
  return request({
    url: '/service/cate/' + query.cate_id + '/' + query.column_id + '/',
    method: 'delete',
    data: query
  })
}

// 编辑分类
export function edit(query) {
  return request({
    url: '/service/cate/' + query.cate_id + '/',
    method: 'put',
    data: query
  })
}
