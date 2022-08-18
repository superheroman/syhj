import { request } from "@/utils/service"

// export interface UserInputInfo {
//   electronicEngineerNum?: string
//   engineeringTechnologyNum?: string
//   fileId?: number
//   financeNum?: string
//   id?: number
//   isFirst?: string
//   isNRE?: string
//   productionManagementNum?: string
//   qualityNum?: string
//   resourceManagementNum?: string
//   structureEngineerNum?: string
// }

export interface UserInputInfo {
  auditFlowId: number
  electronicEngineerId?: null | string
  engineerLossRateId?: null | string
  engineerWorkHourId?: null | string
  fileId?: number | null
  id?: number
  isFirst?: null | string
  product?: null | string
  productId?: number
  productManageId?: null | string
  qualityBenchId?: null | string
  qualityToolId?: null | string
  resourceElecId?: null | string
  resourceStructId?: null | string
  structureEngineerId?: null | string
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
