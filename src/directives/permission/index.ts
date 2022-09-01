import { Directive } from "vue"
import { useUserStoreHook } from "@/store/modules/user"
import { getQueryParam } from "@/utils/index"

/** 权限指令 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const roles = useUserStoreHook().roles
    console.log(useUserStoreHook(), "useUserStoreHook")
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role: any) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = "none"
      }
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
    }
  }
}
/** 已办不显示 */
export const havedone: Directive = {
  mounted(el) {
    const val = getQueryParam("right")
    // "1"代表已办，已办按钮不显示
    if (val == "1") {
      el.style.display = "none"
    }
  }
}
