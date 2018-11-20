import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/admin/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', noCache: true }
      }
    ]
  },
  {
    path: '/law_archives',
    component: Layout,
    redirect: '/law_archives/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/law_archives/index'),
        name: 'law_archives',
        meta: { title: '中国法律', icon: 'law' }
      }
    ]
  },
  {
    path: '/case',
    component: Layout,
    redirect: '/case/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/case/index'),
        name: 'case',
        meta: { title: '纠纷案例', icon: 'case' }
      }
    ]
  },
  {
    path: '/question',
    component: Layout,
    redirect: '/question/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/question/index'),
        name: 'question',
        meta: { title: '善言问答', icon: 'question' }
      }
    ]
  },
  {
    path: '/template',
    component: Layout,
    redirect: '/template/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/template/index'),
        name: 'template',
        meta: { title: '文书模板', icon: 'template' }
      }
    ]
  },
  {
    path: '/classfy',
    component: Layout,
    redirect: '/classfy/index',
    meta: { title: '分类管理', icon: 'classify' },
    children: [
      {
        path: 'template',
        component: () => import('@/views/my/classfy/TemplateClass'),
        name: 'classtemplate',
        meta: { title: '文书模板分类', icon: 'tab' }
      },
      {
        path: 'case',
        component: () => import('@/views/my/classfy/CaseClass'),
        name: 'classcase',
        meta: { title: '纠纷案例分类', icon: 'tab' }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/index',
    meta: { title: '账号管理', icon: 'role' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/role/index'),
        name: 'admin',
        meta: { title: '管理员', icon: 'tab' }
      },
      {
        path: 'user',
        component: () => import('@/views/my/role/user'),
        name: 'user',
        meta: { title: '用户', icon: 'tab' }
      },
      {
        path: 'laywer',
        component: () => import('@/views/my/role/laywer'),
        name: 'laywer',
        meta: { title: '律师', icon: 'tab' }
      },
      {
        path: 'judge',
        component: () => import('@/views/my/role/judge'),
        name: 'judge',
        meta: { title: '法官', icon: 'tab' }
      },
      {
        path: 'court',
        component: () => import('@/views/my/role/Court'),
        name: 'court',
        meta: { title: '法院', icon: 'tab' }
      }
    ]
  },
  {
    path: '/caseman',
    component: Layout,
    redirect: '/caseman/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/caseman/index'),
        name: 'caseman',
        meta: { title: '立案管理', icon: 'caseman' }
      }
    ]
  },
  {
    path: '/withdraw',
    component: Layout,
    redirect: '/withdraw/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/withdraw/index'),
        name: 'withdraw',
        meta: { title: '提现管理', icon: 'withdraw' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/order/index'),
        name: 'order',
        meta: { title: '订单管理', icon: 'order' }
      }
    ]
  },
  {
    path: '/advert',
    component: Layout,
    redirect: '/advert/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/advert/index'),
        name: 'advert',
        meta: { title: '广告管理', icon: 'advert' }
      }
    ]
  },
  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/agent/index'),
        name: 'agent',
        meta: { title: '代理商管理', icon: 'agent' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/message/index'),
        name: 'message',
        meta: { title: '消息管理', icon: 'message' }
      }
    ]
  },
  {
    path: '/setup',
    component: Layout,
    redirect: '/setup/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/my/setup/index'),
        name: 'setup',
        meta: { title: '系统设置', icon: 'set' }
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
    //  tableRouter,
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
