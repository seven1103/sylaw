import request from '@/utils/request'

// 文书模板列表
export function templateList(query) {
  return request({
    url: '/service/template/',
    method: 'get',
    params: query
  })
}
// 创建文书模板
export function addtemplate(query) {
  return request({
    url: '/service/template/',
    method: 'post',
    data: query
  })
}
// 编辑文书模板
export function edittemplate(query) {
  return request({
    url: '/service/template/' + query.template_id + '/',
    method: 'put',
    data: query
  })
}
// 删除模板
export function deltemplate(query) {
  return request({
    url: '/service/template/' + query.id + '/',
    method: 'delete'
  })
}