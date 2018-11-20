import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

const html = '<p style="text-indent:43px;text-autospace:ideograph-numeric;line-height:40px"><span style=";font-family:黑体;font-size:21px"><span style="font-family:黑体"></span></span></p><p style="text-align: center;"><span style="font-family: 方正小标宋简体;font-size: 35px">“精准云帮扶”系统管理平台使用协议</span></p><p style="text-autospace:ideograph-numeric;line-height:40px"><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8203;甲方：</span></span><span style="text-decoration:underline;"><span style="font-family: 仿宋_GB2312;font-size: 21px">&nbsp;<span style="font-family:仿宋_GB2312">巴彦淖尔市临河区扶贫开发办公室</span> </span></span><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">（以下简称甲方）</span></span></p><p style="line-height: 40px"><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">&nbsp;&nbsp;&nbsp;&nbsp;&#8203;&nbsp;&nbsp;&nbsp;&nbsp;&#8203;地址：</span></span><span style="text-decoration:underline;"><span style="font-family: 仿宋_GB2312;font-size: 21px">&nbsp;<span style="font-family:仿宋_GB2312">巴彦淖尔市临河区政府大楼</span>9楼 &nbsp;&nbsp;</span></span><span style="text-decoration:underline;"><span style="font-family: 仿宋_GB2312;font-size: 21px;background: rgb(255, 255, 255)">&nbsp;&nbsp;&nbsp;</span></span><span style="font-family: 仿宋_GB2312;font-size: 21px;background: rgb(255, 255, 255)"><span style="font-family:仿宋_GB2312">。</span></span></p><p style="text-autospace:ideograph-numeric;line-height:40px"><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">&nbsp;&nbsp;&nbsp;&nbsp;&#8203;&nbsp;&nbsp;&nbsp;&nbsp;&#8203;乙方：</span></span><span style="text-decoration:underline;"><span style="font-family: 仿宋_GB2312;font-size: 21px">&nbsp;<span style="font-family:仿宋_GB2312">贵州华夏云城网络技术有限公司</span> &nbsp;&nbsp;&nbsp;</span></span><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">（以下简称乙方）</span> &nbsp;</span></p><p style="text-autospace:ideograph-numeric;line-height:40px"><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">&nbsp;&nbsp;&nbsp;&nbsp;&#8203;&nbsp;&nbsp;&nbsp;&nbsp;&#8203;地址：</span></span><span style="text-decoration:underline;"><span style="font-family: 仿宋_GB2312;font-size: 21px">&nbsp;<span style="font-family:仿宋_GB2312">贵州省贵阳市云岩区中华北路天毅大厦</span>23层全层。</span></span></p><p style="text-indent:43px;text-autospace:ideograph-numeric;line-height:40px"><span style="font-family: 仿宋_GB2312;font-size: 21px"><span style="font-family:仿宋_GB2312">为推进网络扶贫建设与大数据产业发展，甲乙双方本着互利互惠、合作共赢的原则，经友好协商，决定建立战略合作伙伴关系。</span></span></p><p style="text-indent:43px;text-autospace:ideograph-numeric;line-height:40px"><span style="font-family: 仿宋_GB2312;font-size: 21px"><span style="font-family:仿宋_GB2312">乙方利用智能化精准扶贫的管理运营理念融合</span>IT技术，全面提供网络扶贫及后期政务信息化管理方面的研发及运营。甲方将发挥其政府服务及政策优势，积极配合支持乙方“精准云帮扶”系统在地方推广使用。并且乙方给甲方提供“精准云帮扶”系统的培训管理工作，甲乙双方经友好协商，达成以下一致意见，签订本合作协议。</span></p><p style="text-indent:43px;text-autospace:ideograph-numeric;line-height:40px"><span style=";font-family:黑体;font-size:21px"><span style="font-family:黑体"></span></span><br></p><p style="text-indent:43px;text-autospace:ideograph-numeric;line-height:40px"><span style=";font-family:黑体;font-size:21px"><span style="font-family:黑体">一、项目内容</span></span></p><p style="text-indent: 43px;line-height: 40px"><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">（一）本合同议定由乙方负责建立</span>“精准云帮扶”系统，管理平台包括PC端、APP端（以下简称“本软件”）。</span></p><p style="text-indent: 43px;line-height: 40px"><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">（二）本合同议定由乙方向甲方提供</span>“精准云帮扶”系统，系统管理平台</span><span style="font-family: 仿宋_GB2312;font-size: 21px"><span style="font-family:仿宋_GB2312">不收取开发费用（注：二次开发除外）</span></span><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">，只收取服务器租赁费、系统维护费、运营费。</span></span></p><p><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">（三）本合同议定乙方负责本软件的培训工作，乙方不收</span></span></p><p><br></p>'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    type1: '@integer(0,4)', // 全部 常用文书 行政文书 民事文书 刑事文书
    type2: '@integer(0,4)', // 合同 离婚协议书 公告 通报 通知
    title: '@ctitle(5, 10)',
    cover: Mock.Random.image('200x200', '#50B347', '#FFF', 'Mock.js'),
    content: html,
    views: '@integer(1,100)',
    timestamp: +Mock.Random.date('T')
  }))
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
