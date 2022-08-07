import { request } from "@/utils/service"
import { RatePage, RateItem, UnitPage, GrossMarginPage, GrossMarginParams, RateEntryDto } from "./data.type"

/** 查询汇率 */
export function getExchangeRate(data: RatePage) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/GetExchangeRate",
    method: "get",
    data
  })
}

/** 创建修改汇率 */
export function saveExchangeRate(data: RateItem) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/PostExchangeRate",
    method: "post",
    data
  })
}
export function deleteExchangeRate(id: any) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/DeleteExchangeRate",
    method: "delete",
    data: {
      id
    }
  })
}
/** 查询单价库*/
export function getUInitPrice(data: UnitPage) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/GetGainUInitPriceForm",
    method: "get",
    data
  })
}

/** 创建修改毛利率 */
export function saveGrossMargin(data: GrossMarginParams) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/PostGrossMargin",
    method: "post",
    data
  })
}
/** 删除毛利率 */
export function deleteGrossMargin(id: any) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/DeleteGrossMargin",
    method: "delete",
    data: {
      id
    }
  })
}

/** 查询毛利率 */
export function getGrossMargin(data: GrossMarginPage) {
  return request({
    url: "/api/services/app/UnitPriceLibrary/GetGrossMargin",
    method: "get",
    data
  })
}

/** 获取费率录入 */
export function GetRateEntry(): Promise<any> {
  return request({
    url: "/api/services/app/FinanceDepartmentInput/GetRateEntry",
    method: "get"
  })
}

/** 获取费率录入 */
export function SaveRateEntryInput(data: RateEntryDto): Promise<any> {
  return request({
    url: "/api/services/app/FinanceDepartmentInput/SaveRateEntryInput",
    method: "post",
    data
  })
}
