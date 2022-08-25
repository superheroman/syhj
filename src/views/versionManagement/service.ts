import { request } from "@/utils/service"

// 获取系统版本
export function GetVersionInfos(data: {
  ProjectName: string
  Version: number
  AuditFlowId: number
  DraftStartTime: string
  DraftEndTime: string
  FinishedStartTime: string
  FinishedEndTime: string
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
