import { request } from "@/utils/service"

// 归档文件列表
export function GetDownloadList(data: {
  /**
   * 流程Id
   */
  auditFlowId?: number
}): any {
  return request({
    url: "/api/services/app/AnalyseBoard/GetDownloadList",
    method: "get",
    data
  })
}

// 归档文件下载
export function PostDownloadListSave(data: { auditFlow?: number[] | [] }): any {
  return request({
    url: "/api/services/app/AnalyseBoard/PostDownloadListSave",
    method: "post",
    data
  })
}
