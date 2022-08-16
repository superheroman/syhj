import { request } from "@/utils/service"

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
