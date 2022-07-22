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
