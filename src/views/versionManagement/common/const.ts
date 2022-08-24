/**版本管理 */
// 版本管理 - 筛选项初始数据
export const InitVersionFilterValue = {
  ProjectName: "",
  Version: "",
  AuditFlowId: "",
  DraftDate: [],
  FinishedDate: []
}

/**报表查询 */

// 报表查询 - 筛选项
export const ReportfilterNnum = [
  {
    label: "项目名称",
    key: "projectName"
  },
  {
    label: "版本号1",
    key: "versionOneNo"
  },
  {
    label: "版本号2",
    key: "versionTwoNo"
  },
  {
    label: "报表类型",
    key: "reportType"
  }
]

// 报表查询 - 筛选项初始数据
export const InitReportFilterValue = {
  projectName: "",
  versionOneNo: "",
  versionTwoNo: "",
  reportType: ""
}
