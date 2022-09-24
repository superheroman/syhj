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
      productBoards: [
        {
          modelCountId: row.modelCountId,
          unitPrice: Number(unitPrice)
        }
      ]
    }
  })
}

export function getSpreadSheetCalculate(id: number, GrossMargin: number, AllUnitPrice: number) {
  return request({
    url: "/api/services/app/AnalyseBoard/GetSpreadSheetCalculate",
    method: "get",
    data: {
      id,
      GrossMargin,
      AllUnitPrice
    }
  })
}
// 查看年份维度对比
export function GetYearDimensionalityComparison(data: any): any {
  return request({
    url: "/api/services/app/AnalyseBoard/GetYearDimensionalityComparison",
    method: "get",
    data
  })
}

export function postIsOffer(data: any): any {
  return request({
    url: "/api/services/app/AnalyseBoard/PostIsOffer",
    method: "post",
    data
  })
}
export function getDownloadMessage(id: number, fileName: string) {
  return request({
    url: "/api/services/app/AnalyseBoard/GetDownloadMessage",
    method: "get",
    data: {
      id,
      fileName
    },
    responseType: "blob"
  })
}

export function PostIsOfferSave(data: any): any {
  return request({
    url: "/api/services/app/AnalyseBoard/PostIsOfferSave",
    method: "post",
    data
  })
}
