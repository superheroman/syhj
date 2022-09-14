import { request } from "@/utils/service"

export function GetTradeComplianceCheckFromDateBase(data: { AuditFlowId: number; ProductId: number }): any {
  return request({
    url: "/api/services/app/TradeCompliance/GetTradeComplianceCheckFromDateBase",
    method: "get",
    data
  })
}

export function IsTradeComplianceCheck(data: { AuditFlowId: number; ProductId: number; isAgree: boolean }): any {
  return request({
    url: "/api/services/app/FinanceCheck/IsTradeComplianceCheck",
    method: "post",
    data
  })
}
