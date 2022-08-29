import { request } from "@/utils/service"
import {
  ProductDepartmentModel,
  ProjectManagementModel,
  ResourcesManagementModel,
  NreMarketingDepartmentModel,
  ExperimentItemsModel
} from "../data.type"

// 项目管理部录入
export function PostProjectManagement(data: {
  /**
   * 流程Id
   */
  auditFlowId?: number
  /**
   * Nre核价 项目管理部 实体
   */
  projectManagements?: ProjectManagementModel[] | null
}): any {
  return request({
    url: "/api/services/app/NrePricing/PostProjectManagement",
    method: "post",
    data
  })
}

// 产品部-电子工程师 录入
export function PostProductDepartment(data: {
  /**
   * 流程Id
   */
  auditFlowId?: number
  /**
   * 实验费 实体类
   */
  productDepartmentModels?: ProductDepartmentModel[] | null
}): any {
  return request({
    url: "/api/services/app/NrePricing/PostProductDepartment",
    method: "post",
    data
  })
}

// 品保部 录入
export function PostQADepartment(data: any): any {
  return request({
    url: "/api/services/app/NrePricing/PostQcGauge",
    method: "post",
    data
  })
}

// Nre 品保部=>试验项目 录入
export function PostExperimentItems(data: {
  /**
   * 流程Id
   */
  auditFlowId?: number
  /**
   * 带零件id 的 品保录入模型
   */
  experimentItems?: ExperimentItemsModel[] | null
}): any {
  return request({
    url: "/api/services/app/NrePricing/PostExperimentItems",
    method: "post",
    data
  })
}

// 资源部录入
export function PostResourcesManagement(data: {
  /**
   * 流程Id
   */
  auditFlowId?: number
  /**
   * Nre核价  资源部录入 实体
   */
  resourcesManagementModels?: ResourcesManagementModel[] | null
}): any {
  return request({
    url: "/api/services/app/NrePricing/PostResourcesManagement",
    method: "post",
    data
  })
}

// 资源部录入初始值
export function GetInitialResourcesManagement(data: { id: number }): any {
  return request({
    url: "/api/services/app/NrePricing/GetInitialResourcesManagement",
    method: "get",
    data
  })
}

// 计算 模具清单的 数量以及费用
export function PostCalculateMouldInventory(data: {
  /**
   * 流程Id
   */
  auditFlowId?: number
  /**
   * Nre核价  资源部录入 实体
   */
  resourcesManagementModels?: ResourcesManagementModel[] | null
}): any {
  return request({
    url: "/api/services/app/NrePricing/PostCalculateMouldInventory",
    method: "post",
    data
  })
}

// Ner 营销部录入初始值
export function GetInitialSalesDepartment(data: { Id: number; productId: number }): any {
  return request({
    url: "/api/services/app/NrePricing/GetInitialSalesDepartment",
    method: "get",
    data
  })
}

// Ner 营销部录入
export function PostSalesDepartment(data: NreMarketingDepartmentModel[]): any {
  return request({
    url: "/api/services/app/NrePricing/PostSalesDepartment",
    method: "post",
    data
  })
}

/**NRE费用模块 */

export function GetPricingForm(data: { Id: number; productId: number }): any {
  return request({
    url: "/api/services/app/NrePricing/GetPricingForm",
    method: "get",
    data
  })
}
