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
 * QualityCostProportionEntryInfo
 */
export interface QualityCostProportionEntryInfo {
  isFirst?: boolean
  lastModificationTime?: Date | null
  lastModifierUserId?: number | null
  rate?: number
  year?: null | string
}

export interface ManufacturingCostsItem {
  monthlyWorkingDays?: number | null | string
  averageWage?: number | null | string
  workingHours?: number | null | string
  rateOfMobilization?: number | null | string
  usefulLifeOfFixedAssets?: number | null | string
  dailyShift?: number | null | string
  year?: number | null | string
}

export interface ManufacturingCostsInfo {
  manufacturingCosts: ManufacturingCostsItem[]
}
