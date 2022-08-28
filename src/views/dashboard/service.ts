import { request } from "@/utils/service"
import { GetLossCostProps } from "./data.type"

// 核价看板-【产品选择】下拉框下拉数据
export function GetPricingPanelProductSelectList(data: { AuditFlowId: number }) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetPricingPanelProductSelectList",
    method: "get",
    data
  })
}

// 核价看板-[时间选择]下拉框下拉数据
export function GetPricingPanelTimeSelectList(data: { AuditFlowId: number }) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetPricingPanelTimeSelectList",
    method: "get",
    data
  })
}

// 获取损耗成本
export function GetLossCost(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetLossCost",
    method: "get",
    data
  })
}

// 获取 质量成本
export function GetQualityCost(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetQualityCost",
    method: "get",
    data
  })
}

// 核价看板-产品成本占比图
export function GetPricingPanelProportionOfProductCost(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetPricingPanelProportionOfProductCost",
    method: "get",
    data
  })
}

// 核价看板-利润分布图
export function GetPricingPanelProfit(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetPricingPanelProfit",
    method: "get",
    data
  })
}

// 初版产品核价表下载
export function PriceEvaluationTableDownload(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/PriceEvaluationTableDownload",
    method: "get",
    data,
    responseType: "blob"
  })
}

//  初版NRE核价表下载
export function NreTableDownload(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/NreTableDownload",
    method: "get",
    data,
    responseType: "blob"
  })
}

// 获取 bom成本（含损耗）汇总表
export function GetBomCost(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetBomCost",
    method: "get",
    data
  })
}

// 获取 物流成本汇总表
export function GetLogisticsCost(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetLogisticsCost",
    method: "get",
    data
  })
}

// 获取 制造成本汇总表
export function GetManufacturingCost(data: GetLossCostProps) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetManufacturingCost",
    method: "get",
    data
  })
}

// 获取推移图
export function GetGoTable(data: { AuditFlowId: number; ModelCountId: number; InputCount: number }) {
  return request({
    url: "/api/services/app/PriceEvaluation/GetGoTable",
    method: "get",
    data
  })
}
// 上传tr主方案
export function addPricingPanelTrProgrammeId(auditFlowId: number, fileManagementId: number) {
  return request({
    url: "/api/services/app/PriceEvaluation/AddPricingPanelTrProgrammeId",
    method: "post",
    data: {
      auditFlowId,
      fileManagementId
    }
  })
}
// 核价看板审核
export function SetPriceBoardState(auditFlowId: number, isAgree: boolean, backProcessIdentifiers?: any[]) {
  return request({
    url: "/api/services/app/PriceEvaluation/SetPriceBoardState",
    method: "post",
    data: {
      auditFlowId,
      isAgree,
      backProcessIdentifiers
    }
  })
}
