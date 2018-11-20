import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/question/list',
    method: 'get',
    params: query
  })
}

// 问答列表
export function questionList(query) {
  return request({
    url: '/service/question/',
    method: 'get',
    params:query
  })
}
// 删除问题
export function delquestion(query) {
  return request({
    url:'/service/question/' + query.id + '/',
    method: 'delete'
  })
}
// 删除回答
export function delanswer(query) {
  return request({
    url: '/service/question/'+ query.question_id + '/' + query.answer_id + '/',
    method:'delete'
  })
}