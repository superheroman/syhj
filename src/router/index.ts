import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    redirect: "/todoCenter/index",
    component: Layout,
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/todoCenter/index",
        component: () => import("@/views/todoCenter/index.vue"),
        name: "todoCenter",
        meta: {
          title: "待办中心"
        }
      },
      {
        path: "/productList/index",
        component: () => import("@/views/productList/index.vue"),
        name: "productList",
        meta: {
          title: "零件列表"
        }
      }
    ]
  },
  {
    path: "/nupriceManagement",
    redirect: "/demandApply/index",
    component: Layout,
    meta: {
      title: "核价管理"
    },
    children: [
      {
        path: "/demandApply/index",
        component: () => import("@/views/demandApply/index.vue"),
        name: "demandApply",
        meta: {
          title: "营销部录入"
        }
      },
      {
        path: "/demandApply/result",
        component: () => import("@/views/demandApply/result.vue"),
        name: "demandApplyResult",
        meta: {
          title: "营销部报价表"
        }
      },
      {
        path: "/partEntry/managerOperate",
        component: () => import("@/views/partEntry/managerOperate.vue"),
        name: "managerOperate",
        meta: {
          title: "项目经理录入"
        }
      },
      {
        path: "/pmDepartment/index",
        component: () => import("@/views/pmDepartment/index.vue"),
        name: "pmDepartment",
        meta: {
          title: "生管部录入"
        }
      },
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "核价看板"
        }
      }
    ]
  },

  // {
  //   path: "/secondForm",
  //   redirect: "/secondForm/index",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/secondForm/index",
  //       component: () => import("@/views/secondForm/index.vue"),
  //       name: "secondForm",
  //       meta: {
  //         title: "核价处理",
  //         icon: "secondForm"
  //       }
  //     }
  //   ]
  // },
  {
    path: "/electronicImport",
    redirect: "/electronicImport/index",
    component: Layout,
    children: [
      {
        path: "/electronicImport/index",
        component: () => import("@/views/electronicImport/index.vue"),
        name: "electronicImport",
        meta: {
          title: "电子料导入"
        }
      }
    ]
  },
  {
    path: "/departmentManage",
    redirect: "/departmentManage/index",
    component: Layout,
    children: [
      {
        path: "/departmentManage/index",
        component: () => import("@/views/departmentManage/index.vue"),
        name: "departmentManage",
        meta: {
          title: "部门管理"
        }
      }
    ]
  },
  {
    path: "/dictionary",
    redirect: "/dictionary/index",
    component: Layout,
    // meta: {
    //   title: "字典管理"
    // },
    children: [
      {
        path: "/dictionary/index",
        component: () => import("@/views/dictionary/index.vue"),
        name: "dictionary",
        meta: {
          title: "字典管理"
        }
      },
      {
        path: "/dictionary/detailList",
        component: () => import("@/views/dictionary/detailList.vue"),
        name: "detailList",
        meta: {
          title: "字典管理明细表",
          hidden: true
        }
      }
    ]
  },
  // {
  //   path: "/otherImport",
  //   redirect: "/otherImport/index",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/otherImport/index",
  //       component: () => import("@/views/otherImport/index.vue"),
  //       name: "otherImport",
  //       meta: {
  //         title: "其它导入",
  //         icon: "otherImport"
  //       }
  //     }
  //   ]
  // },
  {
    path: "/structuralMaterialImport",
    redirect: "/structuralMaterialImport/index",
    component: Layout,
    children: [
      {
        path: "/structuralMaterialImport/index",
        component: () => import("@/views/structuralMaterialImport/index.vue"),
        name: "structuralMaterialImport",
        meta: {
          title: "结构料导入"
        }
      }
    ]
  },
  {
    path: "/bomView",
    redirect: "/bomView/index",
    component: Layout,
    children: [
      {
        path: "/bomView/index",
        component: () => import("@/views/bomView/index.vue"),
        name: "bomView",
        meta: {
          title: "Bom查看"
        }
      }
    ]
  },
  {
    path: "/processManagement",
    redirect: "/processManagement/index",
    component: Layout,
    children: [
      {
        path: "/processManagement/index",
        component: () => import("@/views/processManagement/index.vue"),
        name: "processManagement",
        meta: {
          title: "工序工时库管理"
        }
      }
    ]
  },
  {
    path: "/fnDepartment",
    redirect: "/fnDepartment/index",
    component: Layout,
    children: [
      {
        path: "/fnDepartment/index",
        component: () => import("@/views/fnDepartment/index.vue"),
        name: "fnDepartment",
        meta: {
          title: "财务参数管理"
        }
      }
    ]
  },

  {
    path: "/role",
    redirect: "/role/index",
    component: Layout,
    children: [
      {
        path: "/role/index",
        component: () => import("@/views/role/index.vue"),
        name: "role",
        meta: {
          title: "角色管理"
        }
      }
    ]
  },
  {
    path: "/user",
    redirect: "/user/index",
    component: Layout,
    children: [
      {
        path: "/user/index",
        component: () => import("@/views/user/index.vue"),
        name: "user",
        meta: {
          title: "用户管理"
        }
      }
    ]
  }
  // {
  //   path: "/link",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "https://www.baidu.com",
  //       component: () => {},
  //       name: "Link",
  //       meta: {
  //         title: "外链",
  //         icon: "link"
  //       }
  //     }
  //   ]
  // }
]

/**
 * 动态路由
 * 用来放置有权限（roles 属性）的路由
 * 必须带有 name 属性
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      icon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", // 必须将 'ErrorPage' 路由放在最后, Must put the 'ErrorPage' route at the end
    component: Layout,
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      title: "错误页面",
      icon: "404",
      hidden: true
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        name: "401",
        meta: {
          title: "401"
        }
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        name: "404",
        meta: {
          title: "404"
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器，不过体验不是很好
    window.location.reload()
  }
}

export default router
