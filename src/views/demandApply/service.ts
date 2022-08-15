import { request } from "@/utils/service"
import { InputModal, RatePage } from "./data.type"
/** 录入 */
export function saveApplyInfo(data: InputModal) {
  return request({
    url: "/api/services/app/PriceEvaluation/PriceEvaluationStart",
    method: "post",
    data
  })
}

/** 查询汇率 */
export function getExchangeRate(data: RatePage) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/GetExchangeRate",
    method: "get",
    data
  })
}

// 获取项目核价表
export function getPriceEvaluationTable(data: {
  AuditFlowId: number
  ModelCountId: number
  InputCount: number
  Year: number
}) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetPriceEvaluationTable",
    method: "get",
    data
  })
}
