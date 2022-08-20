import { request } from "@/utils/service"

// 查看 报价审核表
export function GetQuotationList(data: {
  /**
   * 流程Id
   */
  Id?: number
}): any {
  return request({
    url: "/api/services/app/AnalyseBoard/GetQuotationList",
    method: "get",
    data
  })
}

// 提交报价
export function PostIsOffer(data: {
  /**
   * 流程Id
   */
  Id?: number
}): any {
  return request({
    url: "/api/services/app/AnalyseBoard/PostIsOffer",
    method: "post",
    data
  })
}

// 报价审核
export function PostAuditQuotationList(data: {
  /**
   * 流程Id
   */
  Id?: number
}): any {
  return request({
    url: "/api/services/app/AnalyseBoard/PostAuditQuotationList",
    method: "post",
    data
  })
}
