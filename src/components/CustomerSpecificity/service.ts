import { request } from "@/utils/service"

export function getSorFile(auditFlowId: any) {
  return request({
    url: "/api/services/app/ProductionControl/GetSorFileId",
    method: "post",
    data: {
      auditFlowId
    },
    responseType: "blob"
  })
}
export function getSorByAuditFlowId(auditFlowId: any) {
  return request({
    url: "/api/services/app/ProductDevelopmentInput/GetSorByAuditFlowId",
    method: "post",
    data: {
      auditFlowId
    }
  })
}
