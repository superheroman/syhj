import { request } from "@/utils/service"
import { auditFlowInfo, LossRateListDto } from "./data.type"

export function saveLossRateInfo(data: LossRateListDto) {
  return request({
    url: "/api/services/app/LossRate/SaveLossRateInfo",
    method: "post",
    data
  })
}

export function getLossRateType(data: auditFlowInfo) {
  return request({
    url: "/api/services/app/LossRate/GetLossRateType",
    method: "get",
    data
  })
}

export function getOldLossRateInfo(data: auditFlowInfo) {
  return request({
    url: "/api/services/app/LossRate/GetOldLossRateInfo",
    method: "get",
    data
  })
}
