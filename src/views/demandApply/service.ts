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
