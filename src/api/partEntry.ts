import { request } from "@/utils/service"

export interface UserInputInfo {
  electronicEngineerNum?: string
  engineeringTechnologyNum?: string
  fileId?: number
  financeNum?: string
  id?: number
  isFirst?: string
  isNRE?: string
  productionManagementNum?: string
  qualityNum?: string
  resourceManagementNum?: string
  structureEngineerNum?: string
}

/** 项目经理确认 */
export function PostManagement(data: UserInputInfo) {
  return request({
    url: "/api/services/app/UserInput/PostManagement",
    method: "post",
    data
  })
}
/** 核价团队下拉选择 */
export function GetUserInput() {
  return request({
    url: "/api/services/app/UserInput/GetUserInput",
    method: "get"
  })
}
