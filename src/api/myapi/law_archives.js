import request from '@/utils/request'

// 中国法律列表
export function fetchList(query) {
  return request({
    url: '/service/law_archives/',
    method: 'get',
    params: query
  })
}

// 删除中国法律(书)
export function delArchives(query) {
  return request({
    url: '/service/law_archives/' + query.law_archives_id + '/',
    method: 'delete'
  })
}
// 删除中国法律(章)
export function delArchives_r(query) {
  return request({
    url: '/service/archive_rule/' + query.law_archives_id + '/' + query.rule_id + '/',
    method: 'delete'
  })
}
// 删除中国法律(节)
export function delArchives_c(query) {
  return request({
    url: '/service/archive_content/' + query.law_archives_id + '/' + query.rule_id + '/' + query.chapter_id + '/',
    method: 'delete'
  })
}

// 添加中国法律(书)
export function addArchives(query) {
  return request({
    url: '/service/law_archives/',
    method: 'post',
    data: query
  })
}
// 添加中国法律(章)
export function addArchives_r(query) {
  return request({
    url: '/service/archive_rule/' + query.law_archives_id + '/',
    method: 'post',
    data: query
  })
}
// 添加中国法律(节)
export function addArchives_c(query) {
  return request({
    url: '/service/archive_content/' + query.law_archives_id + '/' + query.rule_id + '/',
    method: 'post',
    data: query
  })
}
// 编辑中国法律
export function editArchives(query) {
  return request({
    url: '/service/law_archives/' + query.law_archives_id + '/',
    method: 'put',
    data: query
  })
}
// 编辑中国法律(章)
export function editArchives_r(query) {
  return request({
    url: '/service/archive_rule/' + query.law_archives_id + '/' + query.rule_id + '/',
    method: 'put',
    data: query
  })
}
// 编辑中国法律(节)
export function editArchives_c(query) {
  return request({
    url: '/service/law_archives/' + query.law_archives_id + '/' + query.rule_id + '/' + query.chapter_id + '/',
    method: 'put',
    data: query
  })
}
