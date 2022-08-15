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

// 查看年份维度对比
export function GetYearDimensionalityComparison(data: { id: number }): any {
  return request({
    url: "/api/services/app/AnalyseBoard/GetYearDimensionalityComparison",
    method: "get",
    data
  })
}
