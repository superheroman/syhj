/**
 * ProjectManagementDto，Nre核价 项目管理部 交互类
 */
export interface NreProjectManageMentData {
  /**
   * 流程Id
   */
  processId?: number
  /**
   * Nre核价 项目管理部 实体
   */
  projectManagements?: ProjectManagementModel[] | null
}

/**
 * ProjectManagementModel，Nre核价 项目管理部  模型
 */
export interface ProjectManagementModel {
  /**
   * 手板件费用
   */
  handPieceCost?: HandPieceCostModel[] | null
  /**
   * 零件的id
   */
  partId?: number
  /**
   * 其他费用
   */
  restsCost?: RestsCostModel[] | null
  /**
   * 差旅费
   */
  travelExpense?: TravelExpenseModel[] | null
}

/**
 * HandPieceCostModel，手板件费用 模型
 */
export interface HandPieceCostModel {
  /**
   * 费用
   */
  cost?: number
  /**
   * 零件名
   */
  partName?: null | string
  /**
   * 料号
   */
  partNumber?: null | string
  /**
   * 数量
   */
  quantity?: number
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 单价
   */
  unitPrice?: number
}

/**
 * RestsCostModel，其他费用 模型
 */
export interface RestsCostModel {
  /**
   * 费用
   */
  cost?: number
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 项目
   */
  rroject?: null | string
}

/**
 * TravelExpenseModel，差旅费 模型
 */
export interface TravelExpenseModel {
  /**
   * 费用
   */
  cost?: number
  /**
   * 费用/天
   */
  costSky?: number
  /**
   * 人数
   */
  peopleCount?: number
  /**
   * 事由外键
   */
  reasonsId?: number
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 天数
   */
  skyCount?: number
}

/**
 * ProductDepartmentDto，产品部-电子工程师 录入 交互类
 */
export interface NrePilotprojectsData {
  /**
   * 流程Id
   */
  processId?: number
  /**
   * 实验费 实体类
   */
  productDepartmentModels?: ProductDepartmentModel[] | null
}

/**
 * ProductDepartmentModel，产品部-电子工程师 录入 实验费  模型
 */
export interface ProductDepartmentModel {
  /**
   * 实验费 模型
   */
  laboratoryFeeModels?: LaboratoryFeeModel[] | null
  /**
   * 零件的id
   */
  partId?: number
}

/**
 * LaboratoryFeeModel，实验费 模型
 */
export interface LaboratoryFeeModel {
  /**
   * 总费用
   */
  allCost?: number
  /**
   * 是否指定第三方
   */
  isThirdParty?: boolean
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 实验项目
   */
  testItem?: null | string
  /**
   * 时间
   */
  time?: Date
  /**
   * 单价
   */
  unitPrice?: number
}

/**
 * QADepartmentDto，Nre 品保部录入交互类
 */
export interface NreQCDepartmentData {
  /**
   * 流程Id
   */
  processId?: number
  /**
   * 带零件id 的 品保录入模型
   */
  qaDepartments?: QADepartmentPartModel[] | null
}

/**
 * QADepartmentPartModel，带零件id 的 品保录入模型
 */
export interface QADepartmentPartModel {
  /**
   * 零件的id
   */
  partId?: number
  /**
   * 品保录入  项目制程QC量检具表 模型
   */
  qaqcDepartments?: QADepartmentQCModel[] | null
  /**
   * 品保录入  试验项目表 模型
   */
  qaTestDepartments?: QADepartmentTestModel[] | null
}

/**
 * QADepartmentTestModel，品保录入  试验项目表 模型
 */
export interface QADepartmentTestModel {
  /**
   * 总费用
   */
  allCost?: number
  /**
   * 数量
   */
  count?: number
  /**
   * 时间-DV
   */
  dataDV?: Date
  /**
   * 时间-PV
   */
  dataPV?: Date
  /**
   * 时间-摸底
   */
  dataThoroughly?: Date
  /**
   * 是否指定第三方
   */
  isThirdParty?: boolean
  /**
   * 试验项目(根据与客户协定项目)
   */
  projectName?: null | string
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 单位
   */
  unit?: null | string
  /**
   * 单价
   */
  unitPrice?: number
}

/**
 * QADepartmentQCModel，Nre 品保部 录入 项目制程QC 表
 */
export interface QADepartmentQCModel {
  /**
   * 费用
   */
  cost?: number
  /**
   * 数量
   */
  count?: number
  /**
   * 项目制程QC量检具
   */
  qc?: null | string
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 单价
   */
  unitPrice?: number
  /**
   * 使用工站
   */
  useWorkstation?: null | string
}
