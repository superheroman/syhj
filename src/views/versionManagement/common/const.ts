/**版本管理 */
// 版本管理 - 筛选项初始数据
export const InitVersionFilterValue = {
  projectName: "",
  versionNo: "",
  processNo: "",
  draftTime: [],
  pricingEndTime: [],
  quotationEndTime: []
}

// 版本管理 - 筛选项
export const VerisonfilterNnum = [
  {
    label: "项目名称",
    key: "projectName"
  },
  {
    label: "版本号",
    key: "versionNo"
  },
  {
    label: "流程单号",
    key: "processNo"
  },
  {
    label: "拟稿时间",
    key: "draftTime",
    role: "timePicker"
  },
  {
    label: "核价节点结束时间",
    key: "pricingEndTime",
    role: "timePicker"
  },
  {
    label: "报价结束时间",
    key: "quotationEndTime",
    role: "timePicker"
  }
]

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
