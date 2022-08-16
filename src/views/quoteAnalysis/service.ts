import { request } from "@/utils/service"

export function getStatementAnalysisBoard(id: number) {
  return request({
    url: "/api/services/app/AnalyseBoard/GetStatementAnalysisBoard",
    method: "get",
    data: {
      id
    }
  })
}

export function postCalculateFullGrossMargin(row: any, auditFlowId: number, unitPrice: number) {
  return request({
    url: "/api/services/app/AnalyseBoard/PostCalculateFullGrossMargin",
    method: "post",
    data: {
      auditFlowId,
      productBoards: {
        modelCountId: row.modelCountId,
        offerUnitPrice: unitPrice
      }
    }
  })
}
// 查看年份维度对比
export function GetYearDimensionalityComparison(data: { id: number }): any {
  return request({
    url: "/api/services/app/AnalyseBoard/GetYearDimensionalityComparison",
    method: "get",
    data
  })
}
