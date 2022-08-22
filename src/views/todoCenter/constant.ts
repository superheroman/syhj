const urlMap = {
  TRAuditMKT: "", //市场部TR主方案审核界面"
  TRAuditR_D: "", //"产品开发部TR主方案审核"
  StructBomImport: "/structuralMaterialImport/index",
  ElectronicBomImport: "/electronicImport/index",
  ElectronicBomAudit: "/electronicImport/index",
  StructPriceInput: "/resourcesDepartment/construction", //结构单价录入界面
  ElectronicPriceInput: "/resourcesDepartment/electronic", //电子单价录入界面
  BomPriceAudit: "/bomVerify/index", // bom单价审核
  ElecLossRateInput: "/bomLoss/indexElec",
  StructLossRateInput: "/bomLoss/indexStruct",
  ManHourImport: "/processImport/index", // 工序导入
  LogisticsCostInput: "/pmDepartment/index", //物流成本录入界面
  NreInputOther: "/nre/nreProjectManageMent", //NRE核价手板件、差旅及其他费用录入界面
  NreInputEmc: "", //NRE核价电子-EMC实验费录入界面"
  NreInputMould: "/nre/nreResourcesDepartment", //NRE模具清单录入界面
  NreInputTest: "/nre/nrePilotprojects", //NRE实验费用录入界面
  NreInputGage: "/nre/nreQCDepartment", //NRE检具费用录入界面"
  TradeApproval: "/tradeCompliance/index", //贸易合规审核（结束流程&退回流程）
  PriceBoardAudit: "/dashboard", //核价看板
  PriceCheckDownload: "", //"版本的核价表查看&下载界面（产品+NRE）"
  CostCheckNreFactor: "", //"成本信息表下载&填报NRE报价系数&产品报价看板界面"
  QuoteApproval: "", //"总经理报价审批界面"
  QuoteFormCheckDownload: "", //"报价审核表查看&下载界面"
  ArchiveEnd: "", //"归档结束（异常终止）"
  LossRateInput: "/processImport/index", // "工程损耗率录入界面"
  RequirementInput: "/demandApply/index", //"核价需求录入界面"
  PMInput: "/partEntry/managerOperate" //"项目经理录入界面"
}
export default urlMap
