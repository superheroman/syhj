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
