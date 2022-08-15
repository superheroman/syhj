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

export function postCalculateFullGrossMargin(row, auditFlowId, unitPrice) {
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
