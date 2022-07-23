import { request } from "@/utils/service"
import { RatePage, RateItem } from "./data.type"

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
