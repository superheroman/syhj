import { request } from "@/utils/service"
/** 获取TR主方案信息 */
export function getAuditFlowVersion(auditFlowId: number) {
  return request({
    url: "/api/services/app/TRCheck/GetAuditFlowVersion",
    method: "get",
    data: {
      auditFlowId
    }
  })
}

export function addPricingPanelTrProgrammeId(auditFlowId: number, fileManagementId: number) {
  return request({
    url: "/api/services/app/PriceEvaluation/AddPricingPanelTrProgrammeId",
    method: "post",
    data: {
      auditFlowId,
      fileManagementId
    }
  })
}
export function downloadFile(fileId: number) {
  return request({
    url: "/api/services/app/FileCommonService/DownloadFile",
    method: "post",
    data: {
      fileId
    },
    responseType: "blob"
  })
}
