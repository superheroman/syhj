import { request } from "@/utils/service"

// 获取系统版本
export function GetVersionInfos(data: {
  ProjectName: string
  Version: number
  auditFlowId: number
  DraftStartTime: string
  DraftEndTime: string
  FinishedStartTime: string
  FinishedEndTime: string
  Number: number
}): any {
  return request({
    url: "/api/services/app/VersionManagment/GetVersionInfos",
    method: "get",
    data
  })
}

// 获取系统版本操作记录
export function GetAuditFlowOperateReocrd(data: { flowId: number }): any {
  return request({
    url: "/api/services/app/VersionManagment/GetAuditFlowOperateReocrd",
    method: "get",
    data
  })
}

// 获取项目已有核价流程所有项目名称
export function GetAllAuditFlowProjectName(): any {
  return request({
    url: "/api/services/app/VersionManagment/GetAllAuditFlowProjectName",
    method: "get",
    data: {}
  })
}

// 根据项目名称获取项目已有核价流程所有版本
export function GetAllAuditFlowVersion(data: { projectName: string }): any {
  return request({
    url: "/api/services/app/VersionManagment/GetAllAuditFlowVersion",
    method: "get",
    data
  })
}

// 根据项目名称获取项目已有核价流程所有版本
export function GetAllAuditFlowProjectNameAndVersion(): any {
  return request({
    url: "/api/services/app/VersionManagment/GetAllAuditFlowProjectNameAndVersion",
    method: "get",
    data: {}
  })
}

// 获取成本明细差异表-bom成本
export function GetCostDetailVarianceMaterial(data: {
  Product: string
  QuoteVersion1AuditFlowId: number
  QuoteVersion2AuditFlowId: string
  IsAll: boolean
}): any {
  return request({
    url: "/api/services/app/DataTableVersion/GetCostDetailVarianceMaterial",
    method: "get",
    data
  })
}

// 获取成本明细差异表-制造成本
export function GetCostDetailVarianceManufacturingCost(data: {
  Product: string
  QuoteVersion1AuditFlowId: number
  QuoteVersion2AuditFlowId: string
  IsAll: boolean
}): any {
  return request({
    url: "/api/services/app/DataTableVersion/GetCostDetailVarianceManufacturingCost",
    method: "get",
    data
  })
}

// 获取成本明细差异表-项目整体
export function GetCostDetailVariance(data: {
  QuoteVersion1AuditFlowId: number
  QuoteVersion2AuditFlowId: string
}): any {
  return request({
    url: "/api/services/app/DataTableVersion/GetCostDetailVariance",
    method: "get",
    data
  })
}

// 根据两个流程号，获取产品列表
export function GetProductListByAuditFlowIds(data: {
  QuoteVersion1AuditFlowId: number
  QuoteVersion2AuditFlowId: string
  SkipCount?: number
  MaxResultCount?: number
}): any {
  return request({
    url: "/api/services/app/DataTableVersion/GetProductListByAuditFlowIds",
    method: "get",
    data
  })
}
