import { request } from "@/utils/service"
export function getAllYearsFrom(auditFlowId: any) {
  return request({
    url: "/api/services/app/ProductionControl/GetAllYearsFrom",
    method: "get",
    data: {
      auditFlowId
    }
  })
}

export function priceEvaluationSave(data: any) {
  return request({
    url: "/api/services/app/PriceEvaluation/Save",
    method: "post",
    data
  })
}
