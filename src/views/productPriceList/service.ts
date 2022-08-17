import { request } from "@/utils/service"

export function getPriceEvaluationTable(data: any) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetPriceEvaluationTable",
    method: "get",
    data
  })
}
