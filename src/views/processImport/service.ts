import { request } from "@/utils/service"

export function downloadWorkingHoursInfo() {
  return request({
    url: "/api/services/app/FileCommonService/DownloadWorkingHoursInfo",
    method: "post",
    responseType: "blob"
  })
}
