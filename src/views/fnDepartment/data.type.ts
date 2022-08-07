export interface RatePage {
  /**
   * 货币币种
   */
  exchangeRateKind?: string
  maxResultCount: number
  skipCount: number
}
export type RateItem = {
  exchangeRateKind: string
  id?: number | null
  exchangeRateValue: YearRateItem[]
}

export type YearRateItem = {
  year: number | string
  value: number | string
}

export interface UnitPage {
  maxResultCount: number
  skipCount: number
}

export interface GrossMarginPage {
  grossMarginName?: string
  maxResultCount: number
  skipCount: number
}

export interface GrossMarginItem {
  id?: number
  grossMarginName: string
  grossMarginPrice: GrossMarginItemVal[]
  isDefaultn: boolean
}
export interface GrossMarginParams {
  id?: number
  grossMarginName: string
  grossMarginPrice: any[]
  isDefaultn: boolean
}

export interface GrossMarginItemVal {
  value: number | string | null
}

/**
 * 请求费率初始值
 */
export interface RateEntryDto {
  rateEntryInfos?: RateEntryInfo[] | null
}

/**
 * 费率
 */
export interface RateEntryInfo {
  creationTime?: string
  creatorUserId?: number | null
  deleterUserId?: number | null
  deletionTime?: string
  directManufacturingRate?: number
  id?: number
  indirectDepreciationRate?: number
  indirectLaborRate?: number
  indirectManufacturingRate?: number
  isDeleted?: boolean
  lastModificationTime?: string
  lastModifierUserId?: number | null
  year?: null | string
}
