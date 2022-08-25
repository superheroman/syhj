import { request } from "@/utils/service"
import { TangentSaveDto } from "./data.type"

export function downloadWorkingHoursInfo() {
  return request({
    url: "/api/services/app/FileCommonService/DownloadWorkingHoursInfo",
    method: "post",
    responseType: "blob"
  })
}

export function SaveWorkingHour(data: any) {
  return request({
    url: "/api/services/app/WorkingHours/SaveWorkingHour",
    method: "post",
    data
  })
}

export function SaveTangentHours(data: TangentSaveDto): any {
  return request({
    url: "/api/services/app/WorkingHours/SaveTangentHours",
    method: "post",
    data
  })
}

export function getTangentHoursList(auditFlowId: number, productId: number): any {
  return request({
    url: "/api/services/app/WorkingHours/GetTangentHoursList",
    method: "get",
    data: {
      auditFlowId,
      productId
    }
  })
}
