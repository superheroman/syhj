import { request } from "@/utils/service"

// 根据项目名称获取项目已有核价流程所有版本
export function GetAllAuditFlowVersion(data: { id: number }): any {
  return request({
    url: "/api/services/app/AuditFlow/GetAllAuditFlowVersion",
    method: "get",
    data
  })
}
