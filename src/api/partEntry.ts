import { request } from "@/utils/service"

interface ApifoxModal {
  electronicEngineerNum?: null | string
  engineeringTechnologyNum?: null | string
  fileId?: number
  financeNum?: null | string
  id?: number
  isFirst?: null | string
  isNRE?: null | string
  productionManagementNum?: null | string
  qualityNum?: null | string
  resourceManagementNum?: null | string
  structureEngineerNum?: null | string
}

/** 项目经理确认 */
export function PostManagement(data: ApifoxModal) {
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
