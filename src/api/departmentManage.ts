import { request } from "@/utils/service"
/**
 * AddDerartment，部门新增
 */
export interface DepartmentInfo {
  /**
   * 父部门
   */
  fid?: number | null
  /**
   * 部门名称
   */
  name: string
}
/**
 * UpdateDerpartmentInput，部门更新
 */
export interface UpdateDepartmentInfo {
  id?: number
  /**
   * 部门名称
   */
  name: string
}
/** 创建部门 */
export function addDepartment(data: DepartmentInfo) {
  return request({
    url: "/api/services/app/Hr/AddDepartment",
    method: "post",
    data
  })
}

/** 修改部门 */
export function updateDepartment(data: UpdateDepartmentInfo) {
  return request({
    url: "/api/services/app/Hr/UpdateDerpartment",
    method: "put",
    data
  })
}
/** 删除部门 */
export function deleteDerpartment(id: number) {
  return request({
    url: "/api/services/app/Hr/DeleteDerpartment",
    method: "delete",
    data: {
      id
    }
  })
}

/** 获取根部门 */
export function getRootDepartment() {
  return request({
    url: "/api/services/app/Hr/GetRootDerpartment",
    method: "get"
  })
}
/** 获取下属部门 */
export function getDepartmentChildren(id: number) {
  return request({
    url: "/api/services/app/Hr/GetSubordinateDerpartment",
    method: "get",
    data: {
      id
    }
  })
}
