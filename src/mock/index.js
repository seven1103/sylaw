import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './mymock/law_archives'
// 中国法律
import lawArchivesAPI from './mymock/law_archives'
// 纠纷案例
import caseAPI from './mymock/case'
// 善言问答
import questionAPI from './mymock/question'
// 文书模板
import templateAPI from './mymock/template'
// 分类管理
import classfyAPI from './mymock/classfy'
// 用户管理
import role from './mymock/role'
// 提现管理
import withdraw from './mymock/withdraw'
// 订单管理
import order from './mymock/order'
// 广告管理
import advent from './mymock/advert'
// 立案管理
import caseman from './mymock/caseman'
// 消息管理
import message from './mymock/message'
// 系统设置
import setup from './mymock/setup'

import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// ---------------------------律师-----------------------------------
// 中国法律相关
Mock.mock(/\/law_archives\/list/, 'get', lawArchivesAPI.getList)

// 纠纷案例相关
Mock.mock(/\/case\/list/, 'get', caseAPI.getList)

// 善言回答相关
Mock.mock(/\/question\/list/, 'get', questionAPI.getList)

// 文书模板
Mock.mock(/\/template\/list/, 'get', templateAPI.getList)

// 分类管理
Mock.mock(/\/classfy\/list/, 'get', classfyAPI.getList)

export default Mock
