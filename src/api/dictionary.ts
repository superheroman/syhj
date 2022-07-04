import { request } from "@/utils/service"

/**
 * EditFinanceDictionaryInput，编辑字典
 */
export interface Dictionary {
  /**
   * 字典显示名
   */
  displayName: null | string
  id?: number | undefined | null
  /**
   * 字典名  获取字段列表的依据
   */
  name: null | string
  /**
   * 备注
   */
  remark?: null | string
}

/**
 * 获取字典
 */
export interface DictionarySearch {
  /**
   * 字典显示名
   */
  displayName: null | string
  /**
   * 字典名  获取字段列表的依据
   */
  name: null | string
  /**
   * 备注
   */
  remark?: null | string
  maxResultCount: number
  skipCount: number
}
/** 添加新字典 */
export function addDictionary(data: Dictionary) {
  return request({
    url: "/api/services/app/FinanceDictionary/AddFinanceDictionary",
    method: "post",
    data
  })
}
/** 编辑字典 */
export function editDictionary(data: Dictionary) {
  return request({
    url: "/api/services/app/FinanceDictionary/EditFinanceDictionary",
    method: "post",
    data
  })
}

/** 删除字典 */
export function deleteDictionary(id: number | undefined | null) {
  return request({
    url: "/api/services/app/FinanceDictionary/DeleteFinanceDictionary",
    method: "delete",
    data: {
      id
    }
  })
}

/** 添加新字典 */
export function getDictionary(data: DictionarySearch) {
  return request({
    url: "/api/services/app/FinanceDictionary/GetFinanceDictionaryList",
    method: "get",
    data
  })
}
